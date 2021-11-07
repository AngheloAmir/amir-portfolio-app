/*
    A resuable (not app specific component) navbar.
    The parent element should provide the position: fixed style.                 
*/
import './Navbar.scss';
import { NavItem } from '../_lib/NavItem';

interface propsReceive {
    item        :NavItem;
    index       :number;
    callback    :(index :number, itemname :string) => void;  
}

export default function Subitem(props :propsReceive) {
    if(props.item.subitem) 
        return (
            <span key={props.index} className='item'>
            { props.item.name }
                <div className='dropdown'>
                    <div className='invisiblebar'></div>
                    {
                        props.item.subitem.map((subitem :any, i :number) => {
                            return (
                                <div key={i}
                                    onClick={()=> props.callback(props.index, subitem.name)}
                                    className='subitem'
                                >
                                     <span className='icon'>
                                        { subitem.icon && subitem.icon() }
                                    </span>
                                    <span>
                                        { subitem.name }
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </span>
        );
    else
        return (
            <span key={props.index}
                className={props.item.active ? 'active' : props.item.disabled ? 'disabled' : 'item'}
                onClick={() => {
                    if( !props.item.active && !props.item.disabled )
                        props.callback(props.index, props.item.name);
                }}>
                 <span className='icon'>
                    { props.item.icon && props.item.icon() }
                </span>
                <span>
                    { props.item.name }
                </span>
            </span>
        );
}
