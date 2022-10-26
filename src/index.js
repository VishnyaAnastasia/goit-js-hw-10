import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;

Notify.init({
  useIcon: false,
  fontSize: '20px',
  position: 'right-top',
  width: '350px',
  height: '35px',
  clickToClose: true,
  success: {
    background: '#cbe6ff',
    textColor: '#ffffff',
  },
  failure: {
    background: '#cccccc',
    textColor: '#ffffff',
  },
  warning: {
    background: '#deea7f',
    textColor: '#ffffff',
  },
  info: {
    background: '#80f6a0',
    textColor: '#ffffff',
  },
});

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(inputEvent, DEBOUNCE_DELAY));

function inputEvent() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (searchBox.value.trim() === '') {
    return;
  }

  fetchCountries(searchBox.value)
    .then(data => {
      if (data.length === 1) {
        countryInfoMaker(data);
        return;
      }
      countryListMaker(data);
    })
    .catch(error => {});
}

function countryListMaker(data) {
  data.forEach(country => {
    countryList.insertAdjacentHTML(
      'afterbegin',
      `<li class='country-list-item'><p>${country.name.official}</p><img class='country-list-img' src="${country.flags.png}" alt="${country.name.official}"></li>`
    );
  });
}

function countryInfoMaker(data) {
  countryInfo.insertAdjacentHTML(
    'afterbegin',
    `<h2 class="country-name"> ${data[0].name.official}
  <img class='country-list-img' src="${data[0].flags.png}" alt="${
      data[0].name.official
    }">
</h2>
<p class="country-capital"><span class="country-details">Capital:</span> ${
      data[0].capital
    }</p>
<p class="country-population"><span class="country-details">Population:</span> ${
      data[0].population
    } people </p>
<p class="country-languages"><span class="country-details">Languge(s): </span> ${Object.values(
      data[0].languages
    )}</p>`
  );
}
