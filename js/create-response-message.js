import {isEscapeKey} from './utils.js';

const removeResponseMessage = (modalElement) => {
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      modalElement.remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  const onDocumentClick = () => {
    modalElement.remove();
    document.removeEventListener('keydown', onDocumentClick);
  };

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const createResponseMessage = (type) => {
  const responseMessageTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const responseMessage = responseMessageTemplate.cloneNode(true);

  document.body.appendChild(responseMessage);

  removeResponseMessage(responseMessage);

  if (type === 'error') {
    responseMessage.querySelector('.error__button');

    responseMessage.addEventListener('click', () => {
      responseMessage.remove();
    });
  }
};
