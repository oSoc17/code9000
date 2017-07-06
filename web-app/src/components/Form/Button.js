import React from 'react';

import classNames from '../../utils/classNames';

import './Button.css';

export const Button = ({ children, circle, ...rest }) => {
  return (
    <button className={classNames('Form__Button', circle && 'Form__Button--circle')} {...rest}>
      {children}
    </button>
  );
};
