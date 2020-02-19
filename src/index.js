/* eslint disble arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */

const section = document.getElementById('second-section');
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-form input');
const msg = document.getElementById('msg');
const city = document.querySelector('#city');
const h2 = document.querySelector('.city-name');
const cityName = document.querySelector('.data-name');
const country = document.querySelector('#data-country');
const changeTemp = document.getElementById('change-temp');
const temp = document.getElementById('city-temp');
const img = document.querySelector('.city-icon');
const unit = document.getElementById('unit');
const caption = document.getElementById('caption');
let tempHolder = 0;
let deg = '°F';

const displayWeather = (data) => {
  const {
    cod,
    main,
    name,
    sys,
    weather,
  } = data;
  if (cod === 200) {
    msg.style.display = 'none';
    section.style.display = 'block';
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      weather[0].icon
    }.svg`;
    city.classList.add('city');
    h2.setAttribute('data-name', `${name} ${sys.country}`);
    cityName.innerHTML = `${name}`;
    country.innerHTML = `${sys.country}`;
    country.classList.add('data-country');
    changeTemp.classList.add('temp-btn');
    unit.classList.add('unit');
    unit.innerText = `${deg}`;
    tempHolder = main.temp.toFixed(2);
    temp.innerHTML = `${tempHolder}${deg}`;
    img.src = icon;
    img.alt = `${weather[0].description}`;
    caption.innerHTML = `${weather[0].description}`;
    const div = document.getElementById('background');
    div.classList = '';
    if (caption.innerHTML.includes('rain')) {
      div.classList.add('rainyday');
    } else if (caption.innerHTML.includes('haze') || caption.innerHTML.includes('cloud')) {
      div.classList.add('cloudyday');
    } else {
      div.classList.add('clearday');
    }
  } else {
    msg.style.display = 'block';
    section.style.display = 'none';
  }
  form.reset();
  input.focus();
  input.value = '';
  deg = '°F';
};

const handle = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
};

const getWeather = async (searchValue, units) => {
  if (units === 1) {
    const [response, responseErr] = await handle(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=7cf4ed0e4a1eb8c3cb4dfe318b6205c9&units=metric`));
    if (responseErr) throw new Error('could not fetch API');
    const [weatherJSON, weatherErr] = await handle(response.json());
    if (weatherErr) throw new Error('could not fetch weather');
    displayWeather(weatherJSON);
    changeTemp.innerText = 'Change temperature to °F';
  } else {
    const [response, responseErr] = await handle(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=7cf4ed0e4a1eb8c3cb4dfe318b6205c9&units=imperial`));
    if (responseErr) throw new Error('could not fetch API');
    const [weatherJSON, weatherErr] = await handle(response.json());
    if (weatherErr) throw new Error('could not fetch weather');
    displayWeather(weatherJSON);
    changeTemp.innerText = 'Change temperature to °C';
  }
};

const convertTemperature = () => {
  const searchValue = cityName.innerText;
  let units = 0;
  if (temp.innerHTML.includes('°F')) {
    units = 1;
    getWeather(searchValue, units);
    deg = '°C';
    changeTemp.innerText = 'Change temperature to °F';
  } else if (temp.innerHTML.includes('°C')) {
    getWeather(searchValue, units);
    deg = '°F';
    changeTemp.innerText = 'Change temperature to °C';
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather(input.value);
});

changeTemp.addEventListener('click', (e) => {
  e.preventDefault();
  convertTemperature();
});
