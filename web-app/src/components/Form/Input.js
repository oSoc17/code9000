import React from 'react';

import classNames from '../../utils/classNames';
import withInput from './withInput';

export const Input = withInput(({ text, placeholder, className, rules, icon, ...rest }) => {
  return (
    <input
      type="text"
      className={classNames('Form__Input', className, icon && 'Form__Input__Icon', icon && `Form__Input__Icon--${icon}`)}
      placeholder={placeholder}
      {...rest}
    />
  );
});
