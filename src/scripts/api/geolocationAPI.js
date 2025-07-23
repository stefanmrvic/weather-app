import { lastCitySearched } from '../state/AppState.js';

// Geolocation API that gather user's approximate location so it can be used for initial Weather API fetch
export async function getUserCity() {
    const url = 'https://geolocation-db.com/json/';

    try {
        const fetchResults = await fetch(url, { mode: 'cors' });

        if (!fetchResults.ok) throw new Error('Error: Unable to fetch the requested URL!');

        const fetchedJSON = await fetchResults.json();

        // Stores from which city is user so it can convert celsius to fahrenheit and vice-verca when search bar is empty
        lastCitySearched.setCity(fetchedJSON.city);

        return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetchedJSON.city}/next7days?unitGroup=metric&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    } catch ({ name, msg }) {
        throw new Error(`${name}: ${msg}`);
    }
}
