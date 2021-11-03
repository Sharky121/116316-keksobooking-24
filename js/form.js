const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

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

const Forms = {
  ad: document.querySelector('.ad-form'),
  filter: document.querySelector('.map__filters'),
};
const FiltersFormElements = {
  select: Forms.filter.querySelectorAll('.map__filter'),
  checkbox: Forms.filter.querySelectorAll('.map__checkbox'),
};

const adFormFieldsetElements = Forms.ad.querySelectorAll('.ad-form__element');
const adTitleInput = Forms.ad.querySelector('#title');
const adPriceInput = Forms.ad.querySelector('#price');
const adTypeSelect = Forms.ad.querySelector('#type');
const adRoomSelect = Forms.ad.querySelector('#room_number');
const adCapacitySelect = Forms.ad.querySelector('#capacity');
const adTimeInSelect = Forms.ad.querySelector('#timein');
const adTimeOutSelect = Forms.ad.querySelector('#timeout');
const adSubmitButton = Forms.ad.querySelector('.ad-form__submit');

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

const validateAdPrice = () => {
  const value = adPriceInput.value;
  const minValue = adPriceInput.min ;

  if (value > MAX_PRICE) {
    adPriceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE}`);
  } else if (value < minValue) {
    adPriceInput.setCustomValidity(`Цена не должна быть меньше ${minValue}`);
  } else {
    adPriceInput.setCustomValidity('');
  }

  adPriceInput.reportValidity();
};

const validateRoomToCapacity = () => {
  const roomValue = getOptionValue(adRoomSelect);
  const capacityValue = getOptionValue(adCapacitySelect);
  const isRoomToCapacity = roomsToCapacity[roomValue].includes(parseInt(capacityValue, 10));

  if (!isRoomToCapacity) {
    adRoomSelect.setCustomValidity('Количество комнат не соответствуте количеству мест');
  } else {
    adRoomSelect.setCustomValidity('');
  }

  adRoomSelect.reportValidity();
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

const disablePage = (status) => {
  if (status) {
    Forms.ad.classList.add('ad-form--disabled');
    Forms.filter.classList.add('map__filters--disabled');
  } else {
    Forms.ad.classList.remove('ad-form--disabled');
    Forms.filter.classList.remove('map__filters--disabled');
  }

  toggleElementsActivity(FiltersFormElements.select, status);
  toggleElementsActivity(FiltersFormElements.checkbox, status);
  toggleElementsActivity(adFormFieldsetElements, status);
};

adTitleInput.addEventListener('input', () => {
  validateAdTitle();
});

adPriceInput.addEventListener('input', () => {
  validateAdPrice();
});

adTypeSelect.addEventListener('change', () => {
  const priceValue = typeToPrice[getOptionValue(adTypeSelect)];

  adPriceInput.placeholder = priceValue;
  adPriceInput.min = priceValue;
});

adTimeInSelect.addEventListener('change', () => {
  syncTimeSelect(adTimeInSelect, adTimeOutSelect);
});

adTimeOutSelect.addEventListener('change', () => {
  syncTimeSelect(adTimeOutSelect, adTimeInSelect);
});

adSubmitButton.addEventListener('click', () => {
  validateRoomToCapacity();
});

disablePage(false);
