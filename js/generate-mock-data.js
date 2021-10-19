import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomValueFromArray,
  getRandomArray,
  generateRandomArray, getRandomSortArray
} from './utils.js';

const HOST = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';
const getAvatarPath = (index) => `img/avatars/user${index}.png`;
const getTitleText = (index) => `Объявление №${index}`;
const getDescText = (index) => `Описание №${index}`;

const Offers = {
  AVATARS: getRandomSortArray(getAvatarPath),
  TITLES: getRandomSortArray(getTitleText),
  DESCRIPTIONS: getRandomSortArray(getDescText),
  TYPES: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  CHECK: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: [
    `${HOST}/duonguyen-8LrGtIxxa4w.jpg`,
    `${HOST}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
    `${HOST}/claire-rendall-b6kAwr1i0Iw.jpg`,
  ],
};

export const generateMockData = (index) => {
  const Coords = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: Offers.AVATARS[index],
    },
    offer: {
      title: Offers.TITLES[index],
      address: `${Coords.lat}, ${Coords.lng}`,
      price: getRandomPositiveInteger(0, 10000),
      type: getRandomValueFromArray(Offers.TYPES),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(1, 20),
      checkin: getRandomValueFromArray(Offers.CHECK),
      checkout: getRandomValueFromArray(Offers.CHECK),
      features: getRandomArray(Offers.FEATURES),
      description: Offers.DESCRIPTIONS[index],
      photos: generateRandomArray(Offers.PHOTOS),
    },
    location: {
      lat: Coords.lat,
      lng: Coords.lng,
    },
  };
};
