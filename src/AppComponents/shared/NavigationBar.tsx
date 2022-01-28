/**
 * 
 */
import { useHistory } from 'react-router-dom';
import { FaHome, FaReact } from 'react-icons/fa';
//import { MdContactPage } from 'react-icons/md';
import { Navbar, SlidingMenu } from '../../UIElements';
import useDimension from '../../_app/useWindowDimension';

export default function NavigationBar() {
    const { isMobile } = useDimension();
    const history = useHistory();
    
    const navitems = [
        {
            name: ' Home',
            icon: () => <FaHome />,
            active: window.location.href.endsWith('/')
        },
        {
            name: ' Projects',
            icon: () => <FaReact />,
            active: window.location.href.endsWith('/projects')
        },
        /*
        {
            name: ' Contacts',
            icon: () => <MdContactPage />,
        },
        */
    ];

    const handleNavigation = (i :number, name :string) => {
        if(i === 0) history.push('/');
        if(i === 1) history.push('/projects');
    }

    return (
        <div style={{
            height:     '2.5em',
            position:   'fixed',
            top:         0,
            left:        0,
            width:      '100vw'
        }}>
            { !isMobile ?
                <Navbar
                    brandIconPath={''}
                    items={navitems}
                    callback={handleNavigation}
                />
                :
                <SlidingMenu
                    items={navitems}
                    callback={handleNavigation}
                />
            }
        </div>
    )
}
