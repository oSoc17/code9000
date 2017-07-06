import React from 'react';

export const Button = ({ children, ...rest }) => {
  return (
    <div className="Form__Button">
      <button {...rest}>
        {children}
      </button>
    </div>
  );
};
