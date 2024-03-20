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

const rangeSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const rangeSliderContainer = document.querySelector('.img-upload__effect-level');
const allEffects = document.querySelectorAll('.effects__radio');

noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

rangeSliderContainer.classList.add('hidden');

for (const effect of allEffects) {
  effect.addEventListener('change', (evt) => {
    if (evt.target.id === 'effect-chrome' && evt.target.checked) {
      rangeSlider.noUiSlider.on('update', () => {
        effectValue.value = rangeSlider.noUiSlider.get();
        workingImage.style.filter = `grayscale(${rangeSlider.noUiSlider.get()})`;
      });

      rangeSliderContainer.classList.remove('hidden');

      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
    } else if (evt.target.id === 'effect-sepia' && evt.target.checked) {
      rangeSlider.noUiSlider.on('update', () => {
        effectValue.value = rangeSlider.noUiSlider.get();
        workingImage.style.filter = `sepia(${rangeSlider.noUiSlider.get()})`;
      });

      rangeSliderContainer.classList.remove('hidden');

      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
    } else if (evt.target.id === 'effect-marvin' && evt.target.checked) {
      rangeSlider.noUiSlider.on('update', () => {
        effectValue.value = rangeSlider.noUiSlider.get();
        workingImage.style.filter = `invert(${rangeSlider.noUiSlider.get()}%)`;
      });

      rangeSliderContainer.classList.remove('hidden');

      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
    } else if (evt.target.id === 'effect-phobos' && evt.target.checked) {
      rangeSlider.noUiSlider.on('update', () => {
        effectValue.value = rangeSlider.noUiSlider.get();
        workingImage.style.filter = `blur(${rangeSlider.noUiSlider.get()}px)`;
      });

      rangeSliderContainer.classList.remove('hidden');

      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    } else if (evt.target.id === 'effect-heat' && evt.target.checked) {
      rangeSlider.noUiSlider.on('update', () => {
        effectValue.value = rangeSlider.noUiSlider.get();
        workingImage.style.filter = `brightness(${rangeSlider.noUiSlider.get()})`;
      });

      rangeSliderContainer.classList.remove('hidden');

      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    } else if (evt.target.id === 'effect-none' && evt.target.checked) {
      rangeSlider.noUiSlider.on('update', () => {
        effectValue.value = rangeSlider.noUiSlider.get();
        workingImage.style.filter = '';
      });

      rangeSliderContainer.classList.add('hidden');
    }
  });
}
