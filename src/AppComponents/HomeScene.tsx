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
import HomeLayout from '../LayoutViews/HomeLayout';
import { FaBeer } from 'react-icons/fa';

import porfolioinfo from '../Database/porforlioinfo.json';

export default function HomeScene() {
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

    return (
        <React.Fragment>
            <HomeLayout
                navigationbar={{
                    navitems:       navitems,
                    brandIconPath:  './assets/test.png',
                    navcallback:    (i :number, name :string) => console.log('you pressed :' + name)
                }}
                introduction={{
                    title:      porfolioinfo.name,
                    alias:      porfolioinfo.title,
                    text:       porfolioinfo.introtext,
                    imagepath:  porfolioinfo.profile
                }}
                skills={porfolioinfo.skills}
                projects={porfolioinfo.projects}
            />
        </React.Fragment>
    );
}
