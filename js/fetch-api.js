const ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';

const Url = {
  GET: 'https://24.javascript.pages.academy/keksobooking/data',
  POST: 'https://24.javascript.pages.academy/keksobooking',
};

export const getData = (onSuccess, onError) => {
  fetch(Url.GET)
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
    Url.POST,
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
