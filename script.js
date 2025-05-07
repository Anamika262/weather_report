const apiKey = "062dfe79954358b9b587acdb064c38ea";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name.");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    alert(error.message);
  }
});

function updateWeather(data) {
    if (!data || !data.main || !data.weather || !data.weather.length) {
      alert("Invalid weather data received.");
      return;
    }
  
    const temp = Math.round(data.main.temp);
    const windSpeed = Math.round(data.wind.speed);
    const condition = data.weather[0].main.toLowerCase();
    const weatherEffects = document.getElementById("weather-effects");
  
    // Update UI
    document.getElementById("temperature").textContent = `${temp}°C`;
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("feels-like").textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${windSpeed} km/h`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("time").textContent = `Updated: ${new Date().toLocaleTimeString()}`;
  
    // Reset classes & effects
    document.body.className = '';
    weatherEffects.innerHTML = '';
  
    // Weather-based effects
    if (condition.includes("rain")) {
      document.body.classList.add("rainy");
      createRainDrops();
    } else if (condition.includes("snow") || temp <= 0) {
      document.body.classList.add("snowy");
      createSnowflakes();
    } else if (condition.includes("cloud")) {
      document.body.classList.add("cloudy");
      createClouds();
    } else if (condition.includes("clear") && temp > 25) {
      document.body.classList.add("sunny");
    }
  
    // Optional wind effect
    if (windSpeed > 25) {
      document.body.classList.add("windy");
      createWind();
    }
  }
  function createSnowflakes() {
    const container = document.getElementById("weather-effects");
    for (let i = 0; i < 50; i++) {
      const snow = document.createElement("div");
      snow.classList.add("snowflake");
      snow.style.left = Math.random() * 100 + "vw";
      snow.style.animationDelay = Math.random() * 3 + "s";
      container.appendChild(snow);
    }
  }
  
  function createWind() {
    const container = document.getElementById("weather-effects");
    for (let i = 0; i < 15; i++) {
      const gust = document.createElement("div");
      gust.classList.add("wind-gust");
      gust.style.top = Math.random() * 100 + "vh";
      container.appendChild(gust);
    }
  }
  function createClouds() {
    const container = document.getElementById("weather-effects");
  
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud");
      cloud.style.left = Math.random() * 100 + "vw";
      cloud.style.top = Math.random() * 40 + "vh";
      cloud.style.animationDuration = 30 + Math.random() * 20 + "s";
      container.appendChild(cloud);
    }
  }
      