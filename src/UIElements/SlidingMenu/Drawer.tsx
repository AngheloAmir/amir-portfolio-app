/*
*/
import React from 'react';
import './Drawer.scss';

import { NavItem } from './SlidingMenu';

interface propsReceive {
    items?      :Array<NavItem>;
    isVisible   :boolean;
}

export default function Drawer(props :propsReceive) {
    return (
        <div id='PongDesignSlidingMenuDrawer' className={props.isVisible ? 'visible' : 'hidden'}>
            {
                props.items?.map((item :NavItem, index :number) => {
                    return (
                        <div key={index}>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
    )
}