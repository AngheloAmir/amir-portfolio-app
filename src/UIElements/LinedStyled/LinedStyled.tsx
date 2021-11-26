/*
*/
import React from 'react';
import './LinedStyled.css';

export function LinedStyled({text, isHorizontal} :{text? :string, isHorizontal? :boolean}) {
    return (
        <div id='LinedStyled'>
            { isHorizontal && <div className='line'></div> }
            { text && <h3>{text}</h3> }
            { isHorizontal && <div className='line'></div> }
        </div>
    )
}
