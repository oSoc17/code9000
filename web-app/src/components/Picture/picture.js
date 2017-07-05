/**
 * Created by bert on 5/07/17.
 */
import React, { Component } from 'react';

class Picture extends Component{
    constructor(props){
        super(props)
        this.state = {
            picture: ''
        }
    }
    componentDidMount(){
        fetch(this.props.url + 'picture')
            .then(pic => this.setState({
                picture: pic
            }))
    }
    render(){
        return (
            <div>
                <image
                    src={this.state.picture}
                >
                </image>
                <p>
                    {this.props.url + 'picture'}
                </p>
            </div>

        )
    }
}

export default Picture;