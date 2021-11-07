import {QUANTITY} from './consts.js';
import {generateMockData} from './generate-mock-data.js';
import {renderMap} from './map.js';
import {isActiveForm} from './form.js';

const offers = new Array(QUANTITY)
  .fill(null)
  .map((element, index) => generateMockData(index));

isActiveForm(false);
renderMap(offers);
