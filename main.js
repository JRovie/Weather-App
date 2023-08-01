
// Gather weather data using API

function getWeatherData(location) {
    const apiKey = "0709aee2229c791acb493848f2dec998";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      };
      return weatherData;
    });
}

// Gather data of the location using the search bar

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
  const location = searchBar.value;
  getWeatherData(location)
    .then(weatherData => {
      updateUI(weatherData);
    })
    .catch(error => {
      console.log(error);
    });
});

// Update the UI of the weather box after searching the location
function updateUI(weatherData) {
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const location = document.querySelector("#location");
  
    temperature.textContent = `${weatherData.temperature}°C`;
    condition.textContent = weatherData.condition;
    location.textContent = weatherData.location;
    

    // Changing the weather icon depending on the condition

    if (weatherData.condition == "Rain" || weatherData.condition == "rain"){
        document.getElementById("icons").src = "rain.png";
    }
    else if (weatherData.condition == "Snow" || weatherData.condition == "snow"){
    document.getElementById("icons").src = "snow.png";
    }
    else if (weatherData.condition == "Clouds" || weatherData.condition == "clouds"){
    document.getElementById("icons").src = "fewclouds.png";
    }
    else if (weatherData.condition == "Drizzle" || weatherData.condition == "drizzle"){
    document.getElementById("icons").src = "shower.png";
    }
    else if (weatherData.condition == "Atmosphere" || weatherData.condition == "atmosphere"){
    document.getElementById("icons").src = "mist.png";
    }
    else if (weatherData.condition == "Thunderstorm" || weatherData.condition == "thunderstorm"){
    document.getElementById("icons").src = "ts.png";
    }
    else if (weatherData.condition == "Clear" || weatherData.condition == "clear"){
    document.getElementById("icons").src = "clearsky.png";
    }
    }

    // Real-time Day and Date
    
    function getCurrentDateAndTime() {
        const dateTime = new Date();
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return dateTime.toLocaleString("en-US", options);
      }

      const dateDisplay = document.getElementById("date");
      dateDisplay.innerHTML = getCurrentDateAndTime();
