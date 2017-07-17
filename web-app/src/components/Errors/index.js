import React from 'react';

import classNames from '../../utils/classNames';

import './Errors.css';

const Errors = ({ errors, className }) => {
  const keys = Object.keys(errors);

  if (keys.length > 1) {
    return (
      <div className={classNames('Errors', className)}>
        <ul className="Errors__List">
          {keys.map((key) => <li key={key}>{errors[key]}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className={classNames('Errors', className)}>
      
      {keys.map((key) => (
        <div>{errors[key]}</div>
      ))}
    </div>
  );
};

export default Errors;
