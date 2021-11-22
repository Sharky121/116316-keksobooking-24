import {RADIX} from './consts.js';
import {getOptionValue} from './utils.js';
import {sendData} from './fetch-api.js';
import {createResponseMessage} from './create-response-message.js';
import {getImagePreview} from './image-loader.js';

const MAX_PRICE = 1000000;

const AVATAR_DEFAULT_IMAGE = 'img/muffin-grey.svg';

const ImagePreviwCssProperties = {
  WIDTH: '70',
  HEIGHT: '70',
};

const TitleLength = {
  MIN: 30,
  MAX: 100,
};
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

const filterFormSelects = filterForm.querySelectorAll('.map__filter');
const filterFormCheckboxes = filterForm.querySelectorAll('.map__checkbox');

const adFormFields = adForm.querySelectorAll('.ad-form__element');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adTypeSelect = adForm.querySelector('#type');
const adRoomSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');
const avatarInput = adForm.querySelector('#avatar');
const avatarPreviewImage = adForm.querySelector('.ad-form-header__preview img');
const offerPhotoUploadInput = adForm.querySelector('#images');
const offerPhotoPreviewContainer = adForm.querySelector('.ad-form__photo');

const validateAdTitle = () => {
  const valueLength = adTitleInput.value.length;

  if (valueLength < TitleLength.MIN) {
    adTitleInput.setCustomValidity(`Еще ${TitleLength.MIN - valueLength} симв.`);
  } else if (valueLength > TitleLength.MAX) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLength - TitleLength.MAX} симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }

  adTitleInput.reportValidity();
};

const isValidTypeToPrice = (priceInput) => {
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
    errorMessage ='Количество комнат не соответствуте количеству мест';
  }

  adRoomSelect.setCustomValidity(errorMessage);
  adRoomSelect.reportValidity();
};

const setTypeToPrice = () => {
  const priceValue = typeToPrice[getOptionValue(adTypeSelect)];

  adPriceInput.placeholder = priceValue;
  adPriceInput.min = priceValue;
};

const syncTimeSelect = (firstSelect, secondSelect) => {
  [...secondSelect.options].forEach((element, index) => {
    if (element.value === firstSelect.value) {
      secondSelect.options[index].selected = true;
    }
  });
};

const toggleElementsActivity = (elements, status) => {
  elements.forEach((element) => {
    element.disabled = status;
  });
};

const createPreviewImage = (parent) => {
  const img = document.createElement('img');

  img.setAttribute('width', ImagePreviwCssProperties.WIDTH);
  img.setAttribute('height', ImagePreviwCssProperties.HEIGHT);

  parent.innerHTML = '';
  parent.appendChild(img);

  return img;
};

const resetForms = () => {
  adForm.reset();
  filterForm.reset();
  avatarPreviewImage.src = AVATAR_DEFAULT_IMAGE;
  offerPhotoPreviewContainer.innerHTML = '';
};

export const setSubmitForm = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    isValidRoomToCapacity();

    if (evt.target.checkValidity()) {
      sendData(
        () => {
          createResponseMessage(ResponseMessage.SUCCESS);
          resetForms();
          cb();
        },
        () => {
          createResponseMessage(ResponseMessage.ERROR);
        },
        new FormData(adForm),
      );
    }
  });
};

export const setResetForm = (cb) => {
  adForm.addEventListener('reset', () => {
    resetForms();
    cb();
  });
};

export const isActiveForm = (status) => {
  if (status) {
    setTypeToPrice();

    adForm.classList.remove('ad-form--disabled');
    filterForm.classList.remove('map__filters--disabled');

    adTitleInput.addEventListener('input', () => {
      validateAdTitle();
    });
    adPriceInput.addEventListener('input', (evt) => {
      isValidTypeToPrice(evt.target);
    });
    adTypeSelect.addEventListener('change', () => {
      setTypeToPrice();
    });
    adTimeInSelect.addEventListener('change', () => {
      syncTimeSelect(adTimeInSelect, adTimeOutSelect);
    });
    adTimeOutSelect.addEventListener('change', () => {
      syncTimeSelect(adTimeOutSelect, adTimeInSelect);
    });
    adRoomSelect.addEventListener('change', () => {
      isValidRoomToCapacity();
    });
    adCapacitySelect.addEventListener('change', () => {
      isValidRoomToCapacity();
    });

    avatarInput.addEventListener('change', () => {
      getImagePreview(avatarInput, avatarPreviewImage);
    });

    offerPhotoUploadInput.addEventListener('change', () => {
      const offerPreviewImage = createPreviewImage(offerPhotoPreviewContainer);

      getImagePreview(offerPhotoUploadInput, offerPreviewImage);
    });
  } else {
    adForm.classList.add('ad-form--disabled');
    filterForm.classList.add('map__filters--disabled');

    toggleElementsActivity(filterFormSelects, status);
    toggleElementsActivity(filterFormCheckboxes, status);
    toggleElementsActivity(adFormFields, status);
  }
};

