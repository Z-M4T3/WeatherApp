import { extendCard } from './uithings.js';
import { api_key } from '../setup/settings.js';

export async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data!");
    }

    return await response.json();
}

export function displayWeatherInfo(data) {
    let {
        name: city,
        main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
        weather: [{ description, id }],
        dt: currenttime,
        sys: { country, sunrise, sunset },
        wind: { speed }
    } = data;

    let icon = getWeatherIcon(id, currenttime, sunset, sunrise);
    feels_like = ((feels_like - 273.15).toFixed(1));
    temp = ((temp - 273.15).toFixed(1));
    temp_max = ((temp_max - 273.15).toFixed(1));
    temp_min = ((temp_min - 273.15).toFixed(1));
    description = description.toUpperCase();

    extendCard(city, country, icon, temp, humidity, description, feels_like, temp_min, temp_max, pressure, speed);
}

function getWeatherIcon(weatherId, time, sunset, sunrise) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return '<i class="fa-solid fa-cloud-bolt"></i>';
        case (weatherId >= 300 && weatherId < 400):
            return '<i class="fa-solid fa-cloud-rain"></i>';
        case (weatherId >= 500 && weatherId < 600):
            return '<i class="fa-solid fa-cloud-showers-heavy"></i>';
        case (weatherId >= 600 && weatherId < 700):
            return '<i class="fa-solid fa-snowflake"></i>';
        case (weatherId >= 700 && weatherId < 800):
            return '<i class="fa-solid fa-wind"></i>';
        case (weatherId === 800):
            if (time < sunset) {
                return '<i class="fa-solid fa-sun"></i>';
            }
            else if (time >= sunset) {
                return '<i class="fa-solid fa-moon"></i>';
            } else {
                return '<i class="fa-solid fa-moon"></i>';
            }
        case (weatherId > 800):
            if (time < sunset) {
                return '<i class="fa-solid fa-cloud-sun"></i>';
            }
            else if (time >= sunset) {
                return '<i class="fa-solid fa-cloud-moon"></i>';
            } else {
                return '<i class="fa-solid fa-cloud-moon"></i>';
            }
    }
}

export function displayError(message) {
    const errorDisplay = document.getElementsByClassName('errors');

    errorDisplay[0].classList.add('errorDisplay');
    errorDisplay[0].textContent = message;
}