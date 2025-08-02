/*
    Return an hambuger icon thru the use of stylesheet (no vector icon)
*/
import React from 'react';
import './MenuIcon.scss';

interface propsReceive {
    isCrossed :boolean;
    onMenuIconPress?: (isCrossed :boolean) => void;
}

export default function MenuIcon(props :propsReceive) {
    function handleIconPressed() {
        props.onMenuIconPress && props.onMenuIconPress(!props.isCrossed);
    }

    return (
        <div id='menuicon' className={props.isCrossed ? 'change' : ''} onClick={handleIconPressed} >
            <div className="bar1 change"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}
