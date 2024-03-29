const errorLoadUsersDataTemplate = document.querySelector('#data-error').content;
const errorLoadDataTemplate = document.querySelector('#error').content;
const errorButton = errorLoadDataTemplate.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content;
const successButton = document.querySelector('.success__button');
const uploadWindow = document.querySelector('.img-upload__overlay');

const showUploadErrorMessage = () => {
  const errorArea = errorLoadUsersDataTemplate.cloneNode(true);
  document.body.append(errorArea);

  const errorBlock = document.querySelector('.data-error');

  setTimeout(() => {
    errorBlock.remove();
  }, 5000);
};

const showErrorMessage = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  document.body.append(errorArea);

  const errorBlock = document.querySelector('.error');

  document.body.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
    if (evt.key === 'Escape') {
      errorBlock.remove();
    }
  });

  document.body.addEventListener('click', (evt) => {
    if (evt.target === errorBlock) {
      errorBlock.remove();
    }
  });

  errorButton.addEventListener('click', () => {
    errorBlock.remove();
  });

  setTimeout(() => {
    errorBlock.remove();
  }, 5000);
};

const showSuccessMessage = () => {
  const successArea = successTemplate.cloneNode(true);
  document.body.append(successArea);

  const successBlock = document.querySelector('.success');

  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successBlock.remove();
    }
  });

  document.body.addEventListener('click', (evt) => {
    if (evt.target === successBlock || evt.target === successButton) {
      successBlock.remove();
    }
  });

  setTimeout(() => {
    successBlock.remove();
  }, 5000);
};

const closeUploadWindow = () => {
  document.body.classList.remove('modal-open');
  uploadWindow.classList.add('hidden');
};

export {showUploadErrorMessage, showErrorMessage, showSuccessMessage, closeUploadWindow};
