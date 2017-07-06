import React from 'react';
import classNames from '../../utils/classNames';

import './Icon.css';

const Icon = ({ name, spin, pulse, className, ...rest }) => (
  <span
    {...rest}
    className={classNames('Icon', 'fa', `fa-${name}`, spin && 'fa-spin', pulse && 'fa-pulse', className)}
  />
);

export default Icon;
