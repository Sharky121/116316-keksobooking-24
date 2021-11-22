const ALERT_SHOW_TIME = 5000;

const AlertCssProperties = {
  Z_INDEX: '100',
  POSITION: 'absolute',
  LEFT: '0',
  TOP: '0',
  RIGHT: '0',
  PADDING: '10px 3px',
  FONT_SIZE: '30px',
  TEXT_ALIGN: 'center',
  BACKGROUND_COLOR: 'red',
};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = AlertCssProperties.Z_INDEX;
  alertContainer.style.position = AlertCssProperties.POSITION;
  alertContainer.style.left = AlertCssProperties.LEFT;
  alertContainer.style.top = AlertCssProperties.TOP;
  alertContainer.style.right = AlertCssProperties.RIGHT;
  alertContainer.style.padding = AlertCssProperties.PADDING;
  alertContainer.style.fontSize = AlertCssProperties.FONT_SIZE;
  alertContainer.style.textAlign = AlertCssProperties.TEXT_ALIGN;
  alertContainer.style.backgroundColor = AlertCssProperties.BACKGROUND_COLOR;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const getOptionValue = (select) => {
  const selectedOptionIndex = select.options.selectedIndex;

  return select.options[selectedOptionIndex].value;
};
