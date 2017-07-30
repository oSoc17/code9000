import React from 'react';
import TransitiveNumber from 'react-transitive-number';

import classNames from '../../utils/classNames';

import './Ranking.css';

import crestMenu from '../../theme/icons/crest_menu.svg';
import first from '../../theme/icons/first.svg';
import second from '../../theme/icons/second.svg';
import third from '../../theme/icons/third.svg';

const RankingRank = ({ index }) => {
  const isTop = index <= 3;

  return (
    <div className="Ranking__Line__Rank">
      {index === 1 && <img src={first} alt="First" />}
      {index === 2 && <img src={second} alt="Second" />}
      {index === 3 && <img src={third} alt="Third" />}
      {!isTop && <span>{index}</span>}
    </div>
  );
};

export const Ranking = ({ ranking, user }) => {
  const userRankIndex = ranking.findIndex((rankingUser) => rankingUser.id === user.id);
  const userRank = ranking[userRankIndex];

  return (
    <div className="Ranking">
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
          <div>You</div>
        </div>
        <div className="Ranking__Header__Points">
          <div>Points</div>
          <div>{userRank.points}</div>
        </div>
      </div>
      {ranking.map((rank, index) => (
        <div className={classNames('Ranking__Line', user.id === rank.id && 'Ranking__Line__Rank--active')} key={rank.id} >
          <RankingRank index={index + 1} />
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
