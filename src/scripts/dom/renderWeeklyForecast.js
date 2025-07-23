import { cachedFetch } from '../state/AppState.js';
import { findWeatherImage } from '../utils/dom.js';

export async function renderWeeklyForecast() {
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

    const mondayIcon = findWeatherImage(cachedFetchResults.days[0].icon);
    const mondayImgSrc = await import(`/src/assets/SVG/${mondayIcon}.svg`);
    mondayImg.src = mondayImgSrc.default;
    mondayTemperature.textContent = cachedFetchResults.days[0].temp + metricUnit;

    const tuesdayIcon = findWeatherImage(cachedFetchResults.days[1].icon);
    const tuesdayImgSrc = await import(`/src/assets/SVG/${tuesdayIcon}.svg`);
    tuesdayImg.src = tuesdayImgSrc.default;
    tuesdayTemperature.textContent = cachedFetchResults.days[1].temp + metricUnit;

    const wednesdayIcon = findWeatherImage(cachedFetchResults.days[2].icon);
    const wednesdayImgSrc = await import(`/src/assets/SVG/${wednesdayIcon}.svg`);
    wednesdayImg.src = wednesdayImgSrc.default;
    wednesdayTemperature.textContent = cachedFetchResults.days[2].temp + metricUnit;

    const thursdayIcon = findWeatherImage(cachedFetchResults.days[3].icon);
    const thursdayImgSrc = await import(`/src/assets/SVG/${thursdayIcon}.svg`);
    thursdayImg.src = thursdayImgSrc.default;
    thursdayTemperature.textContent = cachedFetchResults.days[3].temp + metricUnit;

    const fridayIcon = findWeatherImage(cachedFetchResults.days[4].icon);
    const fridayImgSrc = await import(`/src/assets/SVG/${fridayIcon}.svg`);
    fridayImg.src = fridayImgSrc.default;
    fridayTemperature.textContent = cachedFetchResults.days[4].temp + metricUnit;

    const saturdayIcon = findWeatherImage(cachedFetchResults.days[5].icon);
    const saturdayImgSrc = await import(`/src/assets/SVG/${saturdayIcon}.svg`);
    saturdayImg.src = saturdayImgSrc.default;
    saturdayTemperature.textContent = cachedFetchResults.days[5].temp + metricUnit;

    const sundayIcon = findWeatherImage(cachedFetchResults.days[6].icon);
    const sundayImgSrc = await import(`/src/assets/SVG/${sundayIcon}.svg`);
    sundayImg.src = sundayImgSrc.default;
    sundayTemperature.textContent = cachedFetchResults.days[6].temp + metricUnit;
}
