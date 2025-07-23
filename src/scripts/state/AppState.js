// Module for managing the app state

// Check if it's the initial page load so that user doesn't have to wait 2 seconds delay that I've added for user to see
// loading animation when he loads the app for the first time.
let firstLoad = true;

export const isFirstLoad = {
    get: () => firstLoad,
    set: (boolean) => (firstLoad = boolean),
};

// Freezes the object to prevent modifications to its properties or prototype.
Object.freeze(isFirstLoad);

// Storing what is the current city input value so that it can be used when the user pressed the enter to submit the form.
let inputedCity;

export const searchedCity = {
    getCity: () => inputedCity,
    setCity: (city) => (inputedCity = city),
};

Object.freeze(searchedCity);

// Storing last searched city so that conversion from celsius to fahrenheit and vice-verca can be done when the search bar is empty.
let lastCity;

export const lastCitySearched = {
    getCity: () => lastCity,
    setCity: (city) => (lastCity = city),
};

Object.freeze(lastCitySearched);

// Storing successful response from the server to prevent redundant/multiple fetch requests in order to render different sections.
let cachedFetchResults;

export const cachedFetch = {
    getResults: () => cachedFetchResults,
    setResults: (results) => (cachedFetchResults = results),
};

Object.freeze(cachedFetch);
