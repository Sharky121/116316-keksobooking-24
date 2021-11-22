import {RADIX} from './consts.js';

const PriceValues = {
  LOW: 0,
  MIDDLE: 10000,
  HIGH: 5000,
};

const SelectValues = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const FilterSelects = {
  type: document.querySelector('#housing-type'),
  price: document.querySelector('#housing-price'),
  rooms: document.querySelector('#housing-rooms'),
  guests: document.querySelector('#housing-guests'),
};

const filterByType = (selectedOption, type) => selectedOption === SelectValues.ANY || type === selectedOption;

const filterByRooms = (selectedOption, rooms) => selectedOption === SelectValues.ANY || rooms === parseInt(selectedOption, RADIX);

const filterByGuests = (selectedOption, guests) => selectedOption === SelectValues.ANY || guests === parseInt(selectedOption, RADIX);

const filterByPrice = (selectedOption, price) => {
  price = parseInt(price, RADIX);

  if (selectedOption === SelectValues.ANY) {
    return true;
  }

  if (selectedOption === SelectValues.LOW && price >= PriceValues.LOW && price < PriceValues.MIDDLE) {
    return true;
  }

  if (selectedOption === SelectValues.MIDDLE && price >= PriceValues.MIDDLE && price < PriceValues.HIGH) {
    return true;
  }

  return selectedOption === SelectValues.HIGH && price >= PriceValues.HIGH;
};

const filterByFeatures = (features) => {
  if (features) {
    const selectedFeatures = document.querySelectorAll('input:checked');

    return [...selectedFeatures].every((item) => features.includes(item.value));
  }

  return false;
};

const getFeaturesRank = ({offer: {features = []}}) => {
  const featuresList = document.querySelectorAll('.map__checkbox:checked');
  const featuresSelected = [...featuresList].map((input) => input.value);

  let rank = 0;

  featuresSelected.forEach((selectedElement) => {
    if (features.some((feature) => feature === selectedElement)) {
      rank +=1;
    }
  });

  return rank;
};

const sortOffers = (offerA, offerB) => getFeaturesRank(offerB) - getFeaturesRank(offerA);

export const mapFilter = (offers) => offers
  .filter(({offer: {type, price, rooms, guests, features}}) => filterByType(FilterSelects.type.value, type)
      && filterByPrice(FilterSelects.price.value, price)
      && filterByRooms(FilterSelects.rooms.value, rooms)
      && filterByGuests(FilterSelects.guests.value, guests)
      && filterByFeatures(features))
  .slice()
  .sort(sortOffers);
