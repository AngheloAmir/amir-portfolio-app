import { Edge, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import ActiveElements  from "./ActiveElements";

export default function GetAllSelectedElements() {
    const { updateNode, updateEdge, getIntersectingNodes, screenToFlowPosition, getEdges, getNodes } = useReactFlow();
    const { setSelectedNodes, setSelectedEdges } = ActiveElements();

    /**Note the area must be the SCREEN area not the area inside the Reactflow Canvas
     * 
     * This function make all node withing the area to be selected or not select if no nodes are inside
     * This also select all edges that are valid meaning have both source and target node inside the area
     * this also sets the hook for: 
     * const { setSelectedNodes, setSelectedEdges } = ActiveElements();
     * 
     * @example
        const { selectedArea, hasSelection } = useSelections();
        useEffect(() => {
            if(hasSelection) {
                selectedElements( selectedArea );
            }
        }, [selectedArea, hasSelection]);
    */
    const selectedElements = useCallback((area :{x: number, y: number, w:number, h:number}) => {
        const topleftPos     = screenToFlowPosition( { x: area.x,          y: area.y });
        const botrightPos   = screenToFlowPosition({ x: area.x + area.w, y: area.y + area.h });
        const selectedNodes = getIntersectingNodes( {
            x:       topleftPos.x,
            y:       topleftPos.y,
            width:   botrightPos.x - topleftPos.x,
            height:  botrightPos.y - topleftPos.y
        });

        const tempEdges   :Edge[] = [];
        const selectEdges :Edge[] = [];

        if( selectedNodes.length == 0 ) {
            setSelectedNodes([]);
            setSelectedEdges([]);
            const allNodes = getNodes();
            allNodes.forEach((node) => {
                if( node.selected ) 
                    updateNode( node.id, { selected: false });
            })
            return;
        }
    
    //select all nodes
        selectedNodes.forEach((node) => {
            updateNode( node.id, { selected: true });
            const allEdges       = getEdges();
            const connectedEdges = allEdges.map((edge) => {
                if( edge.target == node.id || edge.source == node.id )
                    return edge;
            })
            const fixUndefinedEdges = connectedEdges.filter(edge => edge !== undefined);
            fixUndefinedEdges.forEach(edge => {
                if( !tempEdges.find( e => e.id == edge.id ) ) 
                    tempEdges.push( edge );
            })
        })

    //make sure that the edges have both source and target inside the selectedNodes
        tempEdges.forEach((edge) => {
            if( selectedNodes.find( node => node.id == edge.source ) && selectedNodes.find( node => node.id == edge.target ) )
                selectEdges.push( edge );
        })

    //select all edges
        selectEdges.forEach((edge) => {
            updateEdge( edge.id, { selected: true });
        })

    //update the selected nodes and edges from the hook
        const nodeIds = selectedNodes.map(node => node.id);
        const edgeIds = selectEdges.map(edge => edge.id);
        setSelectedNodes(nodeIds);
        setSelectedEdges(edgeIds);
    }, [])

    return {
        selectedElements
    }
}
