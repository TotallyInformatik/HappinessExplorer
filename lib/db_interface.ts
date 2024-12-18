"use server";

import { and, eq, inArray, desc, asc } from "drizzle-orm";
import { db } from "@/lib/database/db";
import { countries, continentTranslations, countryTranslations, reports } from "@/lib/database/schema";
import { HappinessScore } from "@/components/ui/custom-card";


export type Year = {
    year: number,
}

export type ContinentGroup = {
    continentName: string,
    countries: Country[],
}

export type Country = {
    countryId: number,
    countryName: string,
    countryCode: string | null,
    flagEmoji: string | null,
}

export type Score = {
    ladderScore: number | null;
}

export type MapCountries = Record<string, Score>;

export type CountryData = {
    ladderScore: number | null,
    upperWhisker: number | null,
    lowerWhisker: number | null,
    logGdpPerCapita: number | null,
    socialSupport: number | null,
    healthyLifeExpectancy: number | null,
    freedomToMakeLifeChoices: number | null,
    generosity: number | null,
    perceptionsOfCorruption: number | null,
    dystopiaResidual: number | null,
    rank: number | null,
    scoreHistory: HappinessScore[],
}

export async function getListOfYears(): Promise<Year[]> {
    try {
        const distinctYears = await db
            .selectDistinct({
                year: reports.year,
            })
            .from(reports)
            .orderBy(desc(reports.year));

        return distinctYears;
    } catch (error) {
        return [];
    }
}

export async function getCountriesByContinent(year: number, locale: string): Promise<ContinentGroup[]> {
    // Step 1: Query all country IDs in the reports table for the specified year
    const reportEntries = await db
        .select({
            countryId: reports.countryId,
        })
        .from(reports)
        .where(eq(reports.year, year));

    // Extract unique country IDs
    const countryIds = reportEntries.map(entry => entry.countryId);

    // Step 2: Query country and continent codes for the retrieved country IDs
    const countriesData = await db
        .select({
            countryId: countries.countryId,
            countryCode: countries.countryCode,
            continentCode: countries.continentCode,
        })
        .from(countries)
        .where(inArray(countries.countryId, countryIds));

    // Step 3: Group countries by continent code
    const groupedByContinent = countriesData.reduce((acc, entry) => {
        const { continentCode, countryId, countryCode } = entry;
        if (!acc[continentCode]) acc[continentCode] = [];
        acc[continentCode].push({ countryId, countryCode });
        return acc;
    }, {} as Record<string, { countryId: number; countryCode: string }[]>);

    // Step 4: Query localized names for countries and continents
    const continentCodes = Object.keys(groupedByContinent);

    const continentTranslationsData = await db
        .select({
            continentCode: continentTranslations.continentCode,
            localizedName: continentTranslations.localizedName,
        })
        .from(continentTranslations)
        .where(
            and(
                eq(continentTranslations.languageCode, locale),
                inArray(continentTranslations.continentCode, continentCodes)
            )
        )
        .orderBy(asc(continentTranslations.localizedName));

    const countryTranslationsData = await db
        .select({
            countryId: countries.countryId,
            localizedName: countryTranslations.localizedName,
        })
        .from(countries)
        .leftJoin(
            countryTranslations,
            and(
                eq(countryTranslations.countryCode, countries.countryCode),
                eq(countryTranslations.languageCode, locale)
            )
        )
        .where(inArray(countries.countryId, countryIds))
        .orderBy(asc(countryTranslations.localizedName));

    // Step 5: Construct the result
    const result = continentTranslationsData.map((continent) => {
        const continentName = continent.localizedName || "Unknown Continent";

        // Sort countries in the current continent by their localized names
        const countries = groupedByContinent[continent.continentCode]
            .map((country) => {
                const countryName =
                    countryTranslationsData.find(
                        (c) => c.countryId === country.countryId
                    )?.localizedName || "Unknown Country";

                return { countryId: country.countryId, countryName, countryCode: country.countryCode, flagEmoji: null };
            })
            .sort((a, b) => a.countryName.localeCompare(b.countryName));

        return { continentName, countries };
    });

    return result;
}

export async function getCountryData(year: number, countryId: number): Promise<CountryData | undefined> {
    try {
        const data = await db.query.reports.findFirst({
            where: (table) =>
                and(
                    eq(table.year, year),
                    eq(table.countryId, countryId)
                ),
            columns: {
                ladderScore: true,
                upperWhisker: true,
                lowerWhisker: true,
                logGdpPerCapita: true,
                socialSupport: true,
                healthyLifeExpectancy: true,
                freedomToMakeLifeChoices: true,
                generosity: true,
                perceptionsOfCorruption: true,
                dystopiaResidual: true,
                rank: true,
            },
        });

        if (!data) return undefined;

        // Query all ladder scores for all available years for the given country
        const allScores = await db.select({
            year: reports.year,
            score: reports.ladderScore
        })
        .from(reports)
        .where(eq(reports.countryId, countryId))
        .orderBy(asc(reports.year));

        // Construct the CountryData object with an additional scores property
        return {
            ...data,
            scoreHistory: allScores.map(entry => ({
                year: entry.year,
                score: entry.score ?? 0 // In case ladderScore is nullable, provide a default value
            }))
        };
    }
    catch (error) {
        return undefined;
    }
}

export async function getCountry(countryId: number, locale: string): Promise<Country | undefined> {
    try {
        const countryDetails = await db.query.countries.findFirst({
            where: (table) => eq(table.countryId, countryId),
            columns: {
                flagEmoji: true,
                countryCode: true,
            },
        });

        if (!countryDetails) {
            throw new Error(`Country with ID ${countryId} not found.`);
        }

        const translation = await db.query.countryTranslations.findFirst({
            where: (table) =>
                and(
                    eq(table.countryCode, countryDetails.countryCode),
                    eq(table.languageCode, locale)
                ),
            columns: {
                localizedName: true,
            },
        });

        return {
            countryId,
            countryName: translation?.localizedName || "Unknown Country",
            countryCode: countryDetails.countryCode,
            flagEmoji: countryDetails.flagEmoji,
        };
    } catch (error) {
        return;
    }
}

export async function getTopTenCountries(year: number, locale: string): Promise<Country[]> {
    const topCountries = await db.query.reports.findMany({
        where: (table) => eq(table.year, year),
        orderBy: (table) => asc(table.rank),
        limit: 10,
        columns: {
            countryId: true,
        },
    });

    const countryIds = topCountries.map((country) => country.countryId);

    // Step 3: Query translations for the top 10 countries
    const translations = await db
        .select({
            countryId: countries.countryId,
            countryCode: countries.countryCode,
            flagEmoji: countries.flagEmoji,
            localizedName: countryTranslations.localizedName,
        })
        .from(countries)
        .leftJoin(
            countryTranslations,
            and(
                eq(countryTranslations.countryCode, countries.countryCode),
                eq(countryTranslations.languageCode, locale)
            )
        )
        .where(inArray(countries.countryId, countryIds));

    // Step 4: Map the translations back to the country IDs
    const result: Country[] = topCountries.map((id) => {
        const translation = translations.find((t) => t.countryId === id.countryId);
        return {
            countryId: id.countryId,
            countryName: translation?.localizedName || "Unknown Country",
            countryCode: translation?.countryCode || null,
            flagEmoji: translation?.flagEmoji || null,
        };
    });

    return result;
}

export async function getCountryEmoji(countryId: number): Promise<string | null | undefined> {
    try {
        const emoji = await db.query.countries.findFirst({
            where: (table) => eq(table.countryId, countryId),
            columns: {
                flagEmoji: true,
            }
        });

        return emoji?.flagEmoji;
    } catch (error) {
        return;
    }
}

export async function getAllCountries(year: number): Promise<MapCountries | undefined> {
    try {
        const allCountries = await db.select({
            country_name: countryTranslations.localizedName,
            score: reports.ladderScore
        }).from(reports)
        .leftJoin(countries, eq(reports.countryId, countries.countryId))
        .leftJoin(
            countryTranslations,
            and(
                eq(countryTranslations.countryCode, countries.countryCode),
                eq(countryTranslations.languageCode, "en")
            )
        )
        .where(eq(reports.year, year));

        const formattedResult: MapCountries = {};

        for (const row of allCountries) {
            if (row.country_name) { 
                formattedResult[row.country_name] = { ladderScore: row.score ?? -1 };
            }
        }

        return formattedResult;
    } catch (error) {
        return;
    }
}