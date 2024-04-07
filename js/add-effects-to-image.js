const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const workingImage = document.querySelector('.img-upload__preview').querySelector('img');
const rangeSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const rangeSliderContainer = document.querySelector('.img-upload__effect-level');
const allEffects = document.querySelectorAll('.effects__radio');
const STEP_SCALE = 25;

const onScaleButtonUpClick = () => {
  let inputValue = parseInt(scaleValue.value, 10);
  if (inputValue !== 100) {
    scaleValue.value = `${inputValue + STEP_SCALE}%`;
    inputValue += STEP_SCALE;
    workingImage.style.transform = `scale(${inputValue / 100})`;
  }
};

scaleUpButton.addEventListener('click', onScaleButtonUpClick);

const onScaleButtonDownClick = () => {
  let inputValue = parseInt(scaleValue.value, 10);
  if (inputValue !== STEP_SCALE) {
    scaleValue.value = `${inputValue - STEP_SCALE}%`;
    inputValue -= STEP_SCALE;
    workingImage.style.transform = `scale(${inputValue / 100})`;
  }
};

scaleDownButton.addEventListener('click', onScaleButtonDownClick);

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

// rangeSliderContainer.classList.add('hidden');

noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


//оптимизированная, но не рабочая версия

// const effectsParametrs = {
//   'effect-none': {
//     filter: '',
//     min: 1,
//     max: 3,
//     start: 3,
//     step: 0.1
//   },
//   'effect-chrome': {
//     filter: () => `grayscale(${rangeSlider.noUiSlider.get()})`,
//     min: 0,
//     max: 1,
//     start: 1,
//     step: 0.1
//   },
//   'effect-sepia': {
//     filter: () => `sepia(${rangeSlider.noUiSlider.get()})`,
//     min: 0,
//     max: 1,
//     start: 1,
//     step: 0.1
//   },
//   'effect-marvin': {
//     filter: () => `invert(${rangeSlider.noUiSlider.get()}%)`,
//     min: 0,
//     max: 100,
//     start: 100,
//     step: 1
//   },
//   'effect-phobos': {
//     filter: () => `blur(${rangeSlider.noUiSlider.get()}px)`,
//     min: 0,
//     max: 3,
//     start: 3,
//     step: 0.1
//   },
//   'effect-heat': {
//     filter: () => `brightness(${rangeSlider.noUiSlider.get()})`,
//     min: 1,
//     max: 3,
//     start: 3,
//     step: 0.1
//   }
// };

// const addEffectsToImage = (evt) => {
//   if (evt.target.matches('.effects__radio')) {
//     const effectId = evt.target.id;
//     rangeSlider.noUiSlider.on('update', () => {
//       effectValue.value = rangeSlider.noUiSlider.get();
//       workingImage.style.filter = effectsParametrs[effectId].filter;
//     });

//     rangeSlider.noUiSlider.updateOptions({
//       range: {
//         min: effectsParametrs[effectId].min,
//         max: effectsParametrs[effectId].max
//       },
//       start: effectsParametrs[effectId].start,
//       step: effectsParametrs[effectId].step
//     });

//     if (effectId === 'effect-none') {
//       rangeSliderContainer.classList.add('hidden');
//     } else {
//       rangeSliderContainer.classList.remove('hidden');
//     }
//   }
// };

// form.addEventListener('change', addEffectsToImage);

export {workingImage, rangeSliderContainer, scaleValue, allEffects};
