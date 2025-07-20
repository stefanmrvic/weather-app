const form = document.querySelector('.form');
const switchBtn = document.getElementById('switch');
const search = document.getElementById('search');

form.addEventListener('submit', fetchWeather);
switchBtn.addEventListener('change', kurcina);

function kurcina() {
    let url;

    if (switchBtn.checked) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}/next7days?unitGroup=us&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;
    } else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;
    }

    generateWeatherInfoLeft(url);
    generateWeatherInfoRight(url);
    generateNext7Days(url);
}

function fetchWeather(e) {
    e.preventDefault();

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;

    generateWeatherInfoLeft(url);
    generateWeatherInfoRight(url);
    generateNext7Days(url);
}

function generateNext7Days(url) {
    const mondayTemperature = document.querySelector('.monday__temperature');
    const tuesdayTemperature = document.querySelector('.tuesday__temperature');
    const wednesdayTemperature = document.querySelector('.wednesday__temperature');
    const thursdayTemperature = document.querySelector('.thursday__temperature');
    const fridayTemperature = document.querySelector('.friday__temperature');
    const saturdayTemperature = document.querySelector('.saturday__temperature');
    const sundayTemperature = document.querySelector('.sunday__temperature');

    const metricUnit = switchBtn.checked ? ' °F' : ' °C';

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => {
            mondayTemperature.textContent = response.days[0].temp + metricUnit;
            tuesdayTemperature.textContent = response.days[1].temp + metricUnit;
            wednesdayTemperature.textContent = response.days[2].temp + metricUnit;
            thursdayTemperature.textContent = response.days[3].temp + metricUnit;
            fridayTemperature.textContent = response.days[4].temp + metricUnit;
            saturdayTemperature.textContent = response.days[5].temp + metricUnit;
            sundayTemperature.textContent = response.days[6].temp + metricUnit;
        })
        .catch((error) => console.log(error));
}

function generateWeatherInfoLeft(url) {
    const weatherConditions = document.querySelector('.weather__conditions');
    const weatherCity = document.querySelector('.weather__city');
    const weatherDate = document.querySelector('.weather__date');
    const weatherTime = document.querySelector('.weather__time');
    const weatherTemperature = document.getElementById('temperature');

    const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';

    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => {
            weatherConditions.textContent = response.days[0].conditions;
            weatherCity.textContent = response.resolvedAddress.split(',')[0];
            weatherDate.textContent = response.days[0].datetime;
            weatherTime.textContent = `${hour}:${minutes}`;
            weatherTemperature.textContent = response.days[0].temp + metricUnitTemperature;
        })
        .catch((error) => console.log(error));
}

function generateWeatherInfoRight(url) {
    const feelsLikeTemperature = document.querySelector('.feels-like__temperature');
    const humidityPercentage = document.querySelector('.humidity__percentage');
    const chanceOfPrecipTitle = document.querySelector('.chance-of-precip__title');
    const chanceOfPrecipPercentage = document.querySelector('.chance-of-precip__percentage');
    const windSpeed = document.querySelector('.wind-speed__speed');

    const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';
    const metricUnitSpeed = switchBtn.checked ? ' mi/h' : ' km/h';

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => {
            feelsLikeTemperature.textContent = response.days[0].feelslike + metricUnitTemperature;
            humidityPercentage.textContent = response.days[0].humidity + ' %';
            windSpeed.textContent = response.days[0].windspeed + metricUnitSpeed;
            chanceOfPrecipPercentage.textContent = response.days[0].precipprob + ' %';

            const upperCasedTitle = response.days[0].preciptype[0].toUpperCase();
            const capitalizedTitle = upperCasedTitle[0] + response.days[0].preciptype[0].slice(1);

            chanceOfPrecipTitle.textContent = `Chance of ${capitalizedTitle}`;
        })
        .catch((error) => console.log(error));
}

function getUserCity() {
    const url = 'https://geolocation-db.com/json/';

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => {
            return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${response.city}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;
        })
        .catch((error) => console.log(error));
}

function setInitialState() {
    const promise = new Promise((resolve) => {
        resolve(getUserCity());
    });

    const promise1 = promise
        .then((url) => {
            return generateWeatherInfoLeft(url);
        })
        .then(() => {
            const city = document.querySelector('.weather__city').textContent;
            search.value = city;
        });

    const promise2 = promise.then((url) => {
        return generateWeatherInfoRight(url);
    });

    const promise3 = promise.then((url) => {
        return generateNext7Days(url);
    });

    //Promise.all([promise1, promise2, promise3]).then(() => {});
}

setInitialState();
