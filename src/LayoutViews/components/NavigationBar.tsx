/**
    @TYPE
        Fragment - A fragment of HomeLayout.tsx

    @DESCRIPTION
        Handle the appearance of the navigation bar responsively

    @VISIBLE
        It appears in the top of the screen
*/
import React from 'react';
import { Navbar, SlidingMenu, NavItem } from '../../UIElements';
import useDimension from '../../Utilities/useWindowDimension'

/**
 * Contains navigation items, callbacks and path of the image to brand icon
 * @example
 * brandIconPath :string;
   navitems :Array<{
       name :string, 
       icon? :() => JSX.Element, 
       active? :boolean, 
       disabled? :boolean, 
       subitem :Array<NavItems>
    }>;
   navcallback :(i :number, name :string) => void;
 */
export interface NavigationBarPropsInterface {
    brandIconPath       :string;
    navitems            :Array<NavItem>;
    navcallback         :(i :number, name :string) => void;
}

export default function NavigationBar(props :NavigationBarPropsInterface) {
    const { width } = useDimension();

    return (
        <React.Fragment>
           { width > 578 ?
                <Navbar
                    brandIconPath={props.brandIconPath}
                    items={props.navitems}
                    callback={props.navcallback}
                />
                :
                <SlidingMenu
                    items={props.navitems}
                    callback={props.navcallback}
                />
        }
        </React.Fragment>
    );
}
