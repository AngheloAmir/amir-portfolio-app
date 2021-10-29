/*
    * TYPE
        Index - A component that does not display itself
        Controller - A component that handles the functionality

    * DESCRIPTION
        Decide what will be displayed based on the current user screen size.
        It also handle the process (what happen when a button is clicked).

    * VISIBLE WHEN
        The user is at Home
*/
import React from 'react';

//import { contextStore, StateAPI, Action } from '../StateAPI';

import MainJSON from '../Database/main.json';
import MainDesktop from '../Views/MainDesktop';
import MainMobile from '../Views/MainMobile';

import useWindowDimensions from '../Utilities/useWindowDimension';


export default function MainView() {
    //const { dispatch } :StateAPI = React.useContext(contextStore); 
    const { width } = useWindowDimensions();

    return (
        <React.Fragment>
            {
                width >= 578 ?
                    <MainDesktop
                        profileIconPath={MainJSON['profile-icon-path']}
                        aboutInfo={MainJSON['about-info']}
                    />
                :
                    <MainMobile
                        profileIconPath={MainJSON['profile-icon-path']}
                        aboutInfo={MainJSON['about-info']}
                    />
            }
        </React.Fragment>
    );
}
