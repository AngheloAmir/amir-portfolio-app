/**
    @TYPE
        Layout - A layout 

    @DESCRIPTION
        Handle the appearance of the home page

    @VISIBLE
        The user is at home page
*/
import './layout/home.scss';
import NavigationBar, { NavigationBarPropsInterface } from './components/NavigationBar';
import IntroductionContents from './components/IntroductionContents';

interface propsReceive {
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
    navigationbar :NavigationBarPropsInterface;
}

export default function HomeLayout( props :propsReceive ) {
    return (
        <div id='Home'>
            <div className='navbar'>
                <NavigationBar
                    { ...props.navigationbar }
                />
            </div>

            <div className='introduction'>
                <IntroductionContents />
            </div>
        </div>
    );
}
