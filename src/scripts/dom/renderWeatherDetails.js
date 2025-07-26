import { cachedFetch } from '../state/AppState.js';

export function renderWeatherDetails() {
    return new Promise((resolve) => {
        const feelsLikeTemperature = document.querySelector('.feels-like__temperature');
        const humidityPercentage = document.querySelector('.humidity__percentage');
        const windSpeed = document.querySelector('.wind-speed__speed');

        const switchBtn = document.getElementById('switch');

        const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';
        const metricUnitSpeed = switchBtn.checked ? ' mi/h' : ' km/h';

        const chanceOfPrecipTitle = document.querySelector('.chance-of-precip__title');
        const chanceOfPrecipPercentage = document.querySelector('.chance-of-precip__percentage');

        const cachedFetchResults = cachedFetch.getResults();

        // It populates Humidity, Chance of Rain, Wind Speed, etc. based on the fetched JSON object
        feelsLikeTemperature.textContent =
            cachedFetchResults.days[0].feelslike + metricUnitTemperature;
        humidityPercentage.textContent = cachedFetchResults.days[0].humidity + ' %';
        windSpeed.textContent = cachedFetchResults.days[0].windspeed + metricUnitSpeed;

        // Checks if the JSON Object contains preciptype, if not, it fallsback to the default preciptype - Rain
        if (cachedFetchResults.days[0].preciptype === null) {
            chanceOfPrecipTitle.textContent = 'Chance of Rain';
            chanceOfPrecipPercentage.textContent = '0 %';
            resolve();
            return;
        }

        // Uppercasing the preciptype from JSON object because it comes lowercased
        const title = cachedFetchResults.days[0].preciptype[0];
        const capitalizedTitle = title[0].toUpperCase() + title.slice(1);

        chanceOfPrecipTitle.textContent = `Chance of ${capitalizedTitle}`;
        chanceOfPrecipPercentage.textContent = cachedFetchResults.days[0].precipprob + ' %';

        resolve();
    });
}
