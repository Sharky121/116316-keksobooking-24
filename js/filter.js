import {RADIX} from './consts.js';

const FilterSelectElements = {
  type: document.querySelector('#housing-type'),
  price: document.querySelector('#housing-price'),
  rooms: document.querySelector('#housing-rooms'),
  guests: document.querySelector('#housing-guests'),
};

const filterByType = (selectedOption, type) => selectedOption === 'any' || type === selectedOption;

const filterByRooms = (selectedOption, rooms) => selectedOption === 'any' || rooms === parseInt(selectedOption, RADIX);

const filterByGuests = (selectedOption, guests) => selectedOption === 'any' || guests === parseInt(selectedOption, RADIX);

const filterByPrice = (selectedOption, price) => {
  price = parseInt(price, RADIX);

  if (selectedOption === 'any') {
    return true;
  }

  if (selectedOption === 'low' && price >= 0 && price < 10000) {
    return true;
  }

  if (selectedOption === 'middle' && price >=10000 && price < 50000) {
    return true;
  }

  return selectedOption === 'high' && price >= 50000;
};

const getFeaturesRank = ({offer: {features = []}}) => {
  const featuresListElement = document.querySelectorAll('.map__checkbox:checked');
  const featuresSelected = [...featuresListElement].map((input) => input.value);

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
  .filter(({offer: {type, price, rooms, guests}}) => filterByType(FilterSelectElements.type.value, type)
      && filterByPrice(FilterSelectElements.price.value, price)
      && filterByRooms(FilterSelectElements.rooms.value, rooms)
      && filterByGuests(FilterSelectElements.guests.value, guests))
  .slice()
  .sort(sortOffers);
