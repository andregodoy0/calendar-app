# Getting Started with Calendar App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In order to run it you need to:
- Have [NodeJS](https://nodejs.org/) and [pNPm](https://pnpm.io/) installed
- Install dependencies with `pnpm install`
- Optionally have a [WeatherApi](https://www.weatherapi.com/my/) key to fetch weather data for the reminder location if within the next three days.

## Running the project (development): `pnpm test`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

If you want to have forecast data with your API just export the value to `API_KEY` in your environment or prepend to the command like so:
`API_KEY=<your_api_key> pnpm start`

### Running tests: `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Make production bundle: `pnpm build`

Make sure to export `NODE_ENV=production` and `API_KEY` for the app to work correctly.

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
