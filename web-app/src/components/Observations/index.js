import React from 'react';

import Title from '../Title';

class Observations extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: 'http://139.59.137.50/api/observations/',
            observations: [],
            id: '',
            observationIndex: 0,
        }
    }

    getNextObservation(){
        var observation = this.state.observations[this.state.observationIndex];
        this.setState({
            id: observation.id,
            observationIndex: observationIndex + 1,
        })
    }

    componentDidMount(){
        fetch(this.state.url).then(response => response.json())
            .then(json => this.setState({
                observations: json,
            })).then(this.getNextObservation)
    }

    render() {
        return (
            <div>
                <Title name="Observations" />
                <Picture
                    url={this.state.url + this.state.id +'/'}
                />
                <Votebox
                    id={this.state.pictureId}
                    url = {this.state.url}
                    goToNext = {this.getNextObservation()}
               />
            </div>
        );
    }
}

export default Observations;
