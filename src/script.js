import css from './style.css';
import 'regenerator-runtime/runtime.js';
/* get data from json and usiing that data  fetch icon */
(function () {
  let city;
  let button = document.querySelector('button');
  let field = document.querySelector('#query>div>input');
  let p = document.querySelector('p');
  button.addEventListener('click', (e) => {
    setInput();
  });
  async function setInput() {
    getWeather(field.value)
      .then((data) => {
        p.textContent = '';

        removeChildNodes(document.getElementById('content'));
        function removeChildNodes(parent) {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
        }
        field.value = '';
        let i;
        for (const forecast of data.forecast.forecastday) {
          day(forecast, i, data);
          i++;
        }
      })
      .catch((err) => {
        console.log(err);
        p.textContent = 'Enter valid input';
      });
  }

  async function getWeather(place) {
    try {
      let weather = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=ba509b2af2434abb8c982902210807&q=${place}&days=3&aqi=no&alerts=no`
      );

      let weatherJson = await weather.json();
      return weatherJson;
    } catch (err) {}
  }
  async function day(forecastInput, i, data) {
    let div = document.createElement('div');
    div.id = `div${i}`;
    div.classList.add('climate');
    let forecastIcon = document.createElement('img');
    forecastIcon.src = `${forecastInput.day.condition.icon}`;
    let locationName = document.createElement('p');
    locationName.textContent = `Place: ${data.location.name}`;
    let regionName = document.createElement('p');
    regionName.textContent = `Location: ${data.location.region}`;
    let forecastDate = document.createElement('p');
    forecastDate.textContent = `Date: ${forecastInput.date}`;
    let forecastTemp = document.createElement('p');
    forecastTemp.innerHTML = `Average temperature: ${forecastInput.day.avgtemp_c} &#8451;`;
    let forecasthumidity = document.createElement('p');
    forecasthumidity.textContent = `Average Humidity: ${forecastInput.day.avghumidity}`;
    let predictedForecast = document.createElement('p');
    predictedForecast.textContent = `Predicted forecast: ${forecastInput.day.condition.text}`;
    [
      forecastIcon,
      locationName,
      regionName,
      forecastDate,
      forecastTemp,
      forecasthumidity,
    ].forEach((item) => {
      div.appendChild(item);
    });
    document.getElementById('content').appendChild(div);
  }
})();
// `https://www.weatherapi.com/v1/forecast.json?key=ba509b2af2434abb8c982902210807&q=Avanigadda&days=7`
//`https://api.openweathermap.org/data/2.5/forecast/daily?q=Avanigadda&units=metric&cnt=5&appid=e6ef5e604c6dc2d6a9c2554912489422`
//`https://api.openweathermap.org/data/2.5/forecast?q=Avanigadda&appid=e6ef5e604c6dc2d6a9c2554912489422`
//`https://api.openweathermap.org/data/2.5/find?q=Avanigadda&appid=e6ef5e604c6dc2d6a9c2554912489422`
