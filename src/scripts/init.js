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

function setInitialState() {
    // Gathering user location through Geolocation API and then passing that city into Visual Crossing API to fetch weather data.
    getUserCity()
        .then((url) => {
            fetchResults(url);
            hideError();
        })
        .then(() => {
            // Calls all of the DOM rendering function and waits until they are all done executing
            return Promise.all([
                renderDailyForecast(),
                renderWeatherDetails(),
                renderWeeklyForecast(),
            ]);
        })
        .catch((err) => {
            // If any at step of the process something fails, it informs the user that initialization of data failed and it logs error into console.log.
            console.log(err);
            throw err;
        })
        .finally(() => {
            // Reveals content regardless of whether the fetch was successful or not, so the user can still see fallback data until they search for a city.
            revealContent();
        });
}

function revealContent() {
    const main = document.querySelector('main');
    const containerBottom = document.querySelector('.container--bottom');
    const loader = document.querySelector('.loader__wrapper');

    main.classList.add('reveal');
    containerBottom.classList.add('reveal');
    loader.style.display = 'none';
}

setInitialState();
