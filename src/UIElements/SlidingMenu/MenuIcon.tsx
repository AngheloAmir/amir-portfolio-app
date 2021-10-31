/*
    Return an hambuger icon thru the use of stylesheet (no vector icon)
*/
import React from 'react';
import './MenuIcon.scss';

interface propsReceive {
    onMenuIconPress?: (isCrossed :boolean) => void;
}

export default function MenuIcon(props :propsReceive) {
    const [cross, setCross] = React.useState(false);

    function handleIconPressed() {
        setCross(!cross);
        props.onMenuIconPress && props.onMenuIconPress(!cross);
    }

    return (
        <div id='menuicon' className={cross ? 'change' : ''} onClick={handleIconPressed} >
            <div className="bar1 change"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}