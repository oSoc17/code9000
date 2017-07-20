import React from 'react';

import './Alerts.css';

export const Success = ({ title, body }) => {
  return (
    <div className="Alert Success">
      {title && (
        <div className="Success__Title">
          {title}
        </div>
      )}
      <div className="Success_Body">
        {body}
      </div>
    </div>
  );
};
