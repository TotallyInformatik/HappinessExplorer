import { RankCard, HappinessScoreProgressCard, HappinessScore, ScoreHistoryCard, DetailedHappinessScore, ContributingFactorsCard, DemographicCompositionCard, TitleCard } from "./custom-card"
import { Button } from "@/components/ui/button"
import clsx from "clsx";
import { Trash2 } from "lucide-react"
import { DemographicComposition } from "./custom-bar-chart";



export type card_visibility = {
  show_title?: boolean,
  show_year_in_title?: boolean,
  show_delete_button?: boolean,
  show_rank_card?: boolean,
  show_happiness_score_progress_card?: boolean,
  show_score_history_card?: boolean,
  show_contributing_factors_card?: boolean,
  show_demographic_composition_card?: boolean,
}

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
  const [show_title, show_year_in_title, show_rank_card, show_happiness_score_progress_card, show_score_history_card, show_contributing_factors_card, show_demographic_composition_card] = createCardVisibilityVariables(card_visibility)


  return (
    <div className={clsx(
    "flex flex-row items-center h-[281px] gap-3 w-fit justify-end p-[1.875rem]",
    {
      "md:flex-col md:items-center md:h-auto md:w-full": adjust_on_large_device
    })}>
      {show_title && <TitleCard country_flag_emoji={country_flag_emoji} country_name={country_name} happinessScore={happinessScore} show_year_in_title={show_year_in_title} adjust_on_large_device={adjust_on_large_device}></TitleCard>}
      {show_rank_card && <RankCard rank={rank} adjust_on_large_device={adjust_on_large_device}></RankCard>}
      {show_happiness_score_progress_card && <HappinessScoreProgressCard score={happinessScore} adjust_on_large_device={adjust_on_large_device}></HappinessScoreProgressCard>}
      {show_score_history_card && <ScoreHistoryCard label={country_name} scoreHistory={happinessScoreHistory} adjust_on_large_device={adjust_on_large_device}></ScoreHistoryCard>}
      {show_contributing_factors_card && <ContributingFactorsCard detailedHappinessScore={detailedHappinessScore} adjust_on_large_device={adjust_on_large_device}></ContributingFactorsCard>}
      {show_demographic_composition_card && <DemographicCompositionCard demographicComposition={demographicComposition} adjust_on_large_device={adjust_on_large_device}></DemographicCompositionCard>}
    </div>
  )
}




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

