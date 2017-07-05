import React, { Component } from 'react';

import Picture from '.components/picture';
import Votebox from '.components/votebox';

class App extends Component {
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

export default App;
