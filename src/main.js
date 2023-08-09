const API_KEY = "9d33630a5cce4194a6b140510230808";

const getWeather = async (location) => {
  const response = await fetch(
    //API call
    `https://api.weatherapi.com/v1/current.json?q=${location}&key=${API_KEY}`
  );
    //catching error
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

  //Location
  const locationElement = document.createElement("div");
  locationElement.classList.add("location"); // Add the "location" class
  locationElement.textContent = `Location: ${weather.location.name}`;
  //Icon
  const apiIconURL = weather.current.condition.icon;
  const iconPath = apiIconURL.split('/').slice(-4).join('/');
  const iconElement = document.createElement("img");
  iconElement.classList.add("icon");// Add the "icon" class
  iconElement.src = iconPath;
  //Weather
  const weatherElement = document.createElement("div");
  weatherElement.classList.add("weather"); // Add the "weather" class
  weatherElement.textContent = `Weather: ${weather.current.condition.text}`;
  //Temp
  const temperatureElement = document.createElement("div");
  temperatureElement.classList.add("temperature"); // Add the "temperature" class
  const temperatureCelsius = weather.current.temp_c;
  temperatureElement.textContent = `Temperature: ${temperatureCelsius}°C`;
  //Temp changes colour depending on temp
    if (temperatureCelsius >= 30) {
      temperatureElement.style.color = "red"; // Hot temperature
  } else if (temperatureCelsius >= 20) {
      temperatureElement.style.color = "orange"; // Warm temperature
  } else if (temperatureCelsius >= 10) {
      temperatureElement.style.color = "green"; // Mild temperature
  } else {
      temperatureElement.style.color = "blue"; // Cold temperature
  }
  //Last Updated
  const lastUpdatedElement = document.createElement("div");
  lastUpdatedElement.classList.add("lastUpdated"); // Add the "lastUpdated" class
  lastUpdatedElement.textContent = `Last Updated: ${weather.current.last_updated}`;
  //Time of Day
  const timeOfDayElement = document.createElement("div");
  timeOfDayElement.classList.add("timeOfDay");
  const timeOfDay = weather.current.is_day === 1 ? "Day" : "Night";
  timeOfDayElement.textContent = `Time of Day: ${timeOfDay}`;

  //Displaying to HTML
  weatherContainer.appendChild(locationElement);
  weatherContainer.appendChild(iconElement);
  weatherContainer.appendChild(weatherElement);
  weatherContainer.appendChild(temperatureElement); 
  weatherContainer.appendChild(timeOfDayElement);
  weatherContainer.appendChild(lastUpdatedElement);
 
};

const updateWeather = (location) => {
  getWeather(location).then(renderWeather);
};

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const locationInput = document.getElementById("locationInput");
  //Taking search input and displaying weather in terms of that location
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
