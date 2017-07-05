/**
 * Created by bert on 5/07/17.
 */
import React, { Component } from 'react';

class Picture extends Component{
    
    render(){
        return (
            <image
                src={this.props.url + 'picture'}>
            </image>
        )
    }
}

export default Picture;