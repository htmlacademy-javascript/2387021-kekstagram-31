const downloadImageInput = document.querySelector('.img-upload__input');
const bigPreview = document.querySelector('.img-upload__preview img');
const littlePreviews = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

downloadImageInput.addEventListener('change', () => {
  const file = downloadImageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    bigPreview.src = URL.createObjectURL(file);
  }

  for (const littlePreview of littlePreviews) {
    littlePreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});
