import { Button } from "@/components/ui/button";
import { CountryDetailedViewContainer, card_visibility } from "@/components/ui/country-detailed-view";
import { DetailedHappinessScore, HappinessScore } from "@/components/ui/custom-card";



const happinessScoreHistory = [
  { year: "2019", score: 7.76 } as HappinessScore,
  { year: "2020", score: 7.8 } as HappinessScore,
  { year: "2021", score: 7.84 } as HappinessScore,
  { year: "2022", score: 7.82 } as HappinessScore,
  { year: "2023", score: 7.8 } as HappinessScore,
  { year: "2024", score: 7.74 } as HappinessScore,
]


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



export default function Page() {
  
  const card_v = {
    show_title: true,
    show_score_history_card: true,
  } as card_visibility

  return <>
    <h2>Components Page</h2>
    <Button>Button</Button>
    <hr className="mt-64"/>
    <CountryDetailedViewContainer 
      country_name='Finland'
      country_flag_emoji="&#127467;&#127470;"
      rank={1} 
      happinessScore={{year: happinessScore2024Finland.year, score: happinessScore2024Finland.score} as HappinessScore}
      happinessScoreHistory={happinessScoreHistory}
      card_visibility={card_v}
      detailedHappinessScore={happinessScore2024Finland}
    />
    <hr/>
  </>
}