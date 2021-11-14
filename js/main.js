import {QUANTITY} from './consts.js';
import {renderMap, renderMarkers, resetMap} from './map.js';
import {isActiveForm, setSubmitForm, setResetForm} from './form.js';
import {getData} from './fetch-api.js';
import {showAlert} from './utils.js';

isActiveForm(false);
renderMap();

getData(
  (offers) => {
    renderMarkers(offers.slice(0, QUANTITY));
  },
  (error) => showAlert(error),
);

setSubmitForm(resetMap);
setResetForm(resetMap);
