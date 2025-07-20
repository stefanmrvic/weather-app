const form = document.querySelector('.form');

form.addEventListener('submit', fetchWeather);

function fetchWeather(e) {
    e.preventDefault();

    const search = document.getElementById('search');

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;

    fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

function generateNext7Days() {
    const mondayTemperature = document.querySelector('.monday__temperature');
    const tuesdayTemperature = document.querySelector('.tuesday__temperature');
    const wednesdayTemperature = document.querySelector('.wednesday__temperature');
    const thursdayTemperature = document.querySelector('.thursday__temperature');
    const fridayTemperature = document.querySelector('.friday__temperature');
    const saturdayTemperature = document.querySelector('.saturday__temperature');
    const sundayTemperature = document.querySelector('.sunday__temperature');

    const promise = new Promise((resolve) => {
        resolve(getUserCity());
    });

    promise.then((city) => {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;

        fetch(url, { mode: 'cors' })
            .then((response) => response.json())
            .then((response) => {
                mondayTemperature.textContent = response.days[0].temp + ' C';
                tuesdayTemperature.textContent = response.days[1].temp + ' C';
                wednesdayTemperature.textContent = response.days[2].temp + ' C';
                thursdayTemperature.textContent = response.days[3].temp + ' C';
                fridayTemperature.textContent = response.days[4].temp + ' C';
                saturdayTemperature.textContent = response.days[5].temp + ' C';
                sundayTemperature.textContent = response.days[6].temp + ' C';
            })
            .catch((error) => console.log(error));
    });
}

function generateWeatherInfoLeft() {}

function generateWeatherInfoRight() {
    const feelsLikeTemperature = document.querySelector('.feels-like__temperature');
    const humidityPercentage = document.querySelector('.humidity__percentage');
    const chanceOfPrecipTitle = document.querySelector('.chance-of-precip__title');
    const chanceOfPrecipPercentage = document.querySelector('.chance-of-precip__percentage');
    const windSpeed = document.querySelector('.wind-speed__speed');

    const promise = new Promise((resolve) => {
        resolve(getUserCity());
    });

    promise.then((city) => {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;

        fetch(url, { mode: 'cors' })
            .then((response) => response.json())
            .then((response) => {
                feelsLikeTemperature.textContent = response.days[0].feelslike + ' C';
                humidityPercentage.textContent = response.days[0].humidity + ' %';
                windSpeed.textContent = response.days[0].windspeed + ' km/h';
                chanceOfPrecipPercentage.textContent = response.days[0].precipprob + ' %';

                const upperCasedTitle = response.days[0].preciptype[0].toUpperCase();
                const capitalizedTitle =
                    upperCasedTitle[0] + response.days[0].preciptype[0].slice(1);

                chanceOfPrecipTitle.textContent += ` ${capitalizedTitle}`;
            })
            .catch((error) => console.log(error));
    });
}

function getUserCity() {
    const url = 'https://geolocation-db.com/json/';

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => response.city)
        .catch((error) => console.log(error));
}

function setInitialState() {
    const promise = new Promise((resolve) => {
        resolve(getUserCity());
    });

    promise.then((city) => {
        console.log(city);
        const weatherConditions = document.querySelector('.weather__conditions');
        const weatherCity = document.querySelector('.weather__city');
        const weatherDate = document.querySelector('.weather__date');
        const weatherTime = document.querySelector('.weather__time');
        const weatherTemperature = document.getElementById('temperature');

        const currentTime = new Date();
        const hour = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=VW8W64XT9LC76PU8YQRCKY85J&contentType=json`;

        fetch(url, { mode: 'cors' })
            .then((response) => response.json())
            .then((response) => {
                weatherConditions.textContent = response.days[0].conditions;
                weatherCity.textContent = response.resolvedAddress.split(',')[0];
                weatherDate.textContent = response.days[0].datetime;
                weatherTime.textContent = `${hour}:${minutes}`;
                weatherTemperature.textContent = response.days[0].temp + ' C';
            })
            .catch((error) => console.log(error));
    });

    generateWeatherInfoRight();
    generateNext7Days();
}

setInitialState();
