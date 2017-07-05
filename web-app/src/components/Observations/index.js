import React from 'react';


import Title from '../Title'
import Picture from '../Picture/picture';
import Votebox from '../Votebox/votebox';

class Observations extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: 'https://develop.birds.today/api/observations/',
            observations: [],
            id: '',
            observationIndex: 0,
        };
        this.getNextObservation = this.getNextObservation.bind(this)
        this.getObservations = this.getObservations.bind(this)
    }

    getNextObservation(){
        if(this.state.observationIndex < this.state.observations.length){
            var observation = this.state.observations[this.state.observationIndex];
            this.setState({
                id: observation.id,
                observationIndex: this.state.observationIndex + 1,
            })
        } else {
            this.setState({
                observationIndex: 0
            });
            this.getObservations()
        }
    }

    getObservations(){
        fetch(this.state.url)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    observations: json,
                });
            }).then( () => this.getNextObservation() );
    }

    componentDidMount(){
        this.getObservations()
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
                />
            </div>
        );
    }
}
export default Observations;