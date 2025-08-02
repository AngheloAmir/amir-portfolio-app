import { NodeParam } from '../../../core';
import BaseNode      from '../BaseNode';

export default function Terminator( nodeData :NodeParam  ) {

    return (
        <BaseNode
            nodeData={nodeData}
        >
            <div className={`w-full h-full border-2 border-blue-500 rounded-3xl p-2 text-center shadow-md text-black dark:text-white bg-white dark:bg-gray-800`}>
                {nodeData.data.label}
            </div>
        </BaseNode>
    );
}
