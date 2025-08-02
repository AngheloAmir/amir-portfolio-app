import { useReactFlow, Node, MarkerType } from "@xyflow/react";
import { useCallback }      from "react";
import UseReactFlowUndoable from "./lib/ReactFlowUndoable";
import { DEFAULTARROWSIZE, DEFAULTEDGECOLOR } from ".";
import { NODE_width } from "../custom";

export default function AddNodeOnDrop() {
    const { addNodes, addEdges, screenToFlowPosition, getNode } = useReactFlow();
    const { addHistory }                                        = UseReactFlowUndoable();
    
/* ========================================================================================================
        ADD NEW DEFAULT NODE WHEN DROP CONNECTING EDGE TO CANVAS EXCEPT TO A NODE
            Based on: https://reactflow.dev/examples/nodes/add-node-on-edge-drop
========================================================================================================*/
    const onConnectEnd = useCallback( (event :any, connectionState :any) => {
        if (!connectionState.isValid) {
            const { clientX, clientY } = 
                'changedTouches' in event ? event.changedTouches[0] : event;  // we need to remove the wrapper bounds, in order to get the correct position
        
        //prevent nodes being added if it is close to the parent node
            const xDistanceLimit   = 60;
            const yDistanceLimit   = 60;
            const MouseFlowPositon = screenToFlowPosition( { x: clientX, y: clientY } )
            if( MouseFlowPositon.x <= ( connectionState.fromNode.position.x + (connectionState.fromNode.measured.width * 0.75)  + xDistanceLimit )  && 
                MouseFlowPositon.y <= ( connectionState.fromNode.position.y + (connectionState.fromNode.measured.height * 0.75) + yDistanceLimit )  && 
                MouseFlowPositon.x >= ( connectionState.fromNode.position.x - ( xDistanceLimit * 3) ) &&
                MouseFlowPositon.y >= ( connectionState.fromNode.position.y - ( yDistanceLimit * 3) )) {
                return;
            }
                
            const id            = `${Date.now().toString(36)}`;
            const newNode :Node = {
                id: id,
                position: {
                    x: MouseFlowPositon.x - ( NODE_width /2 ), 
                    y: MouseFlowPositon.y - 10
                },
                data: { label: "" },
                type: 'default',
            };

        //If the target and the source are svg, we make it straigth line to make it more good looking
            let pathtype = 'bezier';
            const sourceNode = getNode( connectionState.fromNode.id) as Node;
            if( sourceNode.data && (sourceNode.data.imageFileType == 'svg' || sourceNode.data.imageFileType == 'json' ))
                pathtype = "straight";

            const newEdge = {
                id,
                source: connectionState.fromNode.id,
                target: id,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width:  DEFAULTARROWSIZE,
                    height: DEFAULTARROWSIZE,
                    color:  DEFAULTEDGECOLOR,
                },
                style: {
                    stroke: DEFAULTEDGECOLOR,
                },
                data: {
                    label: '',
                    type: 'default',
                    pathtype,
                },
            }
            
            addNodes( newNode );
            addEdges( newEdge );
            addHistory({
                type:      'addNodeOnDrop',
                id:        [],
                newvalues: [{
                    node: newNode,
                    edge: newEdge
                }],
                oldvalues: []
            });
        }
    }, [] );

    return {
        onConnectEnd
    }

}