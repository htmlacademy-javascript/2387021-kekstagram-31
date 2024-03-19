import {createPhotosList} from './create-photos-list.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const photos = createPhotosList();

const createMinis = () => {
  for (let i = 0; i < photos.length; i++) {
    const photoElement = template.cloneNode(true);
    const image = photoElement.querySelector('.picture__img');
    const likes = photoElement.querySelector('.picture__likes');
    const comments = photoElement.querySelector('.picture__comments');

    image.src = photos[i].url;
    image.alt = photos[i].description;
    likes.textContent = photos[i].likes;
    comments.innerHTML = photos[i].comments.length;
    image.id = photos[i].id;

    fragment.append(photoElement);
  }

  container.append(fragment);
};

export {createMinis, container, photos};

