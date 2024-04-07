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
let commentsContainer = [];

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
    commentsContainer.push(comment);
  }
  return commentsContainer;
};

const onPhotoClick = (evt) => {
  const currentPhoto = evt.target;
  const currentPhotoData = getPhotoById(currentPhoto);

  if (evt.target.closest('img')) {
    evt.preventDefault();
    showFullPhoto();

    loadButton.classList.remove('hidden');
    shownCommentsCount.textContent = 0;
    commentsContainer = [];
    fullPhoto.src = currentPhotoData.url;
    likesCount.textContent = currentPhotoData.likes;
    commentsCount.textContent = currentPhotoData.comments.length;
    photoCaption.textContent = currentPhotoData.description;
    commentsList.textContent = '';
    const commentsArray = currentPhotoData.comments;
    const allComments = makeCommentsList(commentsArray);

    for (let i = 0; i < 5; i++) {
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

    const onCloseFullPhotoClick = () => {
      document.body.classList.remove('modal-open');
      photoContainer.classList.add('hidden');
      loadButton.removeEventListener('click', onLoadMoreButtonClick);
      closeButton.removeEventListener('click', onCloseFullPhotoClick);
      // document.removeEventListener('keydown', onCloseFullPhotoKeydown);
      scaleValue.value = '100%';
    };

    closeButton.addEventListener('click', onCloseFullPhotoClick);

    const onCloseFullPhotoKeydown = (event) => {
      if (event.key === 'Escape') {
        onCloseFullPhotoClick();
      }
    };

    document.addEventListener('keydown', onCloseFullPhotoKeydown);
  }
};


container.addEventListener('click', onPhotoClick);

export {onPhotoClick};
