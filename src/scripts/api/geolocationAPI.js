import { lastCitySearched } from '../state/AppState.js';

// Geolocation API that gather user's approximate location so it can be used for initial Weather API fetch
export function getUserCity() {
    const url = 'https://geolocation-db.com/json/';

    return fetch(url, { mode: 'cors' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Error: Geolocation API fetch failed! \n${response.status}: ${response.statusText}`
                );
            }
            return response.json();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
        .then((response) => {
            // Stores from which city is user so it can convert celsius to fahrenheit and vice-verca when search bar is empty
            lastCitySearched.setCity(response.city);

            return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${response.city}/next7days?unitGroup=metric&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
        })
        .catch((err) => {
            console.log(err);
            throw new Error('Error: Unable to parse the JSON file of getUserCity()!');
        });
}
