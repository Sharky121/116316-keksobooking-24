import {sendData} from './fetch-api.js';
import {createResponseMessage} from './create-response-message.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const RADIX = 10;

const roomsToCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const typeToPrice = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
};

const ResponseMessage = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const FiltersFormElements = {
  select: filterForm.querySelectorAll('.map__filter'),
  checkbox: filterForm.querySelectorAll('.map__checkbox'),
};

const adFormFieldsetElements = adForm.querySelectorAll('.ad-form__element');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adTypeSelect = adForm.querySelector('#type');
const adRoomSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');

const getOptionValue = (select) => {
  const selectedOptionIndex = select.options.selectedIndex;

  return select.options[selectedOptionIndex].value;
};

const validateAdTitle = () => {
  const valueLength = adTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }

  adTitleInput.reportValidity();
};

const validateAdPrice = (priceInput) => {
  const value = parseInt(priceInput.value, RADIX);
  const minValue = parseInt(adPriceInput.min, RADIX);

  if (value > MAX_PRICE) {
    adPriceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE}`);
  } else if (value < minValue) {
    adPriceInput.setCustomValidity(`Цена не должна быть меньше ${minValue}`);
  } else {
    adPriceInput.setCustomValidity('');
  }

  adPriceInput.reportValidity();
};

const isValidRoomToCapacity = () => {
  const roomValue = getOptionValue(adRoomSelect);
  const capacityValue = getOptionValue(adCapacitySelect);
  const isRoomToCapacity = roomsToCapacity[roomValue].includes(parseInt(capacityValue, RADIX));

  let errorMessage = '';

  if (!isRoomToCapacity) {
    errorMessage = 'Количество комнат не соответствуте количеству мест';
  }

  adRoomSelect.setCustomValidity(errorMessage);
  adRoomSelect.reportValidity();
};

const isValidTypeToPrice = () => {
  const priceValue = typeToPrice[getOptionValue(adTypeSelect)];

  adPriceInput.placeholder = priceValue;
  adPriceInput.min = priceValue;
};

const syncTimeSelect = (firstSelect, secondSelect) => {
  const firstSelectValue = getOptionValue(firstSelect);

  [...secondSelect.options].forEach((element, index) => {
    if (element.value === firstSelectValue) {
      secondSelect.options[index].selected = true;
    }
  });
};

const toggleElementsActivity = (elements, status) => {
  elements.forEach((element) => {
    element.disabled = status;
  });
};

const resetPage = (resetMap) => {
  adForm.reset();
  filterForm.reset();
  setTimeout(resetMap, 1);
};

export const setSubmitForm = (resetMap) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    isValidTypeToPrice();
    isValidRoomToCapacity();

    sendData(
      () => {
        createResponseMessage(ResponseMessage.SUCCESS);
        resetPage(resetMap);
      },
      () => {
        createResponseMessage(ResponseMessage.ERROR);
      },
      new FormData(adForm),
    );
  });
};

export const setResetForm = (resetMap) => {
  adForm.addEventListener('reset', () => {
    resetPage(resetMap);
  });
};

export const isActiveForm = (status) => {
  if (status) {
    adForm.classList.remove('ad-form--disabled');
    filterForm.classList.remove('map__filters--disabled');

    adTitleInput.addEventListener('input', () => {
      validateAdTitle();
    });
    adPriceInput.addEventListener('input', (evt) => {
      validateAdPrice(evt.target);
    });
    adTypeSelect.addEventListener('change', () => {
      isValidTypeToPrice();
    });
    adTimeInSelect.addEventListener('change', () => {
      syncTimeSelect(adTimeInSelect, adTimeOutSelect);
    });
    adTimeOutSelect.addEventListener('change', () => {
      syncTimeSelect(adTimeOutSelect, adTimeInSelect);
    });
  } else {
    adForm.classList.add('ad-form--disabled');
    filterForm.classList.add('map__filters--disabled');

    toggleElementsActivity(FiltersFormElements.select, status);
    toggleElementsActivity(FiltersFormElements.checkbox, status);
    toggleElementsActivity(adFormFieldsetElements, status);
  }
};
