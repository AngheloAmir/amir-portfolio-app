/*
*/
import React from 'react';
import './SlidingMenu.scss';

import MenuIcon from './MenuIcon';
import Drawer from './Drawer';

interface propsReceive {
    brandIconPath?  :string;
    items?          :Array<NavItem>;
}

export interface NavItem {
    name       :string;
    callback?  :() => void;
    active?    :boolean;
    subitem?   :Array<{
        name        :string;
        callback   :() => void;
    }>;
}

export function SlidingMenu(props :propsReceive) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    function handleMenuIconPress(isCrossed :boolean) {
        setDrawerOpen(isCrossed);
    }

    return (
        <div id='PongDesignSlidingMenu'>
            <span className='nav'>
                <MenuIcon
                    onMenuIconPress={handleMenuIconPress}
                />
                {
                    props.brandIconPath &&
                    <img className='img' src={props.brandIconPath} alt={props.brandIconPath}/>
                }
            </span>
            <div>
                <Drawer
                    isVisible={drawerOpen}
                    items={props.items}
                />
            </div>
        </div>
    );
}
