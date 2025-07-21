const form = document.querySelector('.form');
const switchBtn = document.getElementById('switch');
const search = document.getElementById('search');

form.addEventListener('submit', fetchWeather);
switchBtn.addEventListener('change', switchUnits);

function switchUnits() {
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

// Logic for populating images (if/else ifs)
function findWeatherImage(icon) {
    const icons = {
        snow: './assets/SVG/snow.svg',
        'snow-showers-day': 'snow',
        'snow-showers-night': 'snow',
        'thunder-rain': 'lightning',
        'thunder-showers-day': 'lightning',
        'thunder-showers-night': 'lightning',
        rain: 'rainy',
        'showers-day': 'rainy',
        'showers-night': 'rainy',
        fog: 'mist',
        wind: 'wind',
        cloudy: 'cloudy',
        'partly-cloudy-day': 'cloudy-day',
        'partly-cloudy-night': 'cloudy-night',
        'clear-day': 'sun',
        'clear-night': 'moon',
    };

    return icons[icon];
}

function generateNext7Days(url) {
    const mondayTemperature = document.querySelector('.monday__temperature');
    const mondayImg = document.querySelector('.monday__img');
    const tuesdayTemperature = document.querySelector('.tuesday__temperature');
    const tuesdayImg = document.querySelector('.tuesday__img');
    const wednesdayTemperature = document.querySelector('.wednesday__temperature');
    const wednesdayImg = document.querySelector('.wednesday__img');
    const thursdayTemperature = document.querySelector('.thursday__temperature');
    const thursdayImg = document.querySelector('.thursday__img');
    const fridayTemperature = document.querySelector('.friday__temperature');
    const fridayImg = document.querySelector('.friday__img');
    const saturdayTemperature = document.querySelector('.saturday__temperature');
    const saturdayImg = document.querySelector('.saturday__img');
    const sundayTemperature = document.querySelector('.sunday__temperature');
    const sundayImg = document.querySelector('.sunday__img');

    const metricUnit = switchBtn.checked ? ' °F' : ' °C';

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => {
            const mondayIcon = findWeatherImage(response.days[0].icon);
            import(`/src/assets/SVG/${mondayIcon}.svg`).then(
                (src) => (mondayImg.src = src.default)
            );
            mondayTemperature.textContent = response.days[0].temp + metricUnit;

            const tuesdayIcon = findWeatherImage(response.days[1].icon);
            import(`/src/assets/SVG/${tuesdayIcon}.svg`).then(
                (src) => (tuesdayImg.src = src.default)
            );
            tuesdayTemperature.textContent = response.days[1].temp + metricUnit;

            const wednesdayIcon = findWeatherImage(response.days[2].icon);
            import(`/src/assets/SVG/${wednesdayIcon}.svg`).then(
                (src) => (wednesdayImg.src = src.default)
            );
            wednesdayTemperature.textContent = response.days[2].temp + metricUnit;

            const thursdayIcon = findWeatherImage(response.days[3].icon);
            import(`/src/assets/SVG/${thursdayIcon}.svg`).then(
                (src) => (thursdayImg.src = src.default)
            );
            thursdayTemperature.textContent = response.days[3].temp + metricUnit;

            const fridayIcon = findWeatherImage(response.days[4].icon);
            import(`/src/assets/SVG/${fridayIcon}.svg`).then(
                (src) => (fridayImg.src = src.default)
            );
            fridayTemperature.textContent = response.days[4].temp + metricUnit;

            const saturdayIcon = findWeatherImage(response.days[5].icon);
            import(`/src/assets/SVG/${saturdayIcon}.svg`).then(
                (src) => (saturdayImg.src = src.default)
            );
            saturdayTemperature.textContent = response.days[5].temp + metricUnit;

            const sundayIcon = findWeatherImage(response.days[6].icon);
            import(`/src/assets/SVG/${sundayIcon}.svg`).then((src) => {
                sundayImg.src = src.default;
            });
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
    const weatherImg = document.getElementById('icon');

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

            const weatherIcon = findWeatherImage(response.days[0].icon);
            import(`/src/assets/SVG/${weatherIcon}.svg`).then((src) => {
                weatherImg.src = src.default;
            });
        })
        .catch((error) => console.log(error));
}

function generateWeatherInfoRight(url) {
    const feelsLikeTemperature = document.querySelector('.feels-like__temperature');
    const humidityPercentage = document.querySelector('.humidity__percentage');
    const windSpeed = document.querySelector('.wind-speed__speed');

    const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';
    const metricUnitSpeed = switchBtn.checked ? ' mi/h' : ' km/h';

    return fetch(url, { mode: 'cors' })
        .then((response) => response.json())
        .then((response) => {
            feelsLikeTemperature.textContent = response.days[0].feelslike + metricUnitTemperature;
            humidityPercentage.textContent = response.days[0].humidity + ' %';
            windSpeed.textContent = response.days[0].windspeed + metricUnitSpeed;

            if (response.days[1].preciptype === null) return;

            const chanceOfPrecipTitle = document.querySelector('.chance-of-precip__title');
            const chanceOfPrecipPercentage = document.querySelector(
                '.chance-of-precip__percentage'
            );
            const upperCasedTitle = response.days[0].preciptype[0].toUpperCase();
            const capitalizedTitle = upperCasedTitle[0] + response.days[0].preciptype[0].slice(1);

            chanceOfPrecipTitle.textContent = `Chance of ${capitalizedTitle}`;
            chanceOfPrecipPercentage.textContent = response.days[0].precipprob + ' %';
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
