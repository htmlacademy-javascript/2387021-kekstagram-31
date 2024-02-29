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
      return null;
    }
    while (uniqueNumbers.includes(currentNumber)) {
      currentNumber = getRandomNumber(minNumber, maxNumber);
    }
    uniqueNumbers.push(currentNumber);
    return currentNumber;
  };
};

export {getRandomNumber, getUniqueRandomNumber};
