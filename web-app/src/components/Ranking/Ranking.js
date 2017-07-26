import React from 'react';
import TransitiveNumber from 'react-transitive-number';

import './Ranking.css';

export const Ranking = ({ ranking }) => (
  <div className="container Ranking">
    <div className="Ranking__Line Ranking_Header">
      <table>
        <tbody>
          <tr>
            <th className="Ranking__Text__Light">Rank</th>
            <th className="Ranking__Text__Light Ranking__Text__Center"><img className="Profile_Picture" src="#" alt="Profile picture" /></th>
            <th className="Ranking__Text__Light Ranking__Text__Right">Points</th>
          </tr>
          <tr>
            <td>1</td>
            <td className="Ranking__Line__Name Ranking__Text__Center">Name</td>
            <td className="Ranking__Text__Right">
              <TransitiveNumber>100</TransitiveNumber>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table>
      <tbody>
        {ranking.map((rank, index) => (
          <tr key={rank.id} className="Ranking__Line">
            <td>{index+1}</td>
            <td className="Ranking__Line__Name">{rank.name}</td>
            <td>
              <TransitiveNumber>{rank.points}</TransitiveNumber>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Ranking;
