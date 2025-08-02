import { NodeParam } from '../../../core';
import BaseNode      from '../BaseNode';
import NodeBorderColor  from '../style/_color';

export default function PredefProcess( nodeData :NodeParam  ) {

    return (
        <BaseNode
            nodeData={nodeData}
            keepAspectRatioOfTheResize={true}
        >
            <svg className="w-full h-full" viewBox="13.5 8 36 46"
                fill="none"
                fillRule="evenodd"
                stroke={ NodeBorderColor.bordercolor}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g 
                    className={ NodeBorderColor.border }
                    //fill={onPlacement ? NodeBorderColor.placementbg : `${theme.mode === 'dark' ? NodeBorderColor.darkbg : NodeBorderColor.bg }` }
                >
                    <path d="M1.5 16.5h60v30h-60z"/>
                    <path d="M9.5 16.5v30m44-30v30"/>
                </g>
            </svg>

            <div className="text-black dark:text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                { nodeData.data.label }
            </div>
        </BaseNode>
    );
}

