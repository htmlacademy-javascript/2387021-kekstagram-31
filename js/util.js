const errorLoadUsersDataTemplate = document.querySelector('#data-error').content;
const errorLoadDataTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const uploadWindow = document.querySelector('.img-upload__overlay');
const AUTOMATIC_CLOSING_TIME = 5000;

const showUploadErrorMessage = () => {
  const errorArea = errorLoadUsersDataTemplate.cloneNode(true);
  document.body.append(errorArea);

  const errorBlock = document.querySelector('.data-error');

  setTimeout(() => {
    errorBlock.remove();
  }, AUTOMATIC_CLOSING_TIME);
};

const showErrorMessage = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  document.body.append(errorArea);

  const errorBlock = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');

  const onDocumentClick = (evt) => {
    evt.stopPropagation();
    if (evt.key === 'Escape' || evt.target === errorBlock || evt.target === errorButton) {
      errorBlock.remove();
      document.body.removeEventListener('keydown', onDocumentClick);
      document.body.removeEventListener('click', onDocumentClick);
    }
  };

  document.body.addEventListener('keydown', onDocumentClick);
  document.body.addEventListener('click', onDocumentClick);
};

const showSuccessMessage = () => {
  const successArea = successTemplate.cloneNode(true);
  document.body.append(successArea);

  const successBlock = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  const onDocumentClick = (evt) => {
    evt.stopPropagation();
    if (evt.key === 'Escape' || evt.target === successBlock || evt.target === successButton) {
      successBlock.remove();
      document.body.removeEventListener('keydown', onDocumentClick);
      document.body.removeEventListener('click', onDocumentClick);
    }
  };

  document.body.addEventListener('keydown', onDocumentClick);
  document.body.addEventListener('click', onDocumentClick);
};

const closeUploadWindow = () => {
  document.body.classList.remove('modal-open');
  uploadWindow.classList.add('hidden');
};

function debounce(cb, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=> cb.apply(this, rest), timeoutDelay);
  };
}

export {showUploadErrorMessage, showErrorMessage, showSuccessMessage, closeUploadWindow, debounce};
