import { NodeParam } from '../../../core';
import BaseNode      from '../BaseNode';
import NodeBorderColor  from '../style/_color';

export default function IO( nodeData :NodeParam  ) {
    return (
        <BaseNode
            nodeData={nodeData}
            keepAspectRatioOfTheResize={true}
        >
            <svg viewBox="108 95.344 120 56.691"  className={`w-full h-full `} strokeLinecap="round" strokeLinejoin="round">
                <path
                    className={ NodeBorderColor.border }
                    //fill={onPlacement ? NodeBorderColor.placementbg : `${theme.mode === 'dark' ? NodeBorderColor.darkbg : NodeBorderColor.bg }` }
                    strokeWidth={2}
                    d="M 127.629 95.344 L 109.981 151.905 L 208.238 152.035 L 226.366 95.377 L 127.629 95.344 Z"/>
            </svg>
            <div className="text-black dark:text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                { nodeData.data.label }
            </div>
        </BaseNode>
    );
}

