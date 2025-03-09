This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Setup and running

The project uses npm 11.2.0 and node 22.14.0. Any combinations of fairly recent versions of these should work.

1. clone repo
2. install dependencies `npm i`
3. create `.env` file at the root of project, add the Gemini key as NEXT_PUBLIC_GEMINI_API_KEY (`NEXT_PUBLIC_GEMINI_API_KEY=xxxx`)
4. run the dev server `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

# Choices / assumptions

- uses NextJS + Tailwind
- uses Autocomplete React npm package: not best choice in hindsight (writen using react classes? No TS support)
- Standard coding tools: ESLint, prettier
- Native browser fetch
- Gemini for the api
  - pros: easy to use, same endpoint can be used for both calls (cities + recommendations), with minimal config
  - cons: erractic results for cities, needs a much more precise prompt to get the results we want
- replace first call (list of city suggestions) with more "standard" api? LLM would need quite a bit of testing and refining
- use LLM for recommendation list? Would make sense to get "rounded" results quickly, but more prone to errors and again, require lots of testing

# Improvements

## Tech Debts

- RQ to facilate:
  - error management
  - throttling
  - abstract the fetch call and remove from useeffect
  - cancel ongoing calls when making new calls
  - cache results from call (specifically cities call)
- a lot of work needed on styling and CSS organisation: Styled comp? Standalone CSS partials? Make full use of Tailwind?
- finish second part of the app and display list of recommendations (more consideration on how to organise the components, make list of results sibling of input? pass state to parent and then back down? use context?)
- some refactoring around component organisation (especially with the adding of the recommendation list)

## Extend With Features

- Geolocation (especially for mobile)
- Recent searches (LS/SS, user API)
- Context: if we had user "accounts": get default location from profile, log in with Google/other service
- Accept different input types: city, continent, country, county/region; geolocation data
