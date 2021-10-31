/*
    * TYPE
        Layout - A layout 

    * DESCRIPTION
        Handle the appearance of the home page

    * VISIBLE WHEN
        The user is at home page

    **To modify, just remove the content of the return statement of HomeLayout
*/
import './layout/home.scss';
import { Navbar, SlidingMenu } from '../UIElements';
import useDimension from '../Utilities/useWindowDimension'

interface propsReceive {
    onButtonPress       :() => void;
    message             :string;
}

export default function HomeLayout( props :propsReceive ) {
    const { width } = useDimension();

    const navs = [
        {
            name: 'item 1',
            callback: () => alert('clicked'),
        },
        {
            name: 'item 2',
            subitem: [
                {
                    name: 'subitem1',
                    callback: () => alert('subitem 1 clicked'),
                },
                {
                    name: 'subitem1',
                    callback: () => alert('subitem 2 clicked'),
                },
                {
                    name: 'subitem3',
                    callback: () => alert('subitem 3 clicked'),
                }
            ]
        }
    ];

    return (
        <div id='Home'>
            <div className='sidebar'> I am a side bar</div>
            <div className='content'>
                <div className='navbar'>
                    { width > 578 ?
                        <Navbar
                            brandIconPath={'./assets/test.png'}
                            items={navs}
                        />
                        :
                        <SlidingMenu
                           
                            items={navs}
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
