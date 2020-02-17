const form = document.querySelector("#search-form");
const input = document.querySelector("#search-form input");
const msg = document.querySelector("#search-form .msg");
const list = document.querySelector(".second-section .cities");

const avoidDuplicates = () => {
  const listItems = list.querySelectorAll(".second-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      let searchValue = input.value;
      if (searchValue.includes(",")) {
        if (searchValue.split(",")[1].length > 2) {
          searchValue = searchValue.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == searchValue.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.innerHTML = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
        } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }
};

const displayWeather = (data) => {
  if (data.cod === '200') {
    const li = document.createElement("li");
    li.classList.add("city");
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      data.list[0].weather[0]["icon"]
      }.svg`;
    const display = `
        <h2 class="city-name" data-name="${data.city.name},${data.city.country}">
          <span>${data.city.name}</span>
          <sup>${data.city.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(data.list[0].main.temp)}<sup>°C</sup></div>
        <button type="submit" class="temp-btn">Change to °F</button>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
      data.list[0].weather[0]["description"]
      }">
          <figcaption>${data.list[0].weather[0]["description"]}</figcaption>
        </figure>
      `;
    li.innerHTML = display;
    list.appendChild(li);
  } else {
    msg.textContent = 'Please insert a valid city';
  }
  msg.textContent = "";
  form.reset();
  input.focus();
};

const getWeather = async (searchValue) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=7cf4ed0e4a1eb8c3cb4dfe318b6205c9&units=metric&q=${searchValue}`);
  const weatherJSON = await response.json();
  await displayWeather(weatherJSON);
};

const convertTemperature = () => {
  if (changeTempBtn.innerHTML.includes('Fahrenheit')) {
    tempHolder = (tempHolder * (9 / 5)) + 32;
    temp.innerHTML = `Temperature: ${tempHolder.toFixed(2)} Fahrenheit`;
    changeTempBtn.innerHTML = 'Change temperature to Celsius';
  } else {
    tempHolder = (tempHolder - 32) * (5 / 9);
    temp.innerHTML = `Temperature: ${tempHolder.toFixed(2)} Celsius`;
    changeTempBtn.innerHTML = 'Change temperature to Fahrenheit';
  }
};


form.addEventListener("submit", e => {
  e.preventDefault();
  getWeather(input.value);
});