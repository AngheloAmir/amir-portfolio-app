import { useReactFlow, Edge, Node } from "@xyflow/react";
import { useCallback }      from "react";
import useFlowState         from ".";
import UseReactFlowUndoable from "./lib/ReactFlowUndoable";

export default function CloseContextMenus() {
    const {  getNode, updateNode, updateEdge, getEdge }           = useReactFlow();
    const { addHistory, setValueBeforeChange, valueBeforeChange } = UseReactFlowUndoable();
    const showContextMenu    = useFlowState.use.showContextMenu();
    const setOptions         = useFlowState.use.setOptions();
    const showEdgeTextEditor = useFlowState.use.showEdgeTextEditor();
    const setIsNodeLabelBeingEdited = useFlowState.use.setIsNodeLabelBeingEdited();

    const contextTriggeringData = useFlowState.use.contextTriggeringData();
    const contextKind           = useFlowState.use.contextKind();

    const closeContextMenu = useCallback(() => {
        if(window && window.app)
            window.app.closeAll({ reactflow: true });

        if( contextTriggeringData && valueBeforeChange ) {
            if( contextKind == 'node' ) {
                setIsNodeLabelBeingEdited(false);

                const newValues :any[]    = [];
                const nodeIds   :string[] = [];
                contextTriggeringData.map(( nodeId, index ) => {
                    const currentNode  = getNode( nodeId ) as Node;
                    const oldLabel     = valueBeforeChange[index].label;
                    updateNode( currentNode.id, {
                        draggable: true,
                        data: {
                            ...currentNode.data,
                            showTextInput: false,
                    }});

                    if( currentNode.data.label == oldLabel )
                        return;

                    newValues.push({
                        label:  currentNode.data.label,
                        width:  currentNode.width,
                        height: currentNode.height
                    });
                    nodeIds.push  ( nodeId );

                })

                const removeUndefined = nodeIds.filter( id => id !== undefined );
                if( removeUndefined.length >=  1)       
                    addHistory({
                        type:      'nodelabel',
                        id:        removeUndefined,
                        oldvalues: valueBeforeChange,
                        newvalues: newValues
                    })
            }

    //The activity that was doing is editing a edge level
    //and apply the changes to all edges
    //The thing that make this hard because the possiblity that multiple edge label has been modified
    //is that the user can be editing multiple edges at the same time
            else {
                showEdgeTextEditor(false);

                const newValues :any[]    = [];
                const edgeIds   :string[] = [];
                contextTriggeringData.map(( edgeId, index ) => {
                    const cEdge    = getEdge( edgeId ) as Edge | any;
                    const oldLabel = valueBeforeChange[index].label;

                    updateEdge( edgeId, { 
                        selected: false,
                        data: {
                            ...cEdge.data,
                            showTextInput: false
                        }
                    });

                    if( cEdge.data.label == oldLabel )
                        return;
                    
                    newValues.push({ label: cEdge.data.label  });
                    edgeIds.push  ( edgeId );
                })
                const removeUndefined = edgeIds.filter( id => id !== undefined );

                if( removeUndefined.length >=  1)       
                    addHistory({
                        type:      'edgelabel',
                        id:        removeUndefined,
                        oldvalues: valueBeforeChange,
                        newvalues: newValues
                    })
            }   
            setOptions({ panOnDrag: true } as any );
        }

        showContextMenu("none");
        setValueBeforeChange(null);
    },  [contextTriggeringData, valueBeforeChange]);

    return { closeContextMenu };
}
