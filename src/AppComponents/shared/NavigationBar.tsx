import { useNavigate } from 'react-router-dom';
import { Navbar, SlidingMenu } from '../../UIElements';
import useDimension from '../../Library/useWindowDimension';
import * as FaIcons from 'react-icons/fa';


export default function NavigationBar() {
    const { isMobile } = useDimension();
    const navigate     = useNavigate();   
    const FaHome       = FaIcons.FaHome  as React.ComponentType;
    const FaReact      = FaIcons.FaReact as React.ComponentType;
    
    const navitems = [
        {
            name: ' Home',
            icon:   FaHome,
            active: window.location.href.endsWith('/')
        },
        {
            name: ' Projects',
            icon:  FaReact,
            active: window.location.href.endsWith('/projects')
        }
    ];

    const handleNavigation = (i :number, name :string) => {
        if(i === 0) navigate('/');
        if(i === 1) navigate('/projects');
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
