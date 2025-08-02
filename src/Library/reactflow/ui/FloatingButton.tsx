import React from "react";

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: any;
    tooltip?: string;
    classNamePositioning?  :string;
    classTooltipPosition?  :string;
    isActive?: boolean;
}

export default function FloatingButton( props :Props) {
    return (
    <div className={`select-none z-20 absolute w-9 h-9 ${props.isActive ? 'bg-blue-200 dark:bg-blue-900' : ''} hover:bg-blue-200 dark:hover:bg-blue-900 ${props.classNamePositioning} rounded`} onClick={props.onClick}>
    <div className='w-full h-full tooltip'>
        { props.icon && React.cloneElement(props.icon, { className: 'dark:opacity-80 hover:opacity-100 w-full h-full p-1 text-gray-400 dark:text-gray-600' })}
        <div 
            className={`text-sm tooltipdiv w-28 text-center rounded-md py-1 shadow-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white ${props.classTooltipPosition} `} >
            { props.tooltip }
        </div>
    </div>

    <div className='relative'>
            
    </div>
    </div>
    )
}
//top-0 right-14
