const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const workingImage = document.querySelector('.img-upload__preview').querySelector('img');

const getScaleUpImage = () => {
  let inputValue = parseInt(scaleValue.value, 10);
  if (inputValue !== 100) {
    scaleValue.value = `${inputValue + 25}%`;
    inputValue += 25;
    workingImage.style.transform = `scale(${inputValue / 100})`;
  }
};

scaleUpButton.addEventListener('click', getScaleUpImage);

const getScaleDownImage = () => {
  let inputValue = parseInt(scaleValue.value, 10);
  if (inputValue !== 25) {
    scaleValue.value = `${inputValue - 25}%`;
    inputValue -= 25;
    workingImage.style.transform = `scale(${inputValue / 100})`;
  }
};

scaleDownButton.addEventListener('click', getScaleDownImage);
