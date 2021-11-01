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

import { contextStore, StateAPI, Action } from '../StateAPI';
import HomeLayout from '../LayoutViews/HomeLayout';
import homejson from '../Database/home.json';

import { FaBeer } from 'react-icons/fa';

export default function HomeScene() {
    const { state, dispatch } :StateAPI = React.useContext(contextStore); 

    const navitems = [
        {
            name: 'item1',
            icon: () => <FaBeer />,
        },
        {
            name: 'item2',
            icon: () => <FaBeer />,
            active: true
        },
        {
            name: 'item3',
            icon: () => <FaBeer />,
            disabled: true
        },
        {
            name: 'item4',
            subitem: [
                {
                    name: 'sub 1',
                    icon: () => <FaBeer />
                },
                {
                    name: 'sub 2',
                    icon: () => <FaBeer />
                }
            ]
        } 
    ];

    function handleOnPress() {
        alert('The state text was: ' + state.text);
        dispatch( Action.Test() );
    }

    return (
        <React.Fragment>
            <HomeLayout
                onButtonPress={handleOnPress}
                message={homejson.text}
                navitems={navitems}
                brandIconPath='./assets/test.png'
                navcallback={(i :number, name :string) => console.log('you pressed :' + name)}
            />
        </React.Fragment>
    );
}
