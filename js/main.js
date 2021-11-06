import './form.js';
import {QUANTITY} from './consts.js';
import {generateMockData} from './generate-mock-data.js';
import {createOfferCardElement} from './create-offer-card-element.js';

const mapElement = document.querySelector('#map-canvas');

const offers = new Array(QUANTITY)
  .fill(null)
  .map((element, index) => generateMockData(index));

// eslint-disable-next-line
const createOffersCardElements = (elements) => {
  const offerCardsFragment = document.createDocumentFragment();

  elements.forEach((element) => {
    const offerCardElement = createOfferCardElement(element);

    offerCardsFragment.appendChild(offerCardElement);
  });

  mapElement.appendChild(offerCardsFragment);
};

mapElement.appendChild(createOfferCardElement(offers[0]));

