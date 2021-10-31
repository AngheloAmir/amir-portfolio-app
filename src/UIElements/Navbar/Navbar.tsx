/*
    A resuable (not app specific component) navbar.
    The parent element should provide the position: fixed style.

EXAMPLE============
    function component() {
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
            <div style={{height: 3rem, position: fixed}}>
                <Navbar
                    brandIconPath={'./assets/test.png'}
                     items={navs}
                />
            </div>
        )
    }                      
*/
import './Navbar.scss';

interface propsReceive {
    brandIconPath?  :string;
    items?          :Array<NavItem>;
}

interface NavItem {
    name       :string;
    callback?  :() => void;
    active?    :boolean;
    subitem?   :Array<{
        name        :string;
        callback   :() => void;
    }>;
}

export function Navbar(props :propsReceive) {
    return (
        <div id='PongDesignNavbar'>
            { props.brandIconPath && <img className='img' src={props.brandIconPath} alt={props.brandIconPath}/> }
            <span className='navitemscontainer'>
            { props.items && props.items.map( (item :NavItem,  index :number) => {
                if(item.subitem) 
                    return (
                        <span key={index} className='item'>
                        { item.name }
                            <div className='dropdown'>
                                {
                                    item.subitem.map((subitem :any, i :number) => {
                                        return (
                                            <div key={i} onClick={subitem.callback} className='subitem'>
                                                { subitem.name }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </span>
                    );
                else
                    return (
                        <span key={index}
                            className='item'
                            onClick={item.callback}>
                            { item.name }
                        </span>
                    );
            })}
            </span>
        </div>
    );
}
