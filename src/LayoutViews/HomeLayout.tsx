/**
    @TYPE
        Layout - A layout 

    @DESCRIPTION
        Handle the appearance of the home page

    @VISIBLE
        The user is at home page
*/
import './layout/home.scss';
import { Navbar, SlidingMenu, NavItem } from '../UIElements';
import useDimension from '../Utilities/useWindowDimension'

interface propsReceive {
    onButtonPress       :() => void;
    message             :string;
    brandIconPath       :string;
    navitems            :Array<NavItem>;
    navcallback         :(i :number, name :string) => void;
}

export default function HomeLayout( props :propsReceive ) {
    const { width } = useDimension();

    return (
        <div id='Home'>
            <div className='sidebar'> I am a side bar</div>
            <div className='content'>
                <div className='navbar'>
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
                </div>
                <div className='display'>
                    <h1>DISPLAY WAS HERE</h1>
                </div>
            </div>
        </div>
    );
}
