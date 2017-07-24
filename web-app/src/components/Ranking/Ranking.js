import React from 'react';
import TransitiveNumber from 'react-transitive-number';

import './Ranking.css';

export const Ranking = ({ ranking }) => (
  <div className="container Ranking">
    <div className="row">
      <div className="col-lg-12">
        <h1>Ranking</h1>
      </div>
      <div className="col-lg-12">
        <table>
          <tbody>
            <tr>
              <th>Name</th><th>Points</th>
            </tr>
            {ranking.map((rank) => (
              <tr key={rank.id}>
                <td>{rank.name}</td>
                <td>
                  <TransitiveNumber>{rank.points}</TransitiveNumber>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Ranking;
