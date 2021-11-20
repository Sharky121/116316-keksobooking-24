import {showAlert} from './utils.js';
import {getData} from './fetch-api.js';
import {isActiveForm, setSubmitForm, setResetForm} from './form.js';
import {renderMap, renderMarkers, resetMap, setMapFilter} from './map.js';

isActiveForm(false);
renderMap();

getData(
  (offers) => {
    renderMarkers(offers);
    setMapFilter(offers);
  },
  (error) => showAlert(error),
);

setSubmitForm(resetMap);
setResetForm(resetMap);
