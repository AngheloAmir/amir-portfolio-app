/*
*/
import React from 'react';
import './BasicCard.scss';

import { BasicCardInterface } from '../';

export function BasicCard( props :BasicCardInterface) {
    return (
        <div id='PongDesignBasicCard'>
            { props.image && <img src={props.image} alt={props.image} />}
            <div className="information">
                { props.title && <h3>{props.title}</h3> }
                { props.text  && <p>{props.text}</p> }
                <div className='tags'>
                    { props.tags  && props.tags.map((item :string, i :number) => {
                        return (
                            <span key={i}>{item}</span>
                        )
                    })
                    }
                </div>
            </div>
            { props.btn && <button onClick={props.onpress}>{props.btn}</button> }
        </div>
    )
}
