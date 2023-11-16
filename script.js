

const checkCity = () => {
  let identity = cityName.value
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${identity}&appid=f16d4a044174bf7cce0f638f850f5428`
  
  if (identity == ""){
    display.innerHTML = ""
    display2.innerHTML = ""
  }
    else{
    cityName.value = ""
    fetch(apiUrl)
    .then((response) => {
      return response.json()
    
  })
  .then((element)=>{
    console.log(element);
      let city = element.name;
      let temperature = Math.round(element.main.temp - 273.15);
      let weatherDescription = element.weather[0].description;
      let country = element.sys.country;
      let wind =  Math.round(element.wind.speed) ;
      let iconCode = element.weather[0].icon;



          const weatherData = {
            city,
            temperature,
            weatherDescription,
            iconCode,
            country,
            wind,
          };
          localStorage.setItem('weatherData', JSON.stringify(weatherData));

          display.innerHTML = ""
          display.innerHTML += `
          <h1 style="color:white;">${temperature}°C</h1>
          <h3 style="color:white;">${weatherDescription}</h3>
          <h3 style="color:white;">${city}</h3>
          <h3 style="color:white;">${country}</h3>
          
          `
          display2.innerHTML = ""
          display2.innerHTML += `
          <div style="color:white; display:flex; justify-content: space-between"><p>City</p>  <p>${city}</p></div>
          
          <div style="color:white; display:flex; justify-content: space-between"><p>Country</p>  <p>${country}</p></div>
          <hr style="margin-top:50px;">
          <div style="color:white; display:flex; justify-content: space-between"><p>Temperature</p>  <p>${temperature}°C</p></div>
          <div style="color:white; display:flex; justify-content: space-between"><p>Wind speed</p>  <p>${wind}m/s</p></div>
      <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherDescription}" />

          
        
          `
        
        
      })
      .catch((error) => {
        display.innerHTML = `<p style="">${error.message}</p>`
    });
  }
}

window.addEventListener('load', () => {
  const storedWeatherData = localStorage.getItem('weatherData');
  if (storedWeatherData) {
    const weatherData = JSON.parse(storedWeatherData);
    display.innerHTML = `
      <h1 style="color:white;">${weatherData.temperature}°C</h1>
      <h3 style="color:white;">${weatherData.weatherDescription}</h3>
      <h3 style="color:white;">${weatherData.city}</h3>
      <h3 style="color:white;">${weatherData.country}</h3>
      <img src="http://openweathermap.org/img/wn/${weatherData.iconCode}.png" alt="${weatherData.weatherDescription}" />
    `;
    display2.innerHTML += `
      <div style="color:white; display:flex; justify-content: space-between"><p>City</p>  <p>${weatherData.city}</p></div>
      <div style="color:white; display:flex; justify-content: space-between"><p>Country</p>  <p>${weatherData.country}</p></div>

      <hr style="margin-top:50px;">
      <div style="color:white; display:flex; justify-content: space-between"><p>Temperature</p>  <p>${weatherData.temperature}°C</p></div>
      <div style="color:white; display:flex; justify-content: space-between"><p>Wind speed</p>  <p>${weatherData.wind}m/s</p></div>
    `;
  }
});