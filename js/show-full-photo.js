import {container} from './create-minis.js';
import {photos} from './api.js';
import {scaleValue} from './add-effects-to-image.js';

const photoContainer = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const fullPhoto = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-total-count');
const shownCommentsCount = document.querySelector('.social__comment-shown-count');
const photoCaption = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const loadButton = document.querySelector('.social__comments-loader');
const NUMBER_OF_DOWNLOADED_COMMENTS = 5;
let comments = [];

const showFullPhoto = () => {
  document.body.classList.add('modal-open');
  photoContainer.classList.remove('hidden');
};

const getPhotoById = (image) => {
  for (const photo of photos) {
    if (photo.id === Number(image.id)) {
      return photo;
    }
  }
};

const hideButton = () => loadButton.classList.add('hidden');

const makeCommentsList = (list) => {

  if (list.length === 0) {
    shownCommentsCount.textContent = 0;
  }
  for (let i = 0; i < list.length; i++) {
    const comment = commentItem.cloneNode(true);
    comment.querySelector('img').src = list[i].avatar;
    comment.querySelector('img').alt = list[i].name;
    comment.querySelector('p').textContent = list[i].message;
    comments.push(comment);
  }
  return comments;
};

const onPhotoClick = (evt) => {
  const currentPhoto = evt.target;
  const currentPhotoData = getPhotoById(currentPhoto);

  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    showFullPhoto();

    loadButton.classList.remove('hidden');
    shownCommentsCount.textContent = 0;
    comments = [];
    fullPhoto.src = currentPhotoData.url;
    likesCount.textContent = currentPhotoData.likes;
    commentsCount.textContent = currentPhotoData.comments.length;
    photoCaption.textContent = currentPhotoData.description;
    commentsList.textContent = '';
    const commentsArray = currentPhotoData.comments;
    const allComments = makeCommentsList(commentsArray);

    for (let i = 0; i < NUMBER_OF_DOWNLOADED_COMMENTS; i++) {
      if (!allComments[i]) {
        break;
      }
      commentsList.append(allComments[i]);
      shownCommentsCount.textContent = i + 1;
    }

    if (shownCommentsCount.textContent === commentsCount.textContent) {
      hideButton();
    }

    const onLoadMoreButtonClick = () => {
      let counter = 0;
      for (let i = Number(shownCommentsCount.textContent); (i < Number(shownCommentsCount.textContent) + 5); i++) {
        if (!allComments[i]) {
          break;
        }
        commentsList.append(allComments[i]);
        counter++;
      }
      shownCommentsCount.textContent = Number(shownCommentsCount.textContent) + counter;

      if (shownCommentsCount.textContent >= commentsCount.textContent) {
        hideButton();
      }
    };

    loadButton.addEventListener('click', onLoadMoreButtonClick);

    const onCloseFullPhotoClick = (event) => {
      if (event.key === 'Escape' || event.target === closeButton) {
        document.removeEventListener('keydown', onCloseFullPhotoClick);
      }
      document.body.classList.remove('modal-open');
      photoContainer.classList.add('hidden');
      loadButton.removeEventListener('click', onLoadMoreButtonClick);
      closeButton.removeEventListener('click', onCloseFullPhotoClick);
      scaleValue.value = '100%';
    };

    closeButton.addEventListener('click', onCloseFullPhotoClick);
    document.addEventListener('keydown', onCloseFullPhotoClick);
  }
};

container.addEventListener('click', onPhotoClick);

export {onPhotoClick};
