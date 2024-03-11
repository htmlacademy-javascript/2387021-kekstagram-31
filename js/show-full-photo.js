import {container, photos} from './create-minis.js';

const photoContainer = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const fullPhoto = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-total-count');
const shownCommentsCount = document.querySelector('.social__comment-shown-count');
const photoCaption = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');

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

const makeCommentsList = (list) => {
  for (let i = 0; i < list.length; i++) {
    const comment = commentItem.cloneNode(true);
    comment.querySelector('img').src = list[i].avatar;
    comment.querySelector('img').alt = list[i].name;
    comment.querySelector('p').textContent = list[i].message;
    commentsList.append(comment);
  }
};

const onPhotoClick = (evt) => {
  const currentPhoto = evt.target;
  const currentPhotoData = getPhotoById(currentPhoto);

  if (evt.target.matches('img')) {
    evt.preventDefault();
    showFullPhoto();
  }

  fullPhoto.src = currentPhoto.src;
  likesCount.textContent = currentPhotoData.likes;
  commentsCount.textContent = currentPhotoData.comments.length;
  (currentPhotoData.comments.length > 2) ? shownCommentsCount.textContent = 2 : shownCommentsCount.textContent = currentPhotoData.comments.length;
  photoCaption.textContent = currentPhotoData.description;
  commentsList.innerHTML = '';
  const commentsArray = currentPhotoData.comments;
  const commentsBlock = makeCommentsList(commentsArray);
};

container.addEventListener('click', onPhotoClick);

const closeFullPhoto = () => {
  document.body.classList.remove('modal-open');
  photoContainer.classList.add('hidden');
};

closeButton.addEventListener('click', closeFullPhoto);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeFullPhoto();
  }
});
