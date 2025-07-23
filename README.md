# The Odin Project - JavaScript
## Project: 🌦️ Weather App

This is a simple weather app built as part of my practice with asynchronous JavaScript, fetching APIs, and DOM manipulation. The app allows users to input a location and retrieves real-time weather data using the OpenWeather API.

<img width="2556" height="1282" alt="weatherApp" src="https://github.com/user-attachments/assets/5cdf2145-7127-4be4-847d-1c76a07f487c" />

**🧠 APIs Used**
* [Geolocation API](https://geolocation-db.com/) to gather the user's approximate location 
* [Visual Crossing API](https://www.visualcrossing.com/weather-api/) to fetch the weather data

      
**🛠️ Features** 
* Fetching user approximate city and displays weather forecast for that city
* Input field to search weather by city name
* Fetches live weather data using fetch with async/await
* Processes and displays relevant weather info like:
  - Temperature
  - Weather description
  - Location name
  - Chance of Rain
* Error handling for invalid city names
* Responsive layout
* Loading spinner while fetching data (on page load/reload 2-second delay was intentionally added to showcase the loader.)
* Dynamic import of Weather icons

**📦 What I Practiced**
* Working with Promises, async/await, and the Fetch API
* Parsing and restructuring JSON data
* Handling various network and request errors with try/catch + Response object
* Dynamically updating the DOM
* Adding loading indicators to improve UX experience

**🚀 How to Run**
1. Clone this repo
2. ```npm install``` to install the dependencies
3. ```npm run start``` to start the dev server
4. Enter the city in the field and press enter or click the button to fetch the data!
