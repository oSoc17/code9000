import React from 'react';

import classNames from '../../utils/classNames';
import withInput from './withInput';

export const Input = withInput(({ text, placeholder, className, rules, ...rest }) => {
  return (
    <input type="text" className={classNames('Form__Input', className)} placeholder={placeholder} {...rest} />
  )
});