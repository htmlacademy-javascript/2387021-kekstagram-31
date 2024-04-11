import {photos} from './api.js';
import {debounce} from './util.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
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
    comments.textContent = minis[i].comments.length;
    image.id = minis[i].id;

    fragment.append(photoElement);
  }

  container.append(fragment);
};

const getRandomPhotos = (minis) => {
  const copyMinis = minis.slice();
  for (let i = copyMinis.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    const lastElement = copyMinis[i];
    copyMinis[i] = copyMinis[randomNumber];
    copyMinis[randomNumber] = lastElement;
  }
  return copyMinis.slice(0, 10);
};

const getDiscussedPhotos = () => {
  const discussedPhotoList = photos.slice();
  return discussedPhotoList.sort((photoA, photoB) => {
    const commentCountPhotoA = photoA.comments.length;
    const commentCountPhotoB = photoB.comments.length;
    return commentCountPhotoB - commentCountPhotoA;
  });
};

const getFilterPhotosList = (photosList) => {
  container.innerHTML = '';
  container.append(picturesTitle);
  container.append(uploadSection);
  createMinis(photosList);
};

const getFiltredList = debounce(getFilterPhotosList, RERENDER_DELAY);

for (const filterButton of filterButtons) {
  filterButton.addEventListener('click', ()=> {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    filterButton.classList.add('img-filters__button--active');

    switch(filterButton.id) {
      case 'filter-default': getFiltredList(photos);
        break;
      case 'filter-random': getFiltredList(getRandomPhotos(photos));
        break;
      case 'filter-discussed': getFiltredList(getDiscussedPhotos());
        break;
    }
  });
}

export {createMinis, container};
