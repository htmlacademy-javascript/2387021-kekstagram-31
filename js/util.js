const errorLoadDataTemplate = document.querySelector('#data-error').content;

const showErrorMessage = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  document.body.append(errorArea);

  const errorBlock = document.querySelector('.data-error');

  setTimeout(() => {
    errorBlock.remove();
  }, 5000);
};

export {showErrorMessage};
