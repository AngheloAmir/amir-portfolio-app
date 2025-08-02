import { NodeParam } from '../../../core';
import BaseNode      from '../BaseNode';
import { useThemeMode }  from 'flowbite-react';
import NodeBorderColor  from '../style/_color';

export default function Diamond( nodeData :NodeParam  ) {
    const theme = useThemeMode();

    return (
        <BaseNode
            nodeData={nodeData}
        >
            <svg viewBox="1.3 1.3 21.4 21.4"  className="w-full h-full">
                <path 
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    className={ NodeBorderColor.border }
                    //fill={onPlacement ? `${theme.mode === 'dark' ? NodeBorderColor.darkbg : NodeBorderColor.bg }` } 
                    d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/>
            </svg>

            <div className="text-black dark:text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                { nodeData.data.label }
            </div>
        </BaseNode>
    );
}

