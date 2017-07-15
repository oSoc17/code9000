import React from 'react';

import Icon from '../Icon';

import classNames from '../../utils/classNames';

import './Button.css';

export const Button = ({ children, className, circle, light, ...rest }) => {
  return (
    <button className={classNames('Form__Button', className, circle && 'Form__Button--circle', light && 'Form__Button--light')} {...rest}>
      {children}
    </button>
  );
};

export const FacebookButton = ({ children, ...rest }) => {
  return (
    <button className={classNames('Form__Button', 'Form__FacebookButton')} {...rest}>
      <div className="Form__FacebookButton__Wrapper">
        <Icon name="facebook" className="Form__FacebookButton__Item Form__FacebookButton__Logo" />
        <div className="Form__FacebookButton__Item Form__FacebookButton__Children">{children}</div>
      </div>
    </button>
  );
};
