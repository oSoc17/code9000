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

export const FacebookButton = ({ children, ...rest }) => {
  return (
    <button className={classNames('Form__Button', 'Form__FacebookButton')} {...rest}>
      <div className="Form__FacebookButton__Wrapper">
        <div className="Form__FacebookButton__Item Form__FacebookButton__Logo" />
        <div className="Form__FacebookButton__Item Form__FacebookButton__Children">{children}</div>
      </div>
    </button>
  );
};
