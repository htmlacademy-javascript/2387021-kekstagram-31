// import {createPhotosList} from './create-photos-list.js';
import {photos} from './api.js';
import {getUniqueRandomNumber} from './random-number.js';
// import {getData} from './api.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
// const photos = createPhotosList();

const filterButtons = Array.from(document.querySelectorAll('.img-filters__button'));
const picturesTitle = document.querySelector('.pictures__title');
const uploadSection = document.querySelector('.img-upload');
const RERENDER_DELAY = 500;

const createMinis = (minis) => {
  for (let i = 0; i < minis.length; i++) {
    const photoElement = template.cloneNode(true);
    const image = photoElement.querySelector('.picture__img');
    const likes = photoElement.querySelector('.picture__likes');
    const comments = photoElement.querySelector('.picture__comments');

    image.src = minis[i].url;
    image.alt = minis[i].description;
    likes.textContent = minis[i].likes;
    comments.innerHTML = minis[i].comments.length;
    image.id = minis[i].id;

    fragment.append(photoElement);
  }

  container.append(fragment);
};

const getRandomPhotos = (count) => {
  const randomPhotoList = [];
  for (let i = 0; i < count; i++) {
    const photoId = getUniqueRandomNumber(0, 24);
    const photo = photos[photoId()];
    randomPhotoList.push(photo);
  }
  return randomPhotoList;
};

const getDiscussedPhotos = () => {
  const discussedPhotoList = photos.slice();
  return discussedPhotoList.sort((photoA, photoB) => {
    const commentCountPhotoA = photoA.comments.length;
    const commentCountPhotoB = photoB.comments.length;
    return commentCountPhotoB - commentCountPhotoA;
  });
};

function debounce(cb, timeoutDelay = 500) {
  console.log('work')
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=> cb.apply(this, rest), timeoutDelay);
  };
}

const getFilterPhotosList = (photosList) => {
  container.innerHTML = '';
  container.append(picturesTitle);
  container.append(uploadSection);
  createMinis(photosList);
};

for (const filterButton of filterButtons) {
  filterButton.addEventListener('click', ()=> {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    filterButton.classList.add('img-filters__button--active');

    switch(filterButton.id) {
      case 'filter-default': getFilterPhotosList(photos);
        break;
      case 'filter-random': getFilterPhotosList(getRandomPhotos(10));
        break;
      case 'filter-discussed': getFilterPhotosList(getDiscussedPhotos());
        break;
    }
  });
}

export {createMinis, container};
