// API key for OpenWeatherMap
const apiKey = '72f15d23e1c725ca50820eadca530348';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const loading = document.querySelector('.loading');
const errorMessage = document.getElementById('error-message');

// Weather elements
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feels-like');

// Set current date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Get weather data from API
async function getWeatherData(city) {
    try {
        // Show loading animation
        loading.style.display = 'block';
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // API call to OpenWeatherMap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Display weather data
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('City not found. Please try again.');
    }
}

// Display weather data
function displayWeatherData(data) {
    // Hide loading animation
    loading.style.display = 'none';
    
    // Update weather information
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    humidity.textContent = `${data.main.humidity}%`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    
    // Update weather icon based on condition
    updateWeatherIcon(data.weather[0].main);
    
    // Show weather info
    weatherInfo.style.display = 'block';
}

// Update weather icon based on condition
function updateWeatherIcon(condition) {
    const iconElement = weatherIcon.querySelector('i');
    
    switch(condition.toLowerCase()) {
        case 'clear':
            iconElement.className = 'fas fa-sun';
            break;
        case 'clouds':
            iconElement.className = 'fas fa-cloud';
            break;
        case 'rain':
            iconElement.className = 'fas fa-cloud-rain';
            break;
        case 'snow':
            iconElement.className = 'fas fa-snowflake';
            break;
        case 'thunderstorm':
            iconElement.className = 'fas fa-bolt';
            break;
        case 'drizzle':
            iconElement.className = 'fas fa-cloud-rain';
            break;
        case 'mist':
        case 'fog':
        case 'haze':
            iconElement.className = 'fas fa-smog';
            break;
        default:
            iconElement.className = 'fas fa-cloud';
    }
}

// Show error message
function showError(message) {
    loading.style.display = 'none';
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'block';
    document.getElementById('error-text').textContent = message;
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        showError('Please enter a city name.');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            showError('Please enter a city name.');
        }
    }
});

// Initialize app
function initApp() {
    setCurrentDate();
    // No default city loaded
}

// Start the app
initApp();