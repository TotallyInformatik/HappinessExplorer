import { 
  RankCard, 
  HappinessScoreProgressCard, 
  HappinessScore, 
  ScoreHistoryCard, 
  DetailedHappinessScore, 
  ContributingFactorsCard, 
  DemographicCompositionCard, 
  TitleCard 
} from "./custom-card"
import clsx from "clsx";
import { DemographicComposition } from "./custom-bar-chart";



// custom type for card visibility
// lets the user of the component decide which cards should be shown
export type card_visibility = {
  show_title?: boolean,
  show_year_in_title?: boolean,
  show_delete_button?: boolean, // functionality removed but for backwards compatibility variable still present
  show_rank_card?: boolean,
  show_happiness_score_progress_card?: boolean,
  show_score_history_card?: boolean,
  show_contributing_factors_card?: boolean,
  show_demographic_composition_card?: boolean,
}

// for default values of the cards (later used in createCardVisibilityVariables function)
const defaultCardVisibility: Required<card_visibility> = {
  show_title: true,
  show_year_in_title: true,
  show_delete_button: true,
  show_rank_card: true,
  show_happiness_score_progress_card: true,
  show_score_history_card: true,
  show_contributing_factors_card: true,
  show_demographic_composition_card: false,
};




// CountryDetailedViewContainer Component
export const CountryDetailedViewContainer = ({
  country_name,
  country_flag_emoji,
  rank,
  happinessScore,
  happinessScoreHistory,
  detailedHappinessScore,
  demographicComposition,
  adjust_on_large_device = true,
  card_visibility,
}: {
  country_name: string,
  country_flag_emoji: string,
  rank: number | string,
  happinessScore: HappinessScore,
  happinessScoreHistory: HappinessScore[],
  detailedHappinessScore: DetailedHappinessScore,
  demographicComposition: DemographicComposition,




  adjust_on_large_device?: boolean,
  card_visibility?: card_visibility,
}): React.ReactNode => {
  // get visibility variables (filled up with the default values)
  const [
    show_title, 
    show_year_in_title, 
    show_rank_card, 
    show_happiness_score_progress_card, 
    show_score_history_card, 
    show_contributing_factors_card, 
    show_demographic_composition_card ] = createCardVisibilityVariables(card_visibility)


  return (
    <div className={clsx(
    "flex flex-row items-center h-[281px] gap-3 w-fit justify-end p-[1.875rem]",
    {
      "md:flex-col md:items-center md:h-auto md:w-full": adjust_on_large_device // used for responsiveness (if requested by user (adjust_on_large_device))
    })}>
      {/* Title Card */}
      {show_title && <TitleCard 
        country_flag_emoji={country_flag_emoji} 
        country_name={country_name} 
        happinessScore={happinessScore} 
        show_year_in_title={show_year_in_title} 
        adjust_on_large_device={adjust_on_large_device}
      />}
      {/* Rank Card */}
      {show_rank_card && <RankCard 
        rank={rank} 
        adjust_on_large_device={adjust_on_large_device}
      />}
      {/* Happiness Score Progress Card */}
      {show_happiness_score_progress_card && <HappinessScoreProgressCard 
        score={happinessScore} 
        adjust_on_large_device={adjust_on_large_device}
      />}
      {/* Score History Card */}
      {show_score_history_card && <ScoreHistoryCard 
        label={country_name} 
        scoreHistory={happinessScoreHistory} 
        adjust_on_large_device={adjust_on_large_device}
      />}
      {/* Contributing Factors Card */}
      {show_contributing_factors_card && <ContributingFactorsCard 
        detailedHappinessScore={detailedHappinessScore} 
        adjust_on_large_device={adjust_on_large_device}
      />}
      {/* Demographic Composition Card */}
      {show_demographic_composition_card && <DemographicCompositionCard 
        demographicComposition={demographicComposition} 
        adjust_on_large_device={adjust_on_large_device}
      />}
    </div>
  )
}




// Function for card visibility
// Necessary so that not all variables in type card_visibility have to be set
// Completes overrides to full card_visibility type with defaultCardVisibility values
function createCardVisibilityVariables(overrides?: card_visibility): boolean[] {
  const merged = {
    ...defaultCardVisibility,
    ...overrides,
  };

  return [
    merged.show_title,
    merged.show_year_in_title,
    merged.show_rank_card,
    merged.show_happiness_score_progress_card,
    merged.show_score_history_card,
    merged.show_contributing_factors_card,
    merged.show_demographic_composition_card
  ];
}

