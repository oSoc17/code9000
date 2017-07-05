import React, { Component } from 'react';

import Title from '../Title'
import Picture from '.components/Picture/picture';
import Votebox from '.components/Votebox/votebox';

class Observations extends Component{
    constructor(props){
        super(props);
        this.state = {
            Url: 'http://139.59.137.50/api/observations/',
            pictureId: '',
            voteUrl: '',
        }
    }

    componentDidMount(){
        //TODO
    }

    render() {
        return (
            <div>
                <Title name="Observations" />
                <Picture
                    url={this.state.pictureUrl}
                />
                <Votebox
                    id={this.state.pictureId}
                    url={this.state.voteUrl}
                />
            </div>
        );
    }
}

export default Observations;