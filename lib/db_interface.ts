"use server";

import { and, eq, inArray, desc, asc } from "drizzle-orm";
import { db } from "@/lib/database/db";
import { countries, continentTranslations, countryTranslations, reports } from "@/lib/database/schema";


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
}

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

                return { countryId: country.countryId, countryName, countryCode: country.countryCode };
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

        if (data) return data;
        else return undefined;
    }
    catch (error) {
        return undefined;
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