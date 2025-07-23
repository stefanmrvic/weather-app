import { cachedFetch } from '../state/AppState.js';

export async function renderWeatherDetails() {
    const feelsLikeTemperature = document.querySelector('.feels-like__temperature');
    const humidityPercentage = document.querySelector('.humidity__percentage');
    const windSpeed = document.querySelector('.wind-speed__speed');

    const switchBtn = document.getElementById('switch');

    const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';
    const metricUnitSpeed = switchBtn.checked ? ' mi/h' : ' km/h';

    const chanceOfPrecipTitle = document.querySelector('.chance-of-precip__title');
    const chanceOfPrecipPercentage = document.querySelector('.chance-of-precip__percentage');

    const cachedFetchResults = cachedFetch.getResults();

    feelsLikeTemperature.textContent = cachedFetchResults.days[0].feelslike + metricUnitTemperature;
    humidityPercentage.textContent = cachedFetchResults.days[0].humidity + ' %';
    windSpeed.textContent = cachedFetchResults.days[0].windspeed + metricUnitSpeed;

    if (cachedFetchResults.days[0].preciptype === null) {
        chanceOfPrecipTitle.textContent = 'Chance of Rain';
        chanceOfPrecipPercentage.textContent = '0 %';
        return;
    }

    const title = cachedFetchResults.days[0].preciptype[0];
    const capitalizedTitle = title[0].toUpperCase() + title.slice(1);

    chanceOfPrecipTitle.textContent = `Chance of ${capitalizedTitle}`;
    chanceOfPrecipPercentage.textContent = cachedFetchResults.days[0].precipprob + ' %';
}
