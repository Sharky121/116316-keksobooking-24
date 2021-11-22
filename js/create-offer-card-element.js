const typesToTitle = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const validateOfferCardData = (data, element, templateString = data) => {
  data
    ? element.textContent = templateString
    : element.remove();
};

const createPhotos = (photos, photoList) => {
  if (photos === undefined || photos.length === 0) {
    photoList.remove();

    return;
  }

  const photoTemplate = photoList.querySelector('.popup__photo');
  const photoListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoImage = photoTemplate.cloneNode();

    photoImage.src = photo;
    photoListFragment.appendChild(photoImage);
  });

  photoList.innerHTML = '';
  photoList.appendChild(photoListFragment);
};

const createFeatures = (features, featuresList) => {
  if (features === undefined || features.length === 0) {
    featuresList.remove();

    return;
  }

  const featureItems = featuresList.querySelectorAll('.popup__feature');
  const classModifiers = features.map((feature) => `popup__feature--${feature}`);

  featureItems.forEach((featureItem) => {
    const classModifier = featureItem.classList[1];

    if (!classModifiers.includes(classModifier)) {
      featureItem.remove();
    }
  });
};

export const createCustomPopup = (offer) => {
  const {
    author: {avatar},
    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    },
  } = offer;

  const offerCardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
  const offerCardElement = offerCardTemplateElement.cloneNode(true);

  const OfferCardElements = {
    avatar: offerCardElement.querySelector('.popup__avatar'),
    title: offerCardElement.querySelector('.popup__title'),
    address: offerCardElement.querySelector('.popup__text--address'),
    price: offerCardElement.querySelector('.popup__text--price'),
    type: offerCardElement.querySelector('.popup__type'),
    capacity: offerCardElement.querySelector('.popup__text--capacity'),
    time: offerCardElement.querySelector('.popup__text--time'),
    description: offerCardElement.querySelector('.popup__description'),
    photosList: offerCardElement.querySelector('.popup__photos'),
    featuresList: offerCardElement.querySelector('.popup__features'),
  };

  validateOfferCardData(avatar, OfferCardElements.avatar);
  validateOfferCardData(title, OfferCardElements.title);
  validateOfferCardData(address, OfferCardElements.address);
  validateOfferCardData(price, OfferCardElements.price, `${price} ₽/ночь`);
  validateOfferCardData(typesToTitle[type], OfferCardElements.type);
  validateOfferCardData(description, OfferCardElements.description);
  validateOfferCardData(rooms && guests, OfferCardElements.capacity, `${rooms} комнаты для ${guests} гостей`);
  validateOfferCardData(checkin && checkout, OfferCardElements.time, `Заезд после ${checkin}, выезд до ${checkout}`);

  createPhotos(photos, OfferCardElements.photosList);
  createFeatures(features, OfferCardElements.featuresList);

  return offerCardElement;
};
