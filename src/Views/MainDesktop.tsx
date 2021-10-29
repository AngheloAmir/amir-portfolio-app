/*
    * TYPE
        Scene - A screen is a component that occupies a large part of the screen

    * DESCRIPTION
        Sets up the layout of the app during Desktop screens. This component should
        not return a content such as text, images... this things should be handled by the UI component

    * VISIBLE WHEN
        The user is at Home and the current screen is desktop size
*/
import React from 'react';
import './Styles/maindesktop.scss';

import { MainScreenPropsReceive } from './Common/MainScreenInterface';
import AboutProfile from './UI/AboutProfile';

export default function MainDesktop( props :MainScreenPropsReceive) {
    return (
        <div id='desktop-main'>
            <div id='sidebar'>
                <AboutProfile   
                    onclick={props.onClick}
                />
            </div>

            <div id='content'>
                <div className='navigationbar'>
                    <h2>this is the navigation bar</h2>
                </div>

                <div className='displayedcontent'>
                    <h2>this is the content here</h2>
                </div>
            </div> 
        </div>
    );
} 
