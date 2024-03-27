// import {createMinis} from './create-minis.js';
import {showErrorMessage} from './util.js';

// const baseUrl = 'https://31.javascript.htmlacademy.pro/kekstagram';

// const Route = {
//   getData: '/data',
//   sendData: '/',
// };

const method = {
  get: 'GET',
  post: 'POST',
};

const errorText = {
  get: 'Не удалось загрузить данные. Попробуйте еще раз',
  post: 'Не удалось отправить данные формы',
};

// fetch('https:31.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => {
//     if (response.ok) {
//       response.json();
//     }
//     // throw Error;
//   })
//   .then((minis) => {
//     createMinis(minis);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

async function getResponse() {
  let response;
  try {
    response = await fetch('https:31.javascript.htmlacademy.pro/kekstagram/data');
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    showErrorMessage();
  }
  const photos = await response.json();
  return photos;
}

const photos = await getResponse();


// const getData = () => load(Route.getData);

// getData().then((data) => {
//   console.log(data);
// }).catch((error) => {
//   console.error(error);
// });

// const sendData = (body) => load(Route.sendData, Method.post, body);

export {photos};
