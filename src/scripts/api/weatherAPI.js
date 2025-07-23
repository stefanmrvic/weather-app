import { buildURL } from '../utils/urlBuilder.js';
import { showError, hideError } from '../utils/errorHandler.js';
import { searchedCity, lastCitySearched, cachedFetch } from '../state/AppState.js';
import { renderDailyForecast } from '../dom/renderDailyForecast.js';
import { renderWeeklyForecast } from '../dom/renderWeeklyForecast.js';
import { renderWeatherDetails } from '../dom/renderWeatherDetails.js';

// Creating fetchResults function in order to store promise results into variable so I can cache it for multiple components across the app.
export async function fetchResults(url) {
    try {
        const fetchResult = await fetch(url, { mode: 'cors' });

        if (!fetchResult) {
            const error = new Error('Error: Unable to fetch the requested URL!');
            error.status = fetchResult.status;
            error.statusText = fetchResult.statusText;
            throw error;
        }

        const fetchedJSON = await fetchResult.json();

        // It stores fetch results into variable that will be used across multiple render functions to populate DOM based on the results.
        cachedFetch.setResults(fetchedJSON);

        hideError();

        return fetchResult;
    } catch (err) {
        // Checks if fetching failed and then it displays appropriate message to the user above search bar.
        if (err.message === 'Error: Unable to fetch the requested URL!') {
            showError('Error: Unable to fetch the requested URL!');
            return;
        }

        // Trying to catch all possible errors by following their API documentation here:
        // https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/#response-codes
        switch (err.status) {
            case 400:
            case 404:
                showError('Error: Searched City Not Found!');
                break;
            case 401:
                showError('Error: Unauthorized operation!');
                break;
            case 429:
                showError('Error: The account has exceeded their daily limit!');
                break;
            default:
                showError('Error: Uh oh, something went wrong. Try again!');
        }

        console.log(err);
        throw err;
    }
}

export async function fetchWeather(e) {
    // Prevents form from submitting and reloading the page.
    e.preventDefault();

    // Capturing current values of input field and last captured searched city through getter function from AppState.js
    const citySearched = searchedCity.getCity();
    const lastSearchedCity = lastCitySearched.getCity();

    // Exits early if search bar is empty and it doesn't have the record of the user's last searched city.
    if (!citySearched && !lastSearchedCity) return;

    const searchParam = citySearched ? citySearched : lastSearchedCity;

    let url = buildURL(searchParam);

    const result = await fetchResults(url);

    if (!result) throw new Error('Error: Unable to fetch the requested URL!');

    renderDailyForecast();
    renderWeatherDetails();
    renderWeeklyForecast();
}
