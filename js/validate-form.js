// import {closeUploadWindow, showErrorMessage, showSuccessMessage} from './util.js';
import {workingImage, rangeSliderContainer} from './add-effects-to-image.js';
import {sendRequest} from './api.js';


const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeButtonModal = document.querySelector('.img-upload__cancel');
const hashtags = document.querySelector('.text__hashtags');
const textarea = document.querySelector('.text__description');
const formSubmitButton = document.querySelector('.img-upload__submit');

const disabledButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = 'Публикация...';
};

const enableButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = 'Опубликовать';
};

const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

uploadInput.addEventListener('change', openModal);

const closeModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  workingImage.style.transform = 'scale(1)';
  workingImage.style.filter = '';
  rangeSliderContainer.classList.add('hidden');
};

const resetForm = () => {
  form.reset();
  uploadInput.value = '';
  workingImage.style.transform = 'scale(1)';
  workingImage.style.filter = '';
  rangeSliderContainer.classList.add('hidden');
};

closeButtonModal.addEventListener('click', closeModal);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div'
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    disabledButton();
    sendRequest(evt);
    // const formData = new FormData(evt.target);
    // fetch(
    //   'https:31.javascript.htmlacademy.pro/kekstagram/',
    //   {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`${response.status} - ${response.statusText}`);
    //     } else {
    //       showSuccessMessage();
    //       resetForm();
    //       closeUploadWindow();
    //     }
    //     return response.json();
    //   })
    //   .catch(() => {
    //     showErrorMessage();
    //   })
    //   .finally(() => {
    //     enableButton();
    //   });
  }
});

const validateHashtags = (value) => {
  if (value === '') {
    return true;
  }
  const regExp = /^#[a-zа-яё0-9]{1,20}$/i;
  const valueArray = value.split(' ');

  for (const item of valueArray) {
    if (!regExp.test(item) || item.length > 20) {
      return false;
    }
  }
  return true;
};

const validateQuantityHashtags = (value) => {
  const valueArray = value.split(' ');
  if (valueArray.length > 5) {
    return false;
  }
  return true;
};

const validateRepeatHashtags = (value) => {
  const valueArray = value.split(' ');
  const valueSet = new Set(valueArray);
  if (valueArray.length !== valueSet.size) {
    return false;
  }
  return true;
};

pristine.addValidator(hashtags, validateHashtags, 'введен невалидный хэштег');
pristine.addValidator(hashtags, validateQuantityHashtags, 'превышено количество хэштегов');
pristine.addValidator(hashtags, validateRepeatHashtags, 'хэштеги повторяются');

textarea.addEventListener('keydown', (evt) => evt.stopPropagation());
hashtags.addEventListener('keydown', (evt) => evt.stopPropagation());

export {form, resetForm, enableButton};
