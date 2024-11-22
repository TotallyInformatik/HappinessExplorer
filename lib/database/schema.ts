import { pgTable, pgEnum, serial, text, varchar, timestamp, boolean, integer, uuid, smallint, real } from "drizzle-orm/pg-core";

export const accessCodes = pgTable('World Happiness Report 2024', {
    country_name: text('Country name').primaryKey(),
    ladder_score: real('Ladder score'),
    upper_whisker: real('upperwhisker'),
    lower_whisker: real('lowerwhisker'),
    log_gdp_per_capita: real('Log GDP per capita'),
    social_support: real('Social support'),
    healthy_life_expectancy: real('Healthy life expectancy'),
    freedom_to_make_life_choices: real('Freedom to make life choices'),
    generosity: real('Generosity'),
    perceptions_of_corruption: real('Perceptions of corruption'),
    dystopia_residual: real('Dystopia + residual')
  });