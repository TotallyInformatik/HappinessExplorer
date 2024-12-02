import { RankCard, HappinessScoreProgressCard, HappinessScore, ScoreHistoryCard, DetailedHappinessScore, ContributingFactorsCard, DemographicCompositionCard } from "./custom-card"
import { Button } from "@/components/ui/button"
import clsx from "clsx";
import { Trash2 } from "lucide-react"
import { DemographicComposition } from "./custom-bar-chart";



export type card_visibility = {
  show_title?: boolean,
  show_delete_button?: boolean,
  show_rank_card?: boolean,
  show_happiness_score_progress_card?: boolean,
  show_score_history_card?: boolean,
  show_contributing_factors_card?: boolean,
  show_demographic_composition_card?: boolean,
}

const defaultCardVisibility: Required<card_visibility> = {
  show_title: true,
  show_delete_button: true,
  show_rank_card: true,
  show_happiness_score_progress_card: true,
  show_score_history_card: true,
  show_contributing_factors_card: true,
  show_demographic_composition_card: true,
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
  const [show_title, show_delete_button, show_rank_card, show_happiness_score_progress_card, show_score_history_card, show_contributing_factors_card, show_demographic_composition_card] = createCardVisibilityVariables(card_visibility)


  const wrapperClassName = clsx(
    "flex flex-row items-center h-[281px] gap-3 p-[1.875rem]",
    {
      "md:flex-col md:items-center md:h-auto": adjust_on_large_device
    })
  const navButtonClassName = 'rounded-full h-[2.5rem] w-[2.5rem] px-0 py-0 bg-red-600 text-white hover:bg-red-500 active:bg-red-700'


  
  const title = show_title && (
    <div className="w-[158px] h-fit shrink-0">
      <p className="text-5xl">{country_flag_emoji}</p>
      <p className="text-2xl font-semibold">{country_name}</p>
      <p className="text-sm text-slate-500 leading-3">in {happinessScore.year}</p>
      <div className="pt-4 flex gap-2.5">
        {show_delete_button ? (<Button className={navButtonClassName}><Trash2/></Button>) : ''}
      </div>
    </div>
  )

  return <div className={wrapperClassName}>
    {title}
    {show_rank_card && <RankCard rank={rank} adjust_on_large_device={adjust_on_large_device}></RankCard>}
    {show_happiness_score_progress_card && <HappinessScoreProgressCard score={happinessScore} adjust_on_large_device={adjust_on_large_device}></HappinessScoreProgressCard>}
    {show_score_history_card && <ScoreHistoryCard label={country_name} scoreHistory={happinessScoreHistory} adjust_on_large_device={adjust_on_large_device}></ScoreHistoryCard>}
    {show_contributing_factors_card && <ContributingFactorsCard detailedHappinessScore={detailedHappinessScore} adjust_on_large_device={adjust_on_large_device}></ContributingFactorsCard>}
    {show_demographic_composition_card && <DemographicCompositionCard demographicComposition={demographicComposition} adjust_on_large_device={adjust_on_large_device}></DemographicCompositionCard>}
  </div>
}

// {show_contributing_factors_card && <ContributingFactoryCard detailedHappinessScore={detailedHappinessScore}></ContributingFactoryCard>}

function createCardVisibilityVariables(overrides?: card_visibility): boolean[] {
  const merged = {
    ...defaultCardVisibility,
    ...overrides,
  };

  return [
    merged.show_title,
    merged.show_delete_button,
    merged.show_rank_card,
    merged.show_happiness_score_progress_card,
    merged.show_score_history_card,
    merged.show_contributing_factors_card,
    merged.show_demographic_composition_card
  ];
}

