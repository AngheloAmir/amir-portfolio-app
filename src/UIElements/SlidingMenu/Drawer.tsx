/*
*/
import React from 'react';
import './Drawer.scss';

import { NavItem, NavNameAndIcon } from '../_lib/NavItem';

interface propsReceive {
    items?      :Array<NavItem>;
    isVisible   :boolean;
    callback    :(index :number, itemname :string) => void;   
}

export default function Drawer(props :propsReceive) {
    return (
        <div id='PongDesignSlidingMenuDrawer' className={props.isVisible ? 'visible' : 'hidden'}>
            {
                props.items?.map((item :NavItem, index :number) => {
                    return (
                        <div key={index}
                            className={item.active ? 'active' : item.disabled ? 'disabled' : 'item'}
                            onClick={() => {
                                if(item.active || item.disabled)
                                    return;
                                if(!item.subitem || item.subitem.length <= 0 )
                                    props.callback(index, item.name)
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px'}}>
                                <span className='icon'>
                                    { item.icon && React.createElement(item.icon, {})}
                                </span>
                                <span>
                                    { item.name }
                                </span>
                            </div>
                            <SubItem
                                item={item}
                                index={index}
                                cb={(n :string) =>{
                                    props.callback(index, n)
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

function SubItem( props :{item :NavItem, index :number, cb: (name :string) => void}) {
    if(!props.item.subitem || props.item.subitem.length <= 0 )
        return <span></span>

    return (
        <div className='subitemcontainer'>
            {props.item.subitem.map((subitem :NavNameAndIcon, index :number) => {
                return (
                    <div
                        key={index}
                        onClick={() => props.cb(subitem.name)}
                    >
                        <span className='icon'>
                            { subitem.icon && React.createElement(subitem.icon, {})}
                        </span>
                        <span>
                            { subitem.name }
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
