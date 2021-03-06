
const apiKey = '3d555794e8bf23873faadec90a413459';  // Global variables
const button = document.querySelector("#submit-button");
const weatherContainer = document.querySelector('.weather-container')

function clearWeatherContainer() {         //This function clear existing data that is listed on the page if a user wants to submit multiple cities.
    while (weatherContainer.lastChild) {
        weatherContainer.removeChild(weatherContainer.lastChild)
    }
}
button.addEventListener('click', async (e) => {   //Button Event Listener
    e.preventDefault();
    if (weatherContainer.lastChild) {
        clearWeatherContainer();
    }
    await getWeather();
});
let place = document.querySelector("#place"); //grabs the place(city)
async function getWeather() {   // async function that grabs the weather data based on user input.
    let city = place.value;
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        const response = await axios.get(url)
        console.log(response.data)
        buildWeatherContent(response.data);
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

function buildWeatherContent(weather) {   // this function builds the div where weather data will be presented.


    const icon = document.createElement('img');     
    let pic = weather.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${pic}@2x.png`
    const iconEl = document.createElement('div');
    iconEl.append(icon);
    weatherContainer.append(iconEl);

    const temperature = document.createElement('p');
    temperature.innerHTML = `Temperature: ${weather.main.temp} - °F`;
    const tempValueEl = document.createElement('div');
    tempValueEl.append(temperature);
    weatherContainer.append(tempValueEl);  

    const location = document.createElement('p');
    location.innerHTML = `Location: ${weather.name}`;
    const locationEl = document.createElement('p');
    locationEl.append(location);
    weatherContainer.append(locationEl);

    const description = document.createElement('p');
    description.innerHTML = `Description: ${weather.weather[0].description}`;
    const descriptionEl = document.createElement('p');
    descriptionEl.append(description);
    weatherContainer.append(descriptionEl);

    const maxTemp = document.createElement('p');
    maxTemp.innerHTML = `Max Temp: ${weather.main.temp_max} - °F`;
    const maxTempEl = document.createElement('p');
    maxTempEl.append(maxTemp);
    weatherContainer.append(maxTempEl);

    const minTemp = document.createElement('p');
    minTemp.innerHTML = `Min Temp: ${weather.main.temp_min} - °F`;
    const minTempEl = document.createElement('p');
    minTempEl.append(minTemp);
    weatherContainer.append(minTempEl);
}