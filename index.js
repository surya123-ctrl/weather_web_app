const API_KEY = 'd093edb85e5c8b9c4bdd6b494746893a';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const weatherContainer = document.getElementById('weather-container');
const locationSearch = document.getElementById('locationSearch');
const getWeatherButton = document.getElementById('getWeatherButton');
const error = document.getElementById('error');
const unitToggle = document.getElementById('unitToggle');
getWeatherButton.addEventListener('click', getWeather);
unitToggle.addEventListener('change', getWeather);
function getWeather() {
    const location = locationSearch.value;
    const xhr = new XMLHttpRequest();
    const unit = unitToggle.value;
    xhr.open('GET', `${API_URL}?q=${location}&units=${unit}&appid=${API_KEY}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayWeather(data);
            error.textContent = '';
        }
        else {
            const data = JSON.parse(xhr.responseText);
            displayError(data.message);
        }
    }
    xhr.send();
}
function displayWeather(data) {
    const temperature = data.main.temp;
    const city = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    weatherContainer.innerHTML = `
        <h1 class="temperature">${temperature}</h1>
        <h2 class="City">${city}</h2>
        <h2>${description.charAt(0).toUpperCase() + description.slice(1)}</h2>
        <div class="details">
        <div class="column">
            <div>
            <p class="humidity-para">${humidity}%</p>
            <b><p class="humidity"><i class="bi bi-moisture icon"></i>Humidity</p></b>
            </div>
        </div>
        <div class="column">
            <div>
            <p class="wind-speed-para">${windSpeed}km/h</p>
            <b><p class="wind-speed"><i class="bi bi-speedometer2 icon"></i>Wind Speed</p></b>
            </div>
        </div>
        </div>
    `;
}
locationSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (locationSearch) {
            getWeather();
        }
    }
})
function displayError(data) {
    weatherContainer.innerHTML = `
            <div class="toast-body">
                City not found.
            </div>
    `
}