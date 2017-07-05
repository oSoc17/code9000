/**
 * Created by bert on 5/07/17.
 */
import React, {Component} from 'react';

//Components
import voteButton from '../VoteButton/voteButton'


class voteBox extends Component{
    render(){
        return (
            <div>
                <voteButton
                    value= {1}
                    id= {this.props.id}
                    url={this.props.url}
                    goToNext={this.props.goToNext}
                />
                <voteButton
                    value= {-1}
                    id= {this.props.id}
                    url={this.props.url}
                    goToNext={this.props.goToNext}
                />
            </div>
        )

    }

}

export default voteBox;