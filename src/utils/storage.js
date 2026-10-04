export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);

  if (value === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch {
    return defaultValue;
  }
};
