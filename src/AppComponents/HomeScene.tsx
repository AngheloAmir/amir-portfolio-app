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
                    title:'Anghelo Amir',
                    alias: 'Web developer',
                    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias, ut deserunt fuga enim fugiat dolore. Rem reprehenderit consequuntur totam distinctio veniam ad voluptate mollitia culpa. Quas voluptates architecto quasi consequatur.',
                    imagepath: 'logo192.png'
                }}
            />
        </React.Fragment>
    );
}
