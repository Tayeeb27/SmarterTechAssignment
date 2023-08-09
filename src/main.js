const API_KEY = "d0ad453f77b54acda74170922230808";

const getWeather = async (location) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?q=${location}&key=${API_KEY}`
  );

  if (response.status === 200) {
    const data = await response.json();

    return data;
  } else {
    throw new Error("Something went wrong!");
  }
};

const renderWeather = (weather) => {
    const weatherContainer = document.querySelector(".weather-container");
    weatherContainer.innerHTML = ""; // Clear previous content
  
    const locationElement = document.createElement("div");
    locationElement.classList.add("location"); // Add the "location" class
    locationElement.textContent = `Location: ${weather.location.name}`;
  
    const weatherElement = document.createElement("div");
    weatherElement.classList.add("weather"); // Add the "weather" class
    weatherElement.textContent = `Weather: ${weather.current.condition.text}`;
  
    const temperatureElement = document.createElement("div");
    temperatureElement.classList.add("temperature"); // Add the "temperature" class
    const temperatureCelsius = weather.current.temp_c;
    temperatureElement.textContent = `Temperature: ${temperatureCelsius}°C`;

    // Set temperature color based on the value
    if (temperatureCelsius >= 30) {
        temperatureElement.style.color = "red"; // Hot temperature
    } else if (temperatureCelsius >= 20) {
        temperatureElement.style.color = "orange"; // Warm temperature
    } else if (temperatureCelsius >= 10) {
        temperatureElement.style.color = "green"; // Mild temperature
    } else {
        temperatureElement.style.color = "blue"; // Cold temperature
    }
  
    const lastUpdatedElement = document.createElement("div");
    lastUpdatedElement.classList.add("lastUpdated"); // Add the "weather" class
    lastUpdatedElement.textContent = `Last Updated: ${weather.current.last_updated}`;

    weatherContainer.appendChild(locationElement);
    weatherContainer.appendChild(weatherElement);
    weatherContainer.appendChild(temperatureElement);
    weatherContainer.appendChild(lastUpdatedElement);
  };

const updateWeather = (location) => {
  getWeather(location).then(renderWeather);
};

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const locationInput = document.getElementById("locationInput");
  
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const location = locationInput.value.trim();
      if (location !== "") {
        updateWeather(location);
      }
    });
  
    // Load weather for the default location (Newport)
    updateWeather("Newport");
  });
