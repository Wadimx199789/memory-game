export const shuffle = (array) => {
  const result = [...array];
  let m = result.length;

  while (m) {
    const i = Math.floor(Math.random() * m--);

    [result[m], result[i]] = [result[i], result[m]];
  }

  return result;
};
