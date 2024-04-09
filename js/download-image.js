const downloadImageInput = document.querySelector('.img-upload__input');
const bigPreview = document.querySelector('.img-upload__preview img');
const littlePreviews = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const onDownloadImageChange = () => {
  const file = downloadImageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const url = URL.createObjectURL(file);
    bigPreview.src = url;
    for (const littlePreview of littlePreviews) {
      littlePreview.style.backgroundImage = `url(${url})`;
    }

    bigPreview.addEventListener('load', ()=> {
      URL.revokeObjectURL(url);
    });
  }
};

downloadImageInput.addEventListener('change', onDownloadImageChange);
