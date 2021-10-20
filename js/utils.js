import {QUANTITY} from './consts.js';

// Получает случайное целое число
export const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Получает случайное число с плавающей точкой
export const getRandomPositiveFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

// Получает случайное значение из массива
export const getRandomValueFromArray = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Получает массив случайной длины из массива
export const getRandomArray = (array) => array.filter(() => getRandomPositiveInteger(0, 1));

// Создаёт массив случайной длины из массива
export const generateRandomArray = (array) => new Array(getRandomPositiveInteger(1, QUANTITY))
  .fill(null)
  .map(() => array[getRandomPositiveInteger(0, array.length - 1)]);

// Создаёт массив из перемешанных строчек
export const getRandomSortArray = (cb) => new Array(QUANTITY)
  .fill(null)
  .map((el, index) => cb(index))
  .sort(() => Math.random() - 0.5);
