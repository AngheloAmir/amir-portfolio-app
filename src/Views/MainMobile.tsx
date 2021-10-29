/*
    * TYPE
        Scene - A screen is a component that occupies a large part of the screen

    * DESCRIPTION
        Sets up the layout of the app during mobile screens. This component should
        not return a content such as text, images... this things should be handled by the UI component

    * VISIBLE WHEN
        The user is at Home and the current screen is mobile size
*/
import React from 'react';
import './layout/MainMobile.scss';

import { MainScreenPropsReceive } from './common/MainScreenInterface';
import AboutProfile from './UI/AboutProfile';

export default function MainMobile( props :MainScreenPropsReceive) {
    return (
        <div id='mobile-main'>
            <div id='navigation-bar'>
                this is the navigation bar
            </div>

            <div id='aboutinfo'>
                <AboutProfile
                    imagepath={props.profileIconPath}
                    text={props.aboutInfo}
                />
            </div>

            <div id='content'>
                this contains the content
            </div>
        </div>
    );
}
