/*
    Return a navbar with hamburger icon and drawer
*/
import React from 'react';
import './SlidingMenu.scss';

import { NavigationUIProps } from '../lib/NavItem';
import MenuIcon from './MenuIcon';
import Drawer from './Drawer';

/**
 * Returns a Sliding Menu (Drawer) which includes a nav bar. The navbar position by default is static.
 * The parent element should provide the positioning such as fixed.
 * 
 * @props brandIconPath? :string;
 * @props callback       :(index :number, itemname :string) => void;
 * @props items          :[
 *  name: string, icon? :JSX.Element, active? :boolean, disabled? :boolean;
 *  subitem?: { name :string, icon?: JSX.Element, active? :boolean, disabled? :boolean }
 * ]
 * 
 * @example
 * import { FaBeer } from 'react-icons/fa';
    .....
        <SlidingMenu
            items={[
                {
                    name: 'item1',
                    icon: () => <FaBeer />
                },
                {
                    name: 'item2',
                    subitem: [
                        {
                            name: 'sub 1',
                            icon: () => <FaBeer />,
                            active: true
                        },
                        {
                            name: 'sub 2',
                            icon: () => <FaBeer />
                        }
                    ]
                }
            ]}
            callback={(i :number, name :string) => console.log('you pressed :' + name)}
        />
 */
export function SlidingMenu(props :NavigationUIProps) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [cross, setCross]           = React.useState(false);

    function handleMenuIconPress(isCrossed :boolean) {
        setDrawerOpen(isCrossed);
        setCross(isCrossed);
    }

    function handleNavItemPressed(index :number, name :string) {
        setDrawerOpen(!drawerOpen);
        setCross(false);
        props.callback(index, name);
    }

    return (
        <div id='PongDesignSlidingMenu'>
            <span className='nav'>
                <MenuIcon
                    onMenuIconPress={handleMenuIconPress}
                    isCrossed={cross}
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
                    callback={handleNavItemPressed}
                />
            </div>
        </div>
    );
}
