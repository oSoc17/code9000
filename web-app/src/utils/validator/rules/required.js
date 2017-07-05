export const rule = (input = '') => {
  return `${input}`.trim() !== '';
};

export const message = 'This field is required';