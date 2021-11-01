/*
    A resuable (not app specific component) navbar.
    The parent element should provide the position: fixed style.

    <Navbar
        brandIconPath={'./assets/test.png'}
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
                        icon: () => <FaBeer />
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
import './Navbar.scss';
import { NavigationUIProps, NavItem } from '../lib/NavItem';
import Subitem from './Subitem';

/**
 * The navbar position by default is static.
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
        <Navbar
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
export function Navbar(props :NavigationUIProps) {
    return (
        <div id='PongDesignNavbar'>
            { props.brandIconPath && <img className='img' src={props.brandIconPath} alt={props.brandIconPath}/> }
            <span className='navitemscontainer'>
            { props.items && props.items.map( (item :NavItem,  index :number) => {
                return <Subitem
                    key={index}
                    item={item}
                    index={index}
                    callback={props.callback}
                />
            })}
            </span>
        </div>
    );
}
