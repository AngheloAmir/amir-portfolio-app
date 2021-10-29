/*
    * TYPE
        Fragment of MainDesktop.tsx or MainMobile.tsx

    * DESCRIPTION
        Display an profile icon with an about information

    * VISIBLE WHEN
        At the Main (Home) of the application. It appear in the left side (desktop) or
        in the middle of the screen (mobile)
*/
import React from 'react';
import '../Styles/sidebar.scss';

interface propsReceive {
    onclick: () => void;
}

export default function AboutProfile(props :propsReceive) {
    return (
        <div className='container'>
            THIS IS the AboutProfile.tsx UI
            <button onClick={props.onclick}>Click me to test StateAPI</button>
        </div>
    )
}
