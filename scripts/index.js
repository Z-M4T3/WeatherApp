const weatherForm = document.getElementsByClassName('weatherForm');
const cityInput = document.getElementsByClassName('cityInput');

import { clockTime } from './uithings.js';
import { getWeatherData, displayWeatherInfo, displayError } from './weather.js';

weatherForm[0].addEventListener('submit', async event => {
    event.preventDefault();

    let city = cityInput[0].value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city!");
    }
});

clockTime()
setInterval(clockTime, 1000);