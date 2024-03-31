const checkLength = (string, maxLength) => string.length <= maxLength;
checkLength('helloWorld', 9);

const isPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i <= Math.floor(newString.length / 2); i++) {
    if (newString.at(i) !== newString.at(-i - 1)) {
      return false;
    }
  }
  return true;
};
isPalindrome('Лёша на полке клопа нашёл ');

const getNumbers = (string) => {
  const newString = String(string);
  const NUMBERS = '0123456789';
  let result = '';
  for (const number of newString) {
    if (NUMBERS.includes(number)) {
      result += number;
    }
  }
  return result.length ? +result : NaN;
};
getNumbers('1 кефир, 0.5 батона');

const isIncludedInTheWorkingDay = (startWorkingDay, endWorkingDay, startMeeting, duration) => {
  const getMinutes = (time) => Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]);
  return (getMinutes(startMeeting) >= getMinutes(startWorkingDay) && (getMinutes(startMeeting) + duration) <= getMinutes(endWorkingDay));
};
isIncludedInTheWorkingDay('8:00', '17:30', '08:00', 900);
