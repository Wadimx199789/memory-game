export const createElement = (tag, { dataset = {}, ...options } = {}) => {
  const element = document.createElement(tag);
  Object.assign(element, options);
  Object.assign(element.dataset, dataset);
  return element;
};
