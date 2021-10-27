const toggleElementsActivity = (elements, status) => {
  elements.forEach((element) => {
    element.disabled = status;
  });
};

export const disablePage = (status) => {
  const Forms = {
    ad: document.querySelector('.ad-form'),
    filter: document.querySelector('.map__filters'),
  };
  const FiltersFormElements = {
    select: Forms.filter.querySelectorAll('.map__filter'),
    checkbox: Forms.filter.querySelectorAll('.map__checkbox'),
  };
  const adFormFieldsetElements = Forms.ad.querySelectorAll('.ad-form__element');

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
