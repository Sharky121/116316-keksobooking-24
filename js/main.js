const getRandomInteger = (min = 0, max = 1) => {
  if (min < 0 || max < 0) {
    throw new Error('Числа должны быть положительными');
  }

  if (min === max) {
    return min;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.round(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min = 0, max = 1, floating = 1) => {
  if (min < 0 || max < 0) {
    throw new Error('Числа должны быть положительными');
  }

  if (min === max) {
    return min;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min + 1) + min).toFixed(floating);
};

getRandomInteger(2, 10);
getRandomFloat(1.5, 9.9);
