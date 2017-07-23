const takeAtLeast = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, time);
  });
};

export default takeAtLeast;
