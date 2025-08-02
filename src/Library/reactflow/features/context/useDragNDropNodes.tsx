import { createSelectors } from "../../core/lib/zustandSelector";
import { create }          from "zustand";
import { CustomNodeTypes } from "../../custom";

interface DragAndDropStateInterface {
    nodetype: CustomNodeTypes;

    /** Set the node information that is being dragged to the ReactFlow canvas */
    setNodeType: ( type: CustomNodeTypes ) => void;
}

const DragAndDropState = create<DragAndDropStateInterface>()((set) => ({
    nodetype:  'default',
    nodeName:  'node',

    setNodeType: ( type ) => set({
        nodetype: type,
    }),
}));

const useDragAndDropState = createSelectors(DragAndDropState);
export default useDragAndDropState;
