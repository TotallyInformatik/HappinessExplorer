## How to run the project:

First, make sure that you are using the correct version of node. Versions that have been used to develop this
application include:
- v18.20.4
- v20.6.0
- v20.17.0
- v22.11.0

Then install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Technology used
This project was developed using NextJs, TailwindCSS, Shadcn and a Supabase Database as the backend storing our information.

For access to the supabase database, please contact us.

Concrete versions of packages and frameworks may be found in the `package.json` file.


## Deployment url
We deployed using Vercel instead of the gitlab cluster. The final deployment can be found under [https://happiness-explorer.vercel.app](https://happiness-explorer.vercel.app)


## Contributions
Rui Zhang - `./components/globe-explorer/*`, `./app/page.tsx`, `./app/layout.tsx`, initial header: `./components/ui/header.tsx`, Report

Tianjian Yi - `./app/compare/*`, `./components/ui/custom-line-chart.tsx`, Poster, Report 

Tamàs Nemes - `./lib/*`, `./app/leaderboard/*`, `./components/AnimatedGlobe.tsx`,`./components/Leaderboard.tsx`, `./components/LeaderboardRow.tsx`, `./components/ThemeProvider.tsx`,`./components/ThemeToggle.tsx`, `./components/YearSelection.tsx`, Supabase backend, Animated Logo using Rive, Logo design, Figma initial page design

Ian Wimmer - `./components/ui/country-detailed-view.tsx`, `./components/ui/custom-bar-chart.tsx`, `./components/ui/custom-card.tsx`, `./components/ui/custom-line-chart.tsx`, `./components/ui/custom-radial-bar-chart.tsx`, `./components/ui/header.tsx`, `./app/layout.tsx`, (Supabase backend), WCAG 2.1 AA evaluation, Poster
