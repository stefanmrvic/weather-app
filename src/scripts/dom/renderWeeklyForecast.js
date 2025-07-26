import { cachedFetch } from '../state/AppState.js';
import { findWeatherImage } from '../utils/dom.js';

export function renderWeeklyForecast() {
    return new Promise((resolve) => {
        const mondayTemperature = document.querySelector('.monday__temperature');
        const mondayImg = document.querySelector('.monday__img');
        const tuesdayTemperature = document.querySelector('.tuesday__temperature');
        const tuesdayImg = document.querySelector('.tuesday__img');
        const wednesdayTemperature = document.querySelector('.wednesday__temperature');
        const wednesdayImg = document.querySelector('.wednesday__img');
        const thursdayTemperature = document.querySelector('.thursday__temperature');
        const thursdayImg = document.querySelector('.thursday__img');
        const fridayTemperature = document.querySelector('.friday__temperature');
        const fridayImg = document.querySelector('.friday__img');
        const saturdayTemperature = document.querySelector('.saturday__temperature');
        const saturdayImg = document.querySelector('.saturday__img');
        const sundayTemperature = document.querySelector('.sunday__temperature');
        const sundayImg = document.querySelector('.sunday__img');

        const switchBtn = document.getElementById('switch');

        const metricUnit = switchBtn.checked ? ' °F' : ' °C';

        const cachedFetchResults = cachedFetch.getResults();

        // Populating the SVG icons on the bottom section depending if it's rainy, cloudy, sunny, or foggy day from the fetched JSON Object
        const mondayIcon = findWeatherImage(cachedFetchResults.days[0].icon);
        const mondayPromise = import(`/src/assets/SVG/${mondayIcon}.svg`).then((icon) => {
            mondayImg.src = icon.default;
            mondayTemperature.textContent = cachedFetchResults.days[0].temp + metricUnit;
        });

        const tuesdayIcon = findWeatherImage(cachedFetchResults.days[1].icon);
        const tuesdayPromise = import(`/src/assets/SVG/${tuesdayIcon}.svg`).then((icon) => {
            tuesdayImg.src = icon.default;
            tuesdayTemperature.textContent = cachedFetchResults.days[1].temp + metricUnit;
        });

        const wednesdayIcon = findWeatherImage(cachedFetchResults.days[2].icon);
        const wednesdayPromise = import(`/src/assets/SVG/${wednesdayIcon}.svg`).then((icon) => {
            wednesdayImg.src = icon.default;
            wednesdayTemperature.textContent = cachedFetchResults.days[2].temp + metricUnit;
        });

        const thursdayIcon = findWeatherImage(cachedFetchResults.days[3].icon);
        const thursdayPromise = import(`/src/assets/SVG/${thursdayIcon}.svg`).then((icon) => {
            thursdayImg.src = icon.default;
            thursdayTemperature.textContent = cachedFetchResults.days[3].temp + metricUnit;
        });

        const fridayIcon = findWeatherImage(cachedFetchResults.days[4].icon);
        const fridayPromise = import(`/src/assets/SVG/${fridayIcon}.svg`).then((icon) => {
            fridayImg.src = icon.default;
            fridayTemperature.textContent = cachedFetchResults.days[4].temp + metricUnit;
        });

        const saturdayIcon = findWeatherImage(cachedFetchResults.days[5].icon);
        const saturdayPromise = import(`/src/assets/SVG/${saturdayIcon}.svg`).then((icon) => {
            saturdayImg.src = icon.default;
            saturdayTemperature.textContent = cachedFetchResults.days[5].temp + metricUnit;
        });

        const sundayIcon = findWeatherImage(cachedFetchResults.days[6].icon);
        const sundayPromise = import(`/src/assets/SVG/${sundayIcon}.svg`).then((icon) => {
            sundayImg.src = icon.default;
            sundayTemperature.textContent = cachedFetchResults.days[6].temp + metricUnit;
        });

        Promise.all([
            mondayPromise,
            tuesdayPromise,
            wednesdayPromise,
            thursdayPromise,
            fridayPromise,
            saturdayPromise,
            sundayPromise,
        ]).then(() => resolve());
    });
}
