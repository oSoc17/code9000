import React, { Component } from 'react';
import _ from 'lodash';
import Draggable from 'react-draggable';

import Title from '../Title';
import { Button } from '../Form';

import api from '../../utils/api';

import polaroid from '../../theme/icons/polaroid.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';

import './Observations.css';

class Observations extends Component {

  vote(value) {
    const observation = _.head(this.props.observations);
    const newObservations = [..._.drop(this.props.observations)];
    api.post('/votes', {
      body: {
        observation_id: observation.id,
        value,
      },
    }).then(() => {
      this.props.loadObservations(newObservations);

      if (newObservations.length < 6) {
        this.fetch();
      }
    });
  }

  fetch() {
    api.get('/auth/observations').then(({ data: paginationModel }) => {
      this.props.loadObservations(paginationModel.data);
    });
  }

  render() {
    const observation = _.head(this.props.observations);
    const ButtonStyle = {
      width: 120
    }
    return (
      <div>
        <Title name="Observations" />
        {observation && (
          <div className="Observations">
            <div className="Observations__Polaroid">
              <img src={polaroid} alt="Polaroid" />
            </div>
              <Draggable
                  onDrag={(e) => {
                    // Betere code: Positie als state opslaan, knoppen objecten maken die positie overerven
                    document.getElementById("thrash").width = 75 + (document.getElementsByClassName("Polaroid")[0].getBoundingClientRect().left - document.getElementsByClassName("Observations")[0].getBoundingClientRect().left)/5
                    document.getElementById("collection").width = 75 - (document.getElementsByClassName("Polaroid")[0].getBoundingClientRect().left - document.getElementsByClassName("Observations")[0].getBoundingClientRect().left)/5
                    document.getElementsByClassName("Observations__Polaroid")[0].width += 5 // WHY THE FUCK WERKT DIT NIET
                  }
                }
              >
                <div className="Polaroid">
                  <img
                    className="Polaroid__Inner"
                    src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`}
                    alt="Observation"
                  />
                  <div className="Polaroid__Footer" />
                </div>
              </Draggable>
            <div className="Observations__Buttons">
              <Button style={ButtonStyle}  onClick={() => this.vote(1)} className="Form__Button--clean"  >
                <img className="Observations__Button" src={book} alt="Add to collection" id="collection" />
              </Button>
              <Button style={ButtonStyle} onClick={() => this.vote(-1)} className="Form__Button--clean">
                <img  className="Observations__Button" src={trash} alt="Add to trash" id="thrash" />
              </Button>
            </div>
          </div>
        )}

        {observation === undefined && (
          <p>No observations left</p>
        )}
      </div>
    );
  }
}
export default Observations;
