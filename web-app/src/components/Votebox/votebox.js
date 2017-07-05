/**
 * Created by bert on 5/07/17.
 */
import React from 'react';

//Components
import voteButton from '../VoteButton/voteButton'


const voteBox = (id) => {
    return (
        <div>
            <voteButton
                value= {1}
                id= {id}
            />
            <voteButton
                id= {id}
                value= {-1}
            />
        </div>
    )
};

export default voteBox;