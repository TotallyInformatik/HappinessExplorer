import { pgTable, pgEnum, serial, varchar, integer, real, uniqueIndex, primaryKey } from "drizzle-orm/pg-core";

export const ageGroup = pgEnum('age_group', ['Young', 'LowerMiddle', 'UpperMiddle', 'Old']);

// Continents Table
export const continents = pgTable("continents", {
  continentCode: varchar("continent_code", { length: 10 }).primaryKey(),
});

// Countries Table
export const countries = pgTable("countries", {
  countryId: serial("country_id").primaryKey(),
  countryCode: varchar("country_code", { length: 10 }).unique().notNull(),
  continentCode: varchar("continent_code", { length: 10 }).notNull().references(() => continents.continentCode),
  flagEmoji: varchar("flag_emoji", { length: 20 }),
});

// Country Translations Table
export const countryTranslations = pgTable("country_translations", {
  translationId: serial("translation_id").primaryKey(),
  languageCode: varchar("language_code", { length: 10 }).notNull(),
  countryCode: varchar("country_code", { length: 10 }).notNull().references(() => countries.countryCode),
  localizedName: varchar("localized_name", { length: 255 }).notNull(),
}, (table) => {
  return {
    uniqueLanguageCountry: uniqueIndex("unique_language_country").on(table.languageCode, table.countryCode),
  }
});

// Continent Translations Table
export const continentTranslations = pgTable("continent_translations", {
  translationId: serial("translation_id").primaryKey(),
  languageCode: varchar("language_code", { length: 10 }).notNull(),
  continentCode: varchar("continent_code", { length: 10 }).notNull().references(() => continents.continentCode),
  localizedName: varchar("localized_name", { length: 255 }).notNull(),
}, (table) => {
  return {
    uniqueLanguageCountry: uniqueIndex("unique_language_country").on(table.languageCode, table.continentCode),
  }
});

// Reports Table
export const reports = pgTable("reports", {
  reportId: serial("report_id").unique(),
  year: integer("year").notNull(),
  countryId: integer("country_id").notNull().references(() => countries.countryId),
  // Real Numbers
  ladderScore: real("ladder_score"),
  upperWhisker: real("upper_whisker"),
  lowerWhisker: real("lower_whisker"),
  logGdpPerCapita: real("log_gdp_per_capita"),
  socialSupport: real("social_support"),
  healthyLifeExpectancy: real("healthy_life_expectancy"),
  freedomToMakeLifeChoices: real("freedom_to_make_life_choices"),
  generosity: real("generosity"),
  perceptionsOfCorruption: real("perceptions_of_corruption"),
  dystopiaResidual: real("dystopia_residual"),
  // Integer Numbers
  rank: integer("rank"),
  youngRank: integer("young_rank"),
  lowerMiddleRank: integer("lower_middle_rank"),
  upperMiddleRank: integer("upper_middle_rank"),
  oldRank: integer("old_rank"),
  // Enums
  happiest: ageGroup("happiest"),
  leastHappy: ageGroup("least_happy"),
}, (table) => {
  return {
    yearCountryKey: primaryKey({ name: 'year_country_key', columns: [table.year, table.countryId] }),
  }
});
