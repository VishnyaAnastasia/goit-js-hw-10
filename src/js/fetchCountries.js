import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name.trim()}?fields=name,capital,population,flags,languages
  `)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notify.warning('Many matches found');
        return data;
      }
      if (data.length >= 2 && data.length <= 10) {
        Notify.info(`Found ${data.length} countries`);
        return data;
      }
      if (data.length === 1) {
        Notify.success(`Found ${data[0].name.official}`);
        return data;
      }
    })
    .catch(error => {
      Notify.failure('Oops... no country found');
    });
}
