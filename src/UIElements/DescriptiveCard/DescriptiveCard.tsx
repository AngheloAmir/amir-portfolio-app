/*
*/
import './DescriptiveCard.scss';
import React from 'react';

import { DescriptiveCardInterface } from  '../_lib/DescriptiveCard';

export function DescriptiveCard(props :DescriptiveCardInterface) {
    return (
        <div id='PongDesignDescriptiveCard'>
                { props.imagepath &&
                    <div className='myprofile'>
                        <img src={props.imagepath} alt={props.imagepath} />
                    </div>
                }
                

                <div className='introtext'>
                    <h1>{props.title}</h1>
                    <h3>{props.alias}</h3>
                    <p>{props.text}</p>
                </div>
        </div>
    )
}
