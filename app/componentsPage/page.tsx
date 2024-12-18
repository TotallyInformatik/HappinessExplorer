import { CountryDetailedViewContainer, card_visibility } from "@/components/ui/country-detailed-view";
import { DemographicComposition } from "@/components/ui/custom-bar-chart";
import { DetailedHappinessScore, HappinessScore } from "@/components/ui/custom-card";



const happinessScoreHistory = [
  { year: "2019", score: 7.76 } as HappinessScore,
  { year: "2020", score: 7.8 } as HappinessScore,
  { year: "2021", score: 7.84 } as HappinessScore,
  { year: "2022", score: 7.82 } as HappinessScore,
  { year: "2023", score: 7.8 } as HappinessScore,
  { year: "2024", score: 7.74 } as HappinessScore,
]


const happinessScore2024BurkinaFaso = {
  year: 2024,
  score: 4.548,
  logGDPPerCapita: 0.756,
  socialSupport: 0.685,
  healthyLifeExpectency: 0.274, 
  freedomOfLifeChoices: 0.483,
  generosity: 0.173,
  perceptionsOfCorruption: 0.179, 
  dystopiaResidual: 1.999
} as DetailedHappinessScore


const happinessScore2024Finland = {
  year: 2024,
  score: 7.74,
  logGDPPerCapita: 1.844,
  socialSupport: 1.572,
  healthyLifeExpectency: 0.695, 
  freedomOfLifeChoices: 0.859,
  generosity: 0.142,
  perceptionsOfCorruption:0.546, 
  dystopiaResidual: 2.082
} as DetailedHappinessScore



const demographicComposition = {
  happinessScore_young: 5.1,
  happinessScore_lower_middle: 7.8,
  happinessScore_upper_middle: 7.9,
  happinessScore_old: 6.9,
} as DemographicComposition


export default function Page() {
  
  const card_v = {
    show_title: true,
    show_score_history_card: true,
  } as card_visibility

  return <div className="">
    <div className="overflow-auto">
      <CountryDetailedViewContainer 
        country_name='Finland'
        country_flag_emoji="&#127467;&#127470;"
        rank={1} 
        happinessScore={happinessScore2024Finland as HappinessScore}
        happinessScoreHistory={happinessScoreHistory}
        card_visibility={card_v}
        adjust_on_large_device={true}
        detailedHappinessScore={happinessScore2024Finland}
        demographicComposition={demographicComposition}
      />
    </div>
    
    <hr/>
  </div>
}