// Logic for populating images
export function findWeatherImage(icon) {
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
