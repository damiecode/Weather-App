const form = document.querySelector('#search-form');
const input = document.querySelector('#search-form input');
const msg = document.getElementById('msg');
const city = document.querySelector('#city');
const h2 = document.querySelector('.city-name');
const name = document.querySelector('.data-name');
const country = document.querySelector('#data-country');
const changeTemp = document.querySelector('#change-temp');
const temp = document.getElementById('city-temp');
const img = document.querySelector('.city-icon');
const unit = document.getElementById('unit');
const caption = document.getElementById('caption');
let tempHolder = 0;

const displayWeather = (data) => {
  if (data.cod === '200') {
    msg.style.display = 'none';
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      data.list[0].weather[0].icon
    }.svg`;
    city.classList.add('city');
    h2.setAttribute('data-name', data.city.name, data.city.country);
    name.innerHTML = data.city.name;
    country.innerHTML = data.city.country;
    country.classList.add('data-country');
    changeTemp.innerHTML = 'Change temperature to °F';
    changeTemp.classList.add('temp-btn');
    unit.classList.add('unit');
    unit.innerText = '°C';
    tempHolder = data.list[0].main.temp.toFixed(2);
    temp.innerHTML = `${data.list[0].main.temp} °C`;
    img.src = icon;
    img.alt = data.list[0].weather[0].description;
    caption.innerHTML = data.list[0].weather[0].description;
  } else {
    msg.style.display = 'block';
  }
  form.reset();
  input.focus();
  input.value = '';
};

const getWeather = async (searchValue) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=7cf4ed0e4a1eb8c3cb4dfe318b6205c9&units=metric&q=${searchValue}`);
  const weatherJSON = await response.json();
  await displayWeather(weatherJSON);
};

const convertTemperature = () => {
  if (temp.innerHTML.includes('°F')) {
    tempHolder = (tempHolder - 32) * (5 / 9);
    temp.innerHTML = `${tempHolder.toFixed(2)}<sup>°C</sup>`;
    changeTemp.innerHTML = 'Change temperature to °F';
  } else if (temp.innerHTML.includes('°C')) {
    tempHolder = (tempHolder * (9 / 5)) + 32;
    temp.innerHTML = `${tempHolder.toFixed(2)}<sup>°F</sup>`;
    changeTemp.innerHTML = 'Change temperature to °C';
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
