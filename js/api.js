// import {createMinis} from './create-minis.js';
import {showUploadErrorMessage} from './util.js';

const filtersBlock = document.querySelector('.img-filters');

// const baseUrl = 'https://31.javascript.htmlacademy.pro/kekstagram';

// const Route = {
//   getData: '/data',
//   sendData: '/',
// };

// const method = {
//   get: 'GET',
//   post: 'POST',
// };

// const errorText = {
//   get: 'Не удалось загрузить данные. Попробуйте еще раз',
//   post: 'Не удалось отправить данные формы',
// };


async function getResponse() {
  let response;
  try {
    response = await fetch('https:31.javascript.htmlacademy.pro/kekstagram/data');
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    showUploadErrorMessage();
  }
  const minis = await response.json();
  filtersBlock.classList.remove('img-filters--inactive');
  return minis;
}

const photos = await getResponse();

export {photos};
