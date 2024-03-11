import {getRandomNumber, getUniqueRandomNumber} from './random-number.js';

const generatedCommentId = getUniqueRandomNumber(1, 9999);
const getGeneratedAvatarPath = () => getRandomNumber(1, 6);

const userMessages = ['Всё отлично!', 'Уникальный кадр!', 'Вау! Не зря подписался)', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
const userNames = ['Артемон', 'Борис', 'Федор', 'Мишель', 'Милана', 'Виктория', 'Анфиса'];

const getRandomUserMessage = () => userMessages[getRandomNumber(0, userMessages.length - 1)];
const getRandomUserName = () => userNames[getRandomNumber(0, userNames.length - 1)];

const createComment = () => ({
  id: generatedCommentId(),
  avatar: `img/avatar-${getGeneratedAvatarPath()}.svg`,
  message: getRandomUserMessage(),
  name: getRandomUserName()
});

export {createComment};

