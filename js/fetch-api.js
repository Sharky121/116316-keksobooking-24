const GET_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://24.javascript.pages.academy/keksobooking';
const ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';

export const getData = (onSuccess, onError) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch((error) => {
      onError(error);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_MESSAGE);
      }
    })
    .catch(() => {
      onFail(ERROR_MESSAGE);
    });
};
