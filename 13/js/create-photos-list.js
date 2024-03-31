import {getRandomNumber, getUniqueRandomNumber} from './random-number.js';
import {createComment} from './create-comment.js';

const generatedId = getUniqueRandomNumber(1, 25);
const generatedUrl = getUniqueRandomNumber(1, 25);

const photoDescription = ['Это я на море', 'Это я в горах', 'Это я на диване', 'Это я в Дубае'];

const getRandomPhotoDescription = () => photoDescription[getRandomNumber(0, photoDescription.length - 1)];
const getCommentsList = () => Array.from({length: getRandomNumber(0, 30)}, createComment);

const createPhotoData = () => ({
  id: generatedId(),
  url: `photos/${generatedUrl()}.jpg`,
  description: getRandomPhotoDescription(),
  likes: getRandomNumber(15, 200),
  comments: getCommentsList()
});

const createPhotosList = () => Array.from({length: 25}, createPhotoData);

export {createPhotosList};
