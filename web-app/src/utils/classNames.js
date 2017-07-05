const classNames = (...classes) => {
  return classes
    .filter(className => !!className)
    .join(' ');
};

export default classNames;
