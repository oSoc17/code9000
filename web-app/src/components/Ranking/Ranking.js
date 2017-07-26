import React from 'react';
import TransitiveNumber from 'react-transitive-number';

import crestMenu from '../../theme/icons/crest_menu.svg';

import './Ranking.css';

export const Ranking = ({ ranking, user }) => {

  const userRankIndex = ranking.findIndex((rankingUser) => rankingUser.id === user.id);

  const userRank = ranking[userRankIndex];

  console.log(userRank);

  return (
    <div className="container Ranking">
      <div className="Ranking__Line Ranking_Header">
        <table>
          <tbody>
            <tr>
              <th className="Ranking__Text__Light">Rank</th>
              <th className="Ranking__Text__Light Ranking__Text__Center">
                {user.avatar_url === undefined || user.avatar_url === null
                  ? <img className="Profile_Picture" src={crestMenu} alt="" />
                  : <img className="Profile_Picture" src={user.avatar_url} alt="" />
                }
              </th>
              <th className="Ranking__Text__Light Ranking__Text__Right">Points</th>
            </tr>
            <tr>
              <td>{userRankIndex + 1}</td>
              <td className="Ranking__Line__Name Ranking__Text__Center">{user.name}</td>
              <td className="Ranking__Text__Right">
                <TransitiveNumber>{userRank.points}</TransitiveNumber>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table>
        <tbody>
          {ranking.map((rank, index) => (
            <tr key={rank.id} className="Ranking__Line">
              <td>{index + 1}</td>
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
};

export default Ranking;
