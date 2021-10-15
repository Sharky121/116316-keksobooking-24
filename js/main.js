const QUANTITY = 10;

// Получает случайное целое число
const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Получает случайное число с плавающей точкой
const getRandomPositiveFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

// Получает случайное значение из массива
const getRandomValueFromArray = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Получает массив случайной длины из массива
const getRandomArray = (array) => array.filter(() => getRandomPositiveInteger(0, 1));

// Создаёт массив случайной длины из массива
const generateRandomArray = (array) => new Array(getRandomPositiveInteger(1, 10))
  .fill(null)
  .map(() => array[getRandomPositiveInteger(0, array.length - 1)]);

// Получает массив названий
const getTextArray = (string) => (new Array(QUANTITY)
  .fill(null)
  .map((el, index) => string + index + 1)
  .sort(() => Math.random() - 0.5));

// Получат массив путей для фотографий
const getAvatarSrcArray = () => new Array(QUANTITY)
  .fill(null)
  .map((el, index) => `img/avatars/user${index}.png`)
  .sort(() => Math.random() - 0.5);

const Offers = {
  AVATAR: getAvatarSrcArray(),
  TITLE: getTextArray('Объявление №'),
  DESCRIPTION: getTextArray('Описание №'),
  TYPES: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  CHECK: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

// Генерирует объявления
const generateOffers = (index) => {
  const Coords = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: Offers.AVATAR[index],
    },
    offer: {
      title: Offers.TITLE[index],
      address: `${Coords.lat}, ${Coords.lng}`,
      price: getRandomPositiveInteger(0, 10000),
      type: getRandomValueFromArray(Offers.TYPES),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(1, 20),
      checkin: getRandomValueFromArray(Offers.CHECK),
      checkout: getRandomValueFromArray(Offers.CHECK),
      features: getRandomArray(Offers.FEATURES),
      description: Offers.DESCRIPTION[index],
      photos: generateRandomArray(Offers.PHOTOS),
    },
    location: {
      lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
      lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
    },
  };
};

const offers = new Array(QUANTITY).fill(null).map((element, index) => generateOffers(index));
