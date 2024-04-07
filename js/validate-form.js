import {workingImage, rangeSliderContainer, scaleValue} from './add-effects-to-image.js';
import {sendRequest} from './api.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeButtonModal = document.querySelector('.img-upload__cancel');
const hashtags = document.querySelector('.text__hashtags');
const textarea = document.querySelector('.text__description');
const formSubmitButton = document.querySelector('.img-upload__submit');
const space = '';

const disableButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = 'Публикация...';
};

const enableButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = 'Опубликовать';
};

const onOpenModalChange = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

uploadInput.addEventListener('change', onOpenModalChange);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div'
});

const closeModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  workingImage.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  workingImage.style.filter = '';
  hashtags.value = '';
  textarea.value = '';
  document.querySelector('#effect-none').checked = true;
  rangeSliderContainer.classList.add('hidden');
  pristine.reset();
};

closeButtonModal.addEventListener('click', closeModal);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
});

const resetForm = () => {
  form.reset();
  uploadInput.value = '';
  workingImage.style.transform = 'scale(1)';
  workingImage.style.filter = '';
  rangeSliderContainer.classList.add('hidden');
  scaleValue.value = '100%';
  pristine.reset();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    disableButton();
    sendRequest(evt);
  }
});

const validateHashtags = (value) => {
  if (value === '') {
    return true;
  }
  const regExp = /^#[a-zа-яё0-9]{1,20}$/i;
  const valueArray = value.split(' ').filter((item) => item !== space);

  for (const item of valueArray) {
    if (!regExp.test(item) || item.length > 20) {
      return false;
    }
  }
  return true;
};

const validateQuantityHashtags = (value) => {
  const valueArray = value.split(' ').filter((item) => item !== space);
  if (valueArray.length > 5) {
    return false;
  }
  return true;
};

const validateRepeatHashtags = (value) => {
  const valueArray = value.toLowerCase().split(' ').filter((item) => item !== space);
  const valueSet = new Set(valueArray);
  if (valueArray.length !== valueSet.size) {
    return false;
  }
  return true;
};

const validateMaxSymbols = (value) => {
  const countSymbols = value.length;
  return countSymbols <= 140;
};

pristine.addValidator(hashtags, validateHashtags, 'введен невалидный хэштег');
pristine.addValidator(hashtags, validateQuantityHashtags, 'превышено количество хэштегов');
pristine.addValidator(hashtags, validateRepeatHashtags, 'хэштеги повторяются');
pristine.addValidator(textarea, validateMaxSymbols, 'длина комментария превышает 140 символов');

textarea.addEventListener('keydown', (evt) => evt.stopPropagation());
hashtags.addEventListener('keydown', (evt) => evt.stopPropagation());

export {form, resetForm, enableButton};
