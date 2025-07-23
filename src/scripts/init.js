import { showError, hideError } from './utils/errorHandler.js';
import { getUserCity } from './api/geolocationAPI.js';
import { fetchWeather, fetchResults } from './api/weatherAPI.js';
import { searchedCity } from './state/AppState.js';
import { renderDailyForecast } from './dom/renderDailyForecast.js';
import { renderWeeklyForecast } from './dom/renderWeeklyForecast.js';
import { renderWeatherDetails } from './dom/renderWeatherDetails.js';

const form = document.querySelector('.form');
const switchBtn = document.getElementById('switch');
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');

// It fetches weather data when the user pressed enter after typing out the city.
form.addEventListener('submit', fetchWeather);

// It captures what the user is typing and it's storing that into AppState.js, so it pass current input value as fetch keyword if the user switches temperature units.
search.addEventListener('input', () => {
    searchedCity.setCity(search.value.trim());
});

searchBtn.addEventListener('click', fetchWeather);
switchBtn.addEventListener('change', fetchWeather);

async function setInitialState() {
    // Gathering User Location through Geolocation API and the passing that city into Visual Crossing API to fetch weather data.
    try {
        const url = await getUserCity();
        const result = await fetchResults(url);

        if (!result) throw new Error('Error: Unable to fetch the requested URL!');

        hideError();

        await Promise.all([renderDailyForecast(), renderWeatherDetails(), renderWeeklyForecast()]);

        revealContent();

        // If any at step of the process something fails, it informs the user that initialization of data failed and it logs error into console.log.
    } catch (err) {
        showError('Error: Failed to initialize the data!');
        console.log(err);
        revealContent();
    }
}

async function revealContent() {
    // Making this function asynchronous so I can block it for 2 seconds to enable users to see the loading animation at the initial page load

    const main = document.querySelector('main');
    const containerBottom = document.querySelector('.container--bottom');
    const loader = document.querySelector('.loader__wrapper');

    main.classList.add('reveal');
    containerBottom.classList.add('reveal');
    loader.style.display = 'none';
}

setInitialState();
