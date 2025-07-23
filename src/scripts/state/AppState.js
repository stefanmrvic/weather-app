// Module for storing searched city so it can be used when user switches temperature units.

let firstLoad = true;

export const isFirstLoad = {
    get: () => firstLoad,
    set: (boolean) => (firstLoad = boolean),
};

Object.freeze(isFirstLoad);

let inputedCity;

export const searchedCity = {
    getCity: () => inputedCity,
    setCity: (city) => (inputedCity = city),
};

Object.freeze(searchedCity);

// Stores last searched city so that conversion from celsius to fahrenheit and vice-verca can be done when the search bar is empty.
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
