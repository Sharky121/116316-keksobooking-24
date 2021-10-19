import {QUANTITY} from './consts.js';
import {generateMockData} from './generate-mock-data.js';

// eslint-disable-next-line
const offers = new Array(QUANTITY)
  .fill(null)
  .map((element, index) => generateMockData(index));
