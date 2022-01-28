/**
    @TYPE
        Controller - A component that handles the functionality

    @DESCRIPTION
        It also handle the process (what happen when a button is clicked).

    @VISIBLE
        The user is at home page

    @NOTICE
        This component return statement should not contain any html tags and text/data.
        only providing the process and data from StateAPI
*/
import React from 'react';
import NavigationBar from './shared/NavigationBar';

export default function ProjectScene() {
    return (
        <React.Fragment>
            <NavigationBar />
        </React.Fragment>
    );
}
