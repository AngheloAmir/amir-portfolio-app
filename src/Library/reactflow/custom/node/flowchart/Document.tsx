import {  useState } from 'react';
import { NodeParam } from '../../../core';
import BaseNode      from '../BaseNode';
import { useThemeMode } from 'flowbite-react';
import NodeBorderColor  from '../style/_color';

export default function Document( nodeData :NodeParam  ) {
    return (
        <BaseNode
            nodeData={nodeData}
            keepAspectRatioOfTheResize={true}
        >
             <svg className="w-full h-full" viewBox="10 11 42 42" >
                <path
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    className={ NodeBorderColor.border }
                    //fill={onPlacement ? NodeBorderColor.placementbg : `${theme.mode === 'dark' ? NodeBorderColor.darkbg : NodeBorderColor.bg }` } 
                    d="M1.5 15.5h60v29.376c-30-12.006-30 12.346-60-2.129z"
                />
            </svg>

            <div className="text-black dark:text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                { nodeData.data.label }
            </div>
        </BaseNode>
    );
}

