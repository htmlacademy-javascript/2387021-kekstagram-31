const checkLength = (string, maxLength) => string.length <= maxLength;
// console.log(checkLength('helloWorld', 9));
// console.log(checkLength('helloWorld', 10));

const isPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i <= Math.floor(newString.length / 2); i++) {
    if (newString.at(i) !== newString.at(-i - 1)) {
      return false;
    }
  }
  return true;
};
// console.log(isPalindrome('Лёша на полке клопа нашёл '));
// console.log(isPalindrome('не палиндром'));

const getNumbers = (string) => {
  const newString = String(string);
  const NUMBERS = '0123456789';
  let result = '';
  for (let number of newString) {
    if (NUMBERS.includes(number)) {
      result += number;
    }
  }
  return result.length ? +result : NaN;
};
// console.log(getNumbers('1 кефир, 0.5 батона'));
// console.log(getNumbers('а я томат'));
// console.log(getNumbers(-1.5));

