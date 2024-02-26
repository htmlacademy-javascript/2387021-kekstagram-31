const getRandomNumber = (minNumber, maxNumber) => {
  const minValue = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const maxValue = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const getUniqueRandomNumber = (minNumber, maxNumber) => {
  const uniqueNumbers = [];
  return function () {
    let currentNumber = getRandomNumber(minNumber, maxNumber);
    if (uniqueNumbers.length >= (maxNumber - minNumber + 1)) {
      // console.error('Ошибка: массив уникальных номеров заполнен.');
      return null;
    }
    while (uniqueNumbers.includes(currentNumber)) {
      currentNumber = getRandomNumber(minNumber, maxNumber);
    }
    uniqueNumbers.push(currentNumber);
    return currentNumber;
  };
};

const generatedId = getUniqueRandomNumber(1, 25);
const generatedUrl = getUniqueRandomNumber(1, 25);
const generatedCommentId = getUniqueRandomNumber(1, 9999);
const getGeneratedAvatarPath = () => getRandomNumber(1, 6);
const photoDescription = ['Это я на море', 'Это я в горах', 'Это я на диване'];
const userMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
const userNames = ['Артемон', 'Борис', 'Федор', 'Мишель'];
const getRandomPhotoDescription = () => photoDescription[getRandomNumber(0, photoDescription.length - 1)];
const getRandomUserMessage = () => userMessages[getRandomNumber(0, userMessages.length - 1)];
const getRandomUserName = () => userNames[getRandomNumber(0, userNames.length - 1)];

const createComment = () => ({
  id: generatedCommentId(),
  avatar: `img/avatar-${getGeneratedAvatarPath()}.svg`,
  message: getRandomUserMessage(),
  name: getRandomUserName()
});

const getCommentsList = () => Array.from({length: getRandomNumber(0, 30)}, createComment);

const createPhotoData = () => ({
  id: generatedId(),
  url: `photos/${generatedUrl()}.jpg`,
  description: getRandomPhotoDescription(),
  likes: getRandomNumber(15, 200),
  comments: getCommentsList()
});

const photosList = Array.from({length: 25}, createPhotoData);
// console.log(photosList);

