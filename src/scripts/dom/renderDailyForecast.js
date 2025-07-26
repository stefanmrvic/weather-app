import { findWeatherImage } from '../utils/dom.js';
import { lastCitySearched, cachedFetch, isFirstLoad } from '../state/AppState.js';

export function renderDailyForecast() {
    return new Promise((resolve) => {
        const weatherConditions = document.querySelector('.weather__conditions');
        const weatherCity = document.querySelector('.weather__city');
        const weatherDate = document.querySelector('.weather__date');
        const weatherTime = document.querySelector('.weather__time');
        const weatherTemperature = document.getElementById('temperature');
        const weatherImg = document.getElementById('icon');

        const switchBtn = document.getElementById('switch');

        const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';

        const currentTime = new Date();
        const hour = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        const cachedFetchResults = cachedFetch.getResults();

        // It populates City, Temperature, Date/Time, and Conditions from the fetched JSON object
        weatherConditions.textContent = cachedFetchResults.days[0].conditions;
        weatherCity.textContent = cachedFetchResults.resolvedAddress.split(',')[0];
        weatherDate.textContent = cachedFetchResults.days[0].datetime;
        weatherTime.textContent = `${hour}:${minutes}`;
        weatherTemperature.textContent = cachedFetchResults.days[0].temp + metricUnitTemperature;

        // Stores from which city is user so it can convert celsius to fahrenheit and vice-verca when search bar is empty
        lastCitySearched.setCity(weatherCity.textContent);

        const weatherIcon = findWeatherImage(cachedFetchResults.days[0].icon);

        // If the initial reading of the user data fails, it will fallback to cloudy icon
        import(`/src/assets/SVG/${weatherIcon}.svg`)
            .then((icon) => {
                weatherImg.src = icon.default;
            })
            .catch(() => {
                weatherImg.src = `/src/assets/SVG/cloudy.svg`;
            })
            .finally(() => {
                // Block of code in charge of putting the intentional 2sec delay when initially loading the content so the user can see the loading animation
                const firstLoad = isFirstLoad.get();

                // Detects if it's the initial load of the page
                if (firstLoad) {
                    // Putting delay of 2 seconds so that users can see the animation (otherwise it loads instantly and you can't see it)

                    setTimeout(() => {
                        // Sets firstLoad variable to false after the initial delay of 2 seconds because otherwise the user would wait for 2 seconds after each city search after the initial loading screen
                        isFirstLoad.set(false);

                        console.log('done after 2 seconds... ehaa!');
                        resolve();
                    }, 2000);
                }
            });
    });
}
