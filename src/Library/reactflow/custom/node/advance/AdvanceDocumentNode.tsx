import BaseNode      from '../BaseNode';
import { NodeParam } from '../../../core';
import { FaComputer } from "react-icons/fa6";

export default function AdvanceDocumentNode( nodeData :NodeParam  ) {
    return (
        <BaseNode
            nodeData={nodeData}
        >
            <div className="w-full h-full rounded-md bg-white dark:bg-gray-800 shadow-xl ">
                {/* <SlateEditorContainer 
                    onClose={() => console.log('close')}
                /> */}

                ...on dev
            </div>
        </BaseNode>
    );
}
