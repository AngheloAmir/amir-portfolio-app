import { useReactFlow, Edge, Node } from "@xyflow/react";
import { useCallback }      from "react";
import UseReactFlowUndoable from "./lib/ReactFlowUndoable";

export default function BackspaceDelete() {
    const { getEdges, getNodes, setEdges, setNodes }   = useReactFlow();
    const { addHistory }  = UseReactFlowUndoable();
    
/**This function is called when the user clicks on the backspace key. However, multiple items can be deleted */
    const onBackspaceDelete = useCallback( async (data: { nodes: Node[], edges: Edge[]}) => {
    //     if( data.nodes.length > 0 ) {
    //         console.log('called');

    //         const allEdges                 = getEdges();
    //         const deletedRecords :any[]    = [];
    //         const nodeIds :string[] =  []
    //         const edgeIds :string[] =  []

    //     //before deleting occurs, we need to store all of the edges that will be affected
    //         data.nodes.map( (node) => {
    //             const connectedEdges    = allEdges.map((edge) => { 
    //                 if( edge.target == node.id || edge.source == node.id) {
    //                     if( edgeIds.find( (id) => id == edge.id ) ) 
    //                         return undefined;
    //                     return edge; 
    //                 }
    //                 return undefined;
    //             })
    //             const removeUndefinedEdges = connectedEdges.filter(edge => edge !== undefined);

    //         //push the data to be deleted
    //             deletedRecords.push({
    //                 node:  node,
    //                 edges: removeUndefinedEdges
    //             });
    //             nodeIds.push(node.id);
    //             edgeIds.push(...removeUndefinedEdges.map(edge => edge.id));
    //         });
            
    //     //remove nodes that is in nodesIDs including the Edges that is not both connected
    //         const newNodeSets = getNodes().filter((node) => !nodeIds.includes(node.id));
    //         const newEdgeSets = allEdges.filter((edge) => !edgeIds.includes(edge.id));
    //         setEdges(newEdgeSets);
    //         setNodes(newNodeSets);

    //     //Add a node activity to the undo/redo system state
    //         addHistory({
    //             type:     'nodedelete',
    //             id:        nodeIds,
    //             oldvalues: [ ...deletedRecords],
    //             newvalues: []
    //         })

    //         return true;
    //     }

    // //Only edges are being deleted
    //     else if( data.edges.length > 0 ) {
    //         const edgeIds = data.edges.map( (edge) => edge.id );
    //         addHistory({
    //             type:     'edgedelete',
    //             id:        edgeIds,
    //             oldvalues: [ ...data.edges],
    //             newvalues: []
    //         });
    //         const allEdges    = getEdges();
    //         const newEdgeSets = allEdges.filter((edge) => !edgeIds.includes(edge.id));
    //         setEdges(newEdgeSets);
    //         return true;
    //     }

    //nothing is deleted
        return false
    }, []);

    return {
        onBackspaceDelete
    }
}
