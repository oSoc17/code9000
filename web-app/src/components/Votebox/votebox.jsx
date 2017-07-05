/**
 * Created by bert on 5/07/17.
 */
import React, { Component } from 'react';

//Components
import voteButton from './components/VoteButton/voteButton'


const voteBox = (id) => {
    return (
        <div>
            <voteBox
                id: id
                value: '1'
            />
            <voteBox
                id: id
                value: '-1'
            />
        </div>
    )
}