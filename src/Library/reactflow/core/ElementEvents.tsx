import { useReactFlow, Node, MarkerType }  from "@xyflow/react";
import { useCallback, useRef } from "react";
import UseReactFlowUndoable from "./lib/ReactFlowUndoable";
import CloseContextMenus    from "./CloseContextMenus";
import { DEFAULTARROWSIZE, DEFAULTEDGECOLOR } from ".";
import ActiveElements from "./ActiveElements";

export default function ElementEvents() {
    const { getEdges, updateEdge, getNode, getNodes }  = useReactFlow();
    const { closeContextMenu  }     = CloseContextMenus();
    const { 
        addHistory,
        setValueBeforeChange
    } = UseReactFlowUndoable();
    const { selectedNodes } = ActiveElements();

    const valueBeforeChangeRef = useRef<any>()
    const OnNodeDragStart = useCallback( (event: any, node :Node) => {
        closeContextMenu();
        
    //if only one node is selected
        if(selectedNodes.length <= 1 || selectedNodes.length == 0) {
            valueBeforeChangeRef.current = { position: node.position };
            return;
        }

    //multiple nodes selected
        const allnodesPosition :any[] = [];
        getNodes().map((node: any) => {
            if( selectedNodes.includes(node.id) )
                allnodesPosition.push({ position: node.position })
        });
        valueBeforeChangeRef.current = [ ...allnodesPosition ];
    }, [selectedNodes]);

    const OnNodeDragEnd = useCallback(( event: any, node :Node) => {
        if( !valueBeforeChangeRef.current ) return;
        //get all of the selected nodes
            const allnodesNewPosition :any[] = [];

        //if one node is selected 
            if(valueBeforeChangeRef.current.position) {
                allnodesNewPosition.push       ({ position: node.position });
                valueBeforeChangeRef.current = [{ position: valueBeforeChangeRef.current.position }];
            }
            else 
                getNodes().map((node: any) => {
                    if( selectedNodes.includes(node.id) )
                        allnodesNewPosition.push({ position: node.position })
                });

        //check if the node really move
            if(     valueBeforeChangeRef.current[0].position.x == allnodesNewPosition[0].position.x 
                && valueBeforeChangeRef.current[0].position.y == allnodesNewPosition[0].position.y ) return;

        //check if the movement is 1 pixel
            if( valueBeforeChangeRef.current[0].position.x - allnodesNewPosition[0].position.x ==  1  ||
                valueBeforeChangeRef.current[0].position.y - allnodesNewPosition[0].position.y == -1 ) return;
            if( valueBeforeChangeRef.current[0].position.x - allnodesNewPosition[0].position.x == -1 ||
                valueBeforeChangeRef.current[0].position.y - allnodesNewPosition[0].position.y == -1 ) return;

            addHistory({
                type:      'nodemove',
                id:        selectedNodes,
                oldvalues: valueBeforeChangeRef.current,
                newvalues: allnodesNewPosition,
            })
            setValueBeforeChange( null );
    }, [selectedNodes]);

    const onEdgeConnected = useCallback(( Edge: any ) => {
        const allEdges    = getEdges();
        const newEdgeData = allEdges.find( (edge) => edge.source == Edge.source && edge.target == Edge.target && edge.targetHandle == Edge.targetHandle && edge.sourceHandle == Edge.sourceHandle );
        if(!newEdgeData) return;

        const sourceNode = getNode( newEdgeData.source )
        if( !sourceNode ) return;
        const targetNode = getNode( newEdgeData.target )
        if( !targetNode ) return;

    //If the target and the source are svg, we make it straigth line to make it more good looking
        let pathtype = 'bezier';
        if( sourceNode.data && (sourceNode.data.imageFileType == 'svg' || sourceNode.data.imageFileType == 'json' ))
            pathtype = "straight";
        if( targetNode.data && (targetNode.data.imageFileType == 'svg' || targetNode.data.imageFileType == 'json' ))
            pathtype = "straight";

        const addedEdge = {
            ...newEdgeData,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width:  DEFAULTARROWSIZE,
                height: DEFAULTARROWSIZE,
                color: DEFAULTEDGECOLOR,
            },
            style: {
                stroke: DEFAULTEDGECOLOR,
            },
            data: {
                ...newEdgeData,
                pathtype
            }
        }
        updateEdge( newEdgeData.id, addedEdge );

        addHistory({
            type:      'newedge',
            id:        [ newEdgeData.id ],
            oldvalues: [ ],
            newvalues: [ addedEdge ]
        });
        setValueBeforeChange( null );
    }, []);

    return {
        OnNodeDragStart,
        OnNodeDragEnd,
        onEdgeConnected
    }
}
