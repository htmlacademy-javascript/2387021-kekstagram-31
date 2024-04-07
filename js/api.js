import {resetForm, enableButton} from './validate-form.js';
import {closeUploadWindow, showUploadErrorMessage, showErrorMessage, showSuccessMessage} from './util.js';

const filtersBlock = document.querySelector('.img-filters');
const baseUrl = 'https://31.javascript.htmlacademy.pro/kekstagram';
const route = {
  getData: '/data',
  sendData: '/',
};

async function getResponse() {
  let response;
  try {
    response = await fetch(`${baseUrl}${route.getData}`);
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

const sendRequest = (evt) => {
  const formData = new FormData(evt.target);
  fetch(
    `${baseUrl}${route.sendData}`,
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      } else {
        showSuccessMessage();
        resetForm();
        closeUploadWindow();
      }
      return response.json();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      enableButton();
    });
};

export {photos, sendRequest};
