/*
*/
import React from 'react';
import './BasicCard.scss';

import { BasicCardInterface } from '../';

export function BasicCard( props :BasicCardInterface) {
    return (
        <div id='PongDesignBasicCard'>
            { props.image && <img src={props.image} alt={props.image} />}
            { props.title && <h3>{props.title}</h3> }
            { props.text  && <p>{props.text}</p> }
        </div>
    )
}
