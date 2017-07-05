/**
 * Created by bert on 5/07/17.
 */
import React, {Component} from 'react';

class voteButton extends Component {
    constructor(props){
        super(props)
    }

    vote(){
        fetch(this.props.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                confirmation: {
                    id: this.props.id,
                    value: this.props.value,
                }
            })
        }).then(this.props.goToNext())
    }

    render(){
        return(
            <button onClick={() => this.vote()}></button>
        )
    }
}