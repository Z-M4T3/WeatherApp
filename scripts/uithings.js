function revealItems(displayItems) {
    while (displayItems.length) {
        displayItems[0].classList.replace('nodisplay', 'ondisplay');
    }
}

export function clockTime() {
    const now = new Date();

    const hour = now.getHours().toString().padStart(2, 0);
    const minute = now.getMinutes().toString().padStart(2, 0);

    const timeString = `${hour}:${minute}`;

    const clock = document.getElementsByClassName('timeDisplay');

    clock[0].textContent = timeString;
}

export function extendCard(city, country, icon, temp, humidity, description, feels_like, temp_min, temp_max, pressure, speed) {
    const weatherBlock = document.getElementsByClassName('weatherBlock');
    const weatherCard = document.getElementsByClassName('weatherCard');
    const displayItems = document.getElementsByClassName('nodisplay');

    const errorDisplay = document.getElementsByClassName('errors');

    const cityName = document.getElementsByClassName('cityName');
    const cityIcon = document.getElementsByClassName('weatherIcon')
    const cityTemp = document.getElementsByClassName('temperature');
    const cityHumidity = document.getElementsByClassName('humidity');
    const cityDesc = document.getElementsByClassName('type');
    const cityAlldayTemp = document.getElementsByClassName('tempHighLow');
    const cityFeellikeTemp = document.getElementsByClassName('tempFeelLike');
    const cityPressure = document.getElementsByClassName('pressure');
    const cityWind = document.getElementsByClassName('wind');

    cityName[0].textContent = `${city} - (${country})`;
    cityIcon[0].innerHTML = icon;
    cityTemp[0].textContent = `Temp: ${temp}°C`;
    cityHumidity[0].textContent = `Humidity: ${humidity}%`;
    cityDesc[0].textContent = description;
    cityAlldayTemp[0].innerHTML = `Today's temp: <i class="fa-solid fa-arrow-up-long"></i>${temp_max}°C  <i class="fa-solid fa-arrow-down-long"></i>${temp_min}°C`;
    cityFeellikeTemp[0].textContent = `Feels like: ${feels_like}°C`;
    cityPressure[0].textContent = `Pressure: ${pressure} mB`;
    cityWind[0].textContent = `Wind: ${speed} km/h`;

    if (weatherCard[0].hasAttribute('hidden')) {
        weatherBlock[0].classList.replace('weatherBlock', 'weatherBlockExt');
        weatherCard[0].removeAttribute('hidden');
    }

    if (errorDisplay[0].classList.contains('errorDisplay')) {
        errorDisplay[0].classList.remove('errorDisplay');
        errorDisplay[0].textContent = "";
    }

    setTimeout(1500, revealItems(displayItems));
}

export function pageLeave() {
   switch (document.title) {
    case "WeatherApp":
        document.title = "For the current weather!";
        break;
    case "For the current weather!":
        document.title ="WeatherApp";
        break;
   }
}