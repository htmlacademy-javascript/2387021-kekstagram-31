// import {createPhotosList} from './create-photos-list.js';
import {photos} from './api.js';
import {getUniqueRandomNumber} from './random-number.js';
// import {getData} from './api.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
// const photos = createPhotosList();

const filterButtons = Array.from(document.querySelectorAll('.img-filters__button'));


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

for (const filterButton of filterButtons) {
  filterButton.addEventListener('click', ()=> {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    filterButton.classList.add('img-filters__button--active');

    const title = document.querySelector('.pictures__title');
    const uploadSection = document.querySelector('.img-upload');

    container.innerHTML = '';
    container.append(title);
    container.append(uploadSection);

    switch(filterButton.id) {
      case 'filter-default': createMinis(photos);
        break;
      case 'filter-random': createMinis(getRandomPhotos(10));
        break;
      case 'filter-discussed': createMinis(getDiscussedPhotos());
        break;
    }
  });
}

export {createMinis, container};
