/*
*/
import './DescriptiveCard.scss';
import React from 'react';

import { DescriptiveCardInterface } from  '../_lib/DescriptiveCard';

/**
 * @example
 * imagepath?       :string;
    title?          :string;
    alias?          :string;
    text?           :string;
    isHorizontal?   :boolean;
 */
export function DescriptiveCard(props :DescriptiveCardInterface) {
    const containerClass :string = props.isHorizontal ? 'horizontal' : 'vertical';

    return (
        <div id='PongDesignDescriptiveCard' className={containerClass}>
                { props.imagepath &&
                    <div className='imagecontainer'>
                        <img src={props.imagepath} alt={props.imagepath} />
                    </div>
                }
                <div className='text'>
                    <h1>{props.title}</h1>
                    <h3>{props.alias}</h3>
                    <p>{props.text}</p>
                </div>
        </div>
    )
}
