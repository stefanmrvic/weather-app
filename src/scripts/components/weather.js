const form = document.querySelector('.form');
const switchBtn = document.getElementById('switch');
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');

let searchValue;

form.addEventListener('submit', fetchWeather);
search.addEventListener('input', () => (searchValue = search.value.trim()));
searchBtn.addEventListener('click', fetchWeather);
switchBtn.addEventListener('change', switchUnits);

// Stores from which city is user so it can convert celsius to fahrenheit and vice-verca when search bar is empty
let lastCitySearched;

// Storing successful response from the server to prevent reduntant/multiple fetch requests in order to populate different sections of app
let cachedFetchResult;

// Creating fetchResults function in order to store promise results into variable so I can reuse it in multiple components across the app
async function fetchResults(url) {
    const fetchResult = await fetch(url, { mode: 'cors' });
    const fetchedJSON = await fetchResult.json();

    if (!fetchedJSON) throw new Error('THERE WAS AN ERROR FETCHING THE REQUESTED URL!');

    cachedFetchResult = fetchedJSON;
}

async function switchUnits() {
    // Exits early if search bar is empty and it doesn't have the record of the user's city
    if (!searchValue && !lastCitySearched) return;

    const searchParam = searchValue ? searchValue : lastCitySearched;

    let url;

    if (switchBtn.checked) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchParam}/next7days?unitGroup=us&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    } else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchParam}/next7days?unitGroup=metric&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    }

    await fetchResults(url);

    generateWeatherInfoLeft();
    generateWeatherInfoRight();
    generateNext7Days();
}

async function fetchWeather(e) {
    e.preventDefault();

    // Exits early if search bar is empty
    if (!searchValue) return;

    let url;

    if (switchBtn.checked) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}/next7days?unitGroup=us&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    } else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}/next7days?unitGroup=metric&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    }

    await fetchResults(url);

    generateWeatherInfoLeft();
    generateWeatherInfoRight();
    generateNext7Days();
}

// Logic for populating images
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

async function generateNext7Days() {
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

    const mondayIcon = findWeatherImage(cachedFetchResult.days[0].icon);
    const mondayImgSrc = await import(`/src/assets/SVG/${mondayIcon}.svg`);
    mondayImg.src = mondayImgSrc.default;
    mondayTemperature.textContent = cachedFetchResult.days[0].temp + metricUnit;

    const tuesdayIcon = findWeatherImage(cachedFetchResult.days[1].icon);
    const tuesdayImgSrc = await import(`/src/assets/SVG/${tuesdayIcon}.svg`);
    tuesdayImg.src = tuesdayImgSrc.default;
    tuesdayTemperature.textContent = cachedFetchResult.days[1].temp + metricUnit;

    const wednesdayIcon = findWeatherImage(cachedFetchResult.days[2].icon);
    const wednesdayImgSrc = await import(`/src/assets/SVG/${wednesdayIcon}.svg`);
    wednesdayImg.src = wednesdayImgSrc.default;
    wednesdayTemperature.textContent = cachedFetchResult.days[2].temp + metricUnit;

    const thursdayIcon = findWeatherImage(cachedFetchResult.days[3].icon);
    const thursdayImgSrc = await import(`/src/assets/SVG/${thursdayIcon}.svg`);
    thursdayImg.src = thursdayImgSrc.default;
    thursdayTemperature.textContent = cachedFetchResult.days[3].temp + metricUnit;

    const fridayIcon = findWeatherImage(cachedFetchResult.days[4].icon);
    const fridayImgSrc = await import(`/src/assets/SVG/${fridayIcon}.svg`);
    fridayImg.src = fridayImgSrc.default;
    fridayTemperature.textContent = cachedFetchResult.days[4].temp + metricUnit;

    const saturdayIcon = findWeatherImage(cachedFetchResult.days[5].icon);
    const saturdayImgSrc = await import(`/src/assets/SVG/${saturdayIcon}.svg`);
    saturdayImg.src = saturdayImgSrc.default;
    saturdayTemperature.textContent = cachedFetchResult.days[5].temp + metricUnit;

    const sundayIcon = findWeatherImage(cachedFetchResult.days[6].icon);
    const sundayImgSrc = await import(`/src/assets/SVG/${sundayIcon}.svg`);
    sundayImg.src = sundayImgSrc.default;
    sundayTemperature.textContent = cachedFetchResult.days[6].temp + metricUnit;

    console.log('generateNext7Days - done!');
}

async function generateWeatherInfoLeft() {
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

    weatherConditions.textContent = cachedFetchResult.days[0].conditions;
    weatherCity.textContent = cachedFetchResult.resolvedAddress.split(',')[0];
    weatherDate.textContent = cachedFetchResult.days[0].datetime;
    weatherTime.textContent = `${hour}:${minutes}`;
    weatherTemperature.textContent = cachedFetchResult.days[0].temp + metricUnitTemperature;

    // Stores from which city is user so it can convert celsius to fahrenheit and vice-verca when search bar is empty
    lastCitySearched = weatherCity.textContent;

    const weatherIcon = findWeatherImage(cachedFetchResult.days[0].icon);
    const weatherIconSrc = await import(`/src/assets/SVG/${weatherIcon}.svg`);
    weatherImg.src = weatherIconSrc.default;

    //console.log('generateWeatherInfoLeft - done!');

    await new Promise((resolve) => {
        setTimeout(() => resolve(console.log('done after 3 seconds... ehaa!')), 3000);
    });
}

async function generateWeatherInfoRight() {
    const feelsLikeTemperature = document.querySelector('.feels-like__temperature');
    const humidityPercentage = document.querySelector('.humidity__percentage');
    const windSpeed = document.querySelector('.wind-speed__speed');

    const metricUnitTemperature = switchBtn.checked ? ' °F' : ' °C';
    const metricUnitSpeed = switchBtn.checked ? ' mi/h' : ' km/h';

    feelsLikeTemperature.textContent = cachedFetchResult.days[0].feelslike + metricUnitTemperature;
    humidityPercentage.textContent = cachedFetchResult.days[0].humidity + ' %';
    windSpeed.textContent = cachedFetchResult.days[0].windspeed + metricUnitSpeed;

    if (cachedFetchResult.days[0].preciptype === null) return;

    const chanceOfPrecipTitle = document.querySelector('.chance-of-precip__title');
    const chanceOfPrecipPercentage = document.querySelector('.chance-of-precip__percentage');
    const upperCasedTitle = cachedFetchResult.days[0].preciptype[0].toUpperCase();
    const capitalizedTitle = upperCasedTitle[0] + cachedFetchResult.days[0].preciptype[0].slice(1);

    chanceOfPrecipTitle.textContent = `Chance of ${capitalizedTitle}`;
    chanceOfPrecipPercentage.textContent = cachedFetchResult.days[0].precipprob + ' %';

    console.log('generateWeatherInfoRight - done!');
}

async function getUserCity() {
    const url = 'https://geolocation-db.com/json/';

    const fetchResult = await fetch(url, { mode: 'cors' });
    const fetchedJSON = await fetchResult.json();

    // Stores from which city is user so it can convert celsius to fahrenheit and vice-verca when search bar is empty
    lastCitySearched = fetchedJSON.city;

    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetchedJSON.city}/next7days?unitGroup=metric&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
}

async function setInitialState() {
    const url = await getUserCity();
    await fetchResults(url);

    // const promise1 = generateWeatherInfoLeft();
    // const promise2 = generateWeatherInfoRight();
    // const promise3 = generateNext7Days();

    await Promise.all([generateWeatherInfoLeft(), generateWeatherInfoRight(), generateNext7Days()]);

    revealContent();
}

async function revealContent() {
    const main = document.querySelector('main');
    const containerBottom = document.querySelector('.container--bottom');
    const loader = document.querySelector('.loader__wrapper');

    main.classList.add('reveal');
    containerBottom.classList.add('reveal');
    loader.style.display = 'none';
}

setInitialState();
