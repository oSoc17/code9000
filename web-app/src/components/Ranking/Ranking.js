import React from 'react';
import TransitiveNumber from 'react-transitive-number';

import crestMenu from '../../theme/icons/crest_menu.svg';

import './Ranking.css';

export const Ranking = ({ ranking, user }) => {
  const userRankIndex = ranking.findIndex((rankingUser) => rankingUser.id === user.id);
  const userRank = ranking[userRankIndex];

  return (
    <div className="container Ranking">
      <div className="Ranking__Header">
        <div className="Ranking__Header__Rank">
          <div>Rank</div>
          <div>{userRankIndex + 1}</div>
        </div>
        <div className="Ranking__Header__Profile">
          {user.avatar_url === undefined || user.avatar_url === null
            ? <img className="Profile__Header__Picture" src={crestMenu} alt="" />
            : <img className="Profile__Header__Picture" src={user.avatar_url} alt="" />
          }
          <div>{user.name}</div>
        </div>
        <div className="Ranking__Header__Points">
          <div>Points</div>
          <div>{userRank.points}</div>
        </div>
      </div>
      {ranking.map((rank, index) => (
        <div key={rank.id} className="Ranking__Line">
          <div className="Ranking__Line__Position">
            {index + 1}
          </div>
          <div className="Ranking__Line__Name">
            {rank.name}
          </div>
          <div className="Ranking__Line__Points">
            <TransitiveNumber>{rank.points}</TransitiveNumber>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ranking;
