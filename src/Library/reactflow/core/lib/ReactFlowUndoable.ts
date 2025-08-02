import { Edge, useReactFlow, Node }   from "@xyflow/react";
import { create }            from "zustand";
import { useCallback, useEffect, useRef } from "react";
import { useToast } from "../Toast";

/**THIS CODE CAN BE REMOVE. IT JUST CLOSE THE SLIDES IF STILL SHOW */
import useCoreModule from "@/core-module/useCoreModule";
//================================================

export type AcitivityType = 
    'newnode'      | 'newedge'    | 
    'nodecolor'    | 'nodelabel'  | 'nodeimage'   | 'nodedelete' |
    'nodemove'     | 'noderesize' | 
    'edgecolor'    | 'edgelabel'  | 'edgepath'    | 'edgearrow'  | 'edgeanimation' | 'edgebehavior' | 'edgedelete' |
    'edgeAllAnim'  |

    'nodeSort'      | 'addNodeOnDrop' | 'pasteElements' | 'cutElements' |
    'none';

/**User activity with the ReactFlow recorded here to enable the undo and redo functions
 * @example
 * export interface ActivityHistory {
    type      : AcitivityType;
    id        : string[];
    newvalues : any[];
    oldvalues : any[];
}
 */
export interface ActivityHistory {
    type      : AcitivityType;
    id        : string[];
    newvalues : any[];
    oldvalues : any[];
}

export const flowRedoUndoState = create<{
  activity          : ActivityHistory[];
  activityIndex     : number;
  valueBeforeChange :any;

  setActivity           :(activity: ActivityHistory[]) => void;
  setIndex              :(index: number) => void;
  setValueBeforeChange  :(valueBeforeChange :any) => void;
}>()((set) => ({
    activity          :[],
    activityIndex     :0,
    valueBeforeChange :null,

    setActivity         :(activity)          => set({ activity }),
    setIndex            :(activityIndex)     => set({ activityIndex }),
    setValueBeforeChange:(valueBeforeChange) => set({ valueBeforeChange }),
}));

export default function UseReactFlowUndoable() {
    const { getNodes, getEdges, setNodes, setEdges, updateNode, updateNodeData, getNode, getEdge,
        deleteElements, updateEdgeData, updateEdge, addNodes, addEdges}  = useReactFlow();
    const { activity, activityIndex, valueBeforeChange, 
            setActivity, setIndex, setValueBeforeChange } = flowRedoUndoState();
    const activityRef      = useRef( activity );
    const activityIndexRef = useRef( activityIndex )
    useEffect(() => { activityRef.current      = activity      }, [ activity ] );
    useEffect(() => { activityIndexRef.current = activityIndex }, [ activityIndex ] );

    const getActivity = () => {
        return activityRef.current;
    }

    /**
     * USE IF THE NODE SIZE HAS CHANGE!
     * 
     * Due to edge optimzation, when a node size has change the edges dont reposition themselve to the correct position
     * this function is used to correct that by forcing a edge path calculation. This is done
     * by updating the node position by 15 pixel
     * Usage: The node positon must be reduce by 15 pixel and must be have data.opacity = 0
     * 
     * @example
     * updateNode( id, {
            position: {
                x: currentActivity.newvalues[index].position.x - 15,
                y: currentActivity.newvalues[index].position.y - 15
            },
            data: {
                ...currentNode.data,
                opacity: 0
            }
        });
        RecalculateEdgesForUpdatedNodes( currentActivity.id );
     */
    const RecalculateEdgesForUpdatedNodes = useCallback(( affectedNodes :string[]) => {
        const changePos = () => {
            affectedNodes.map((id) => {
                const currentNode = getNode( id );
                if(!currentNode) return;
                updateNode( id, {
                    position: {
                        x: currentNode.position.x + MOVEMENT,
                        y: currentNode.position.y + MOVEMENT
                    },
                    data: {
                        ...currentNode.data,
                        opacity: undefined
                    }
                });
            });
        }
        setTimeout(changePos, 20)
    },[]);
    const MOVEMENT = 5;

    const setHistory = useCallback(( activity :ActivityHistory[] ) => {
        setActivity( activity );
        setIndex( 0 );
    }, []);

    /**THIS CODE CAN BE REMOVE. IT JUST CLOSE THE SLIDES IF STILL SHOW */
    const closeModule = useCoreModule.use.closeModule();

    const addHistory = useCallback(( newActivity :ActivityHistory ) => {
        closeModule();
            
        try {
        //destroy the future since an undo is made and new activity is done
        //activityIndexRef.current is always point at zero which means no undo is been made
        //when an undo is made, this index increaments so we known which element has changed
            if( activityIndexRef.current != 0) {
                const newActivityTemp = activityRef.current.slice( activityIndexRef.current )
                setActivity( [ newActivity, ...newActivityTemp ] );
                setIndex( 0 );
            }
            else
                setActivity( [newActivity, ...activityRef.current] );
        } catch(err) {
            console.log( err );
        }
    }, []);

    const clearHistory = () => {
        setActivity([]);
        setIndex(0);
    }

//==========================================================================================
//==========================================================================================
    function DoThis( type: 'undo' | 'redo')  {
        const index           = type == 'undo' ? activityIndexRef.current : activityIndexRef.current - 1;
        const currentActivity = activityRef.current[ index ];
        const allNodes  = getNodes();
        const allEdges  = getEdges();
        let  temp :any, oldavalue :any, newvalue :any;

        switch( currentActivity.type ) {
            case 'newnode':
                if(type == 'undo') {
            //delete all of the nodes that was added
                    const nodeToDelete = currentActivity.id.map(id => { return { id } });
                    deleteElements({ nodes: nodeToDelete });
                    setIndex( activityIndexRef.current + 1);
                }
            //on the other hand, add the new nodes
                else {
                    const newNodes = currentActivity.id.map((id, index) => {
                        return {
                            ...currentActivity.newvalues[index],
                            selected: false,
                        }
                    });
                    setNodes([ ...allNodes, ...newNodes as any]);
                    setIndex( activityIndexRef.current - 1);
                }
            break;

 //=======================================================================================================
            case 'nodelabel':
                const affectedNodes: string[] = [];
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        const oldavalue   = currentActivity.oldvalues ? currentActivity.oldvalues[index].label : '';
                        const currentNode = getNode( id ) as Node;
                        if( !currentNode ) return;

                        updateNode( id, {
                            width:  currentActivity.oldvalues[index].width,
                            height: currentActivity.oldvalues[index].height,
                            selected: false,
                            position: {
                                x: currentNode.position.x - MOVEMENT,
                                y: currentNode.position.y - MOVEMENT
                            },
                            data: {
                                ...currentNode.data,
                                label: oldavalue,
                                opacity: 0  //we need to turn this to invisible while we move the nodes to recalculate the edges
                            }
                        });
                        affectedNodes.push( id );
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        const newvalues   = currentActivity.newvalues ? currentActivity.newvalues[index].label : '';
                        const currentNode = getNode( id ) as Node;
                        if( !currentNode ) return;
                        
                        updateNode( id, {
                            width:   currentActivity.newvalues[index].width,
                            height:  currentActivity.newvalues[index].height,
                            selected: false,
                            position: {
                                x: currentNode.position.x - MOVEMENT,
                                y: currentNode.position.y - MOVEMENT
                            },
                            data: {
                                ...currentNode.data,
                                label:  newvalues,
                                opacity: 0  //we need to turn this to invisible while we move the nodes to recalculate the edges
                            }
                        });
                        affectedNodes.push( id );
                    });
                    setIndex( activityIndexRef.current - 1);
                }

            //for some reason, we need to move the edges tempoary because we want the edges to be
            //recalcuateed
                RecalculateEdgesForUpdatedNodes( affectedNodes );
                break;

//=======================================================================================================
            case 'nodecolor':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        oldavalue = {
                            border:          currentActivity.oldvalues[index].border         ?? undefined,
                            boderDark:       currentActivity.oldvalues[index].boderDark      ?? undefined,
                            background:      currentActivity.oldvalues[index].background     ?? undefined,
                            backgroundDark:  currentActivity.oldvalues[index].backgroundDark ?? undefined,
                        }
                        updateNodeData( id, { ...oldavalue });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        newvalue = {
                            border:          currentActivity.newvalues[index].border         ?? undefined,
                            boderDark:       currentActivity.newvalues[index].boderDark      ?? undefined,
                            background:      currentActivity.newvalues[index].background     ?? undefined,
                            backgroundDark:  currentActivity.newvalues[index].backgroundDark ?? undefined,
                        }
                        updateNodeData( id, { ...newvalue });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'nodedelete':
            //for undoing the delete, we just add a new set of nodes and edges
                if(type == 'undo') {
                    const newEdges = currentActivity.oldvalues[0].edges;
                    const newNodes = currentActivity.oldvalues[0].nodes;
                    setEdges([ ...allEdges, ...newEdges as any]);
                    setNodes([ ...allNodes, ...newNodes as any]);
                    setIndex( activityIndexRef.current + 1);
                }
                
            //for redoing, we deleted them
                else {
                    deleteElements({
                        nodes: currentActivity.oldvalues[0].nodes,
                        edges: currentActivity.oldvalues[0].edges
                    })
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'nodeimage':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        const currentNode = getNode( id );
                        oldavalue = {
                            image:         currentActivity.oldvalues[index].image         ?? undefined,
                            imageFileType: currentActivity.oldvalues[index].imageFileType ?? undefined,
                            label:         currentActivity.oldvalues[index].label         ?? '',
                        }
                        updateNode( id, {
                            width:    currentActivity.oldvalues[index].width,
                            height:   currentActivity.oldvalues[index].height,
                            position: {
                                x: currentActivity.oldvalues[index].position.x - MOVEMENT,
                                y: currentActivity.oldvalues[index].position.y - MOVEMENT
                            },
                            data: {
                                ...currentNode,
                                ...oldavalue,
                                opacity: 0,
                            },
                            selected: false
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        const currentNode = getNode( id );
                        newvalue = {
                            image:         currentActivity.newvalues[index].image         ?? undefined,
                            imageFileType: currentActivity.newvalues[index].imageFileType ?? undefined,
                            label:         currentActivity.newvalues[index].label         ?? '',
                        }
                        updateNode( id, {
                            width:    currentActivity.newvalues[index].width,
                            height:   currentActivity.newvalues[index].height,
                            position: {
                                x: currentActivity.newvalues[index].position.x - MOVEMENT,
                                y: currentActivity.newvalues[index].position.y - MOVEMENT
                            },
                            data: {
                                ...currentNode,
                                ...newvalue,
                                opacity: 0,
                            },
                            selected: false
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }

            //for some reason, we need to move the edges tempoary because we want the edges to be
            //recalcuateed
                RecalculateEdgesForUpdatedNodes( currentActivity.id );
                break;

//=======================================================================================================
            case "nodemove":
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateNode( id, {
                            position: currentActivity.oldvalues[index].position,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateNode( id, {
                            position: currentActivity.newvalues[index].position,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'noderesize':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        const currentNode = getNode( id );
                        if(!currentNode) return;

                        updateNode( id, {
                            width:    currentActivity.oldvalues[index].width,
                            height:   currentActivity.oldvalues[index].height,
                            position: {
                                x: currentActivity.oldvalues[index].position.x - MOVEMENT,
                                y: currentActivity.oldvalues[index].position.y - MOVEMENT
                            },
                            data: {
                                ...currentNode.data,
                                opacity: 0
                            }
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        const currentNode = getNode( id );
                        if(!currentNode) return;

                        updateNode( id, {
                            width:    currentActivity.newvalues[index].width,
                            height:   currentActivity.newvalues[index].height,
                            position: {
                                x: currentActivity.newvalues[index].position.x - MOVEMENT,
                                y: currentActivity.newvalues[index].position.y - MOVEMENT
                            },
                            data: {
                                ...currentNode.data,
                                opacity: 0
                            }
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }

            //for some reason, we need to move the edges tempoary because we want the edges to be
            //recalcuateed
                RecalculateEdgesForUpdatedNodes( currentActivity.id );
                break;

//=======================================================================================================
//=======================================================================================================
//=======================================================================================================
            case 'newedge':
                if(type == 'undo') {
                    const edgeToDelete = currentActivity.id.map(id => { return { id } });
                     deleteElements({ edges:  edgeToDelete });
                     setIndex( activityIndexRef.current + 1);
                }
                else {  
                    const newEdges = currentActivity.id.map((id, index) => {
                        return currentActivity.newvalues[index]
                    })
                    setEdges([ ...allEdges, ...newEdges as any]);
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgelabel':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateEdgeData( id, {
                            label: currentActivity.oldvalues[index].label,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateEdgeData( id, {
                            label: currentActivity.newvalues[index].label,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;
                
//=======================================================================================================
            case 'edgecolor':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateEdge( id, {
                            markerEnd:   currentActivity.oldvalues[index].markerEnd,
                            markerStart: currentActivity.oldvalues[index].markerStart,
                            style:       currentActivity.oldvalues[index].style,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateEdge( id, {
                            markerEnd:   currentActivity.newvalues[index].markerEnd,
                            markerStart: currentActivity.newvalues[index].markerStart,
                            style:       currentActivity.newvalues[index].style,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgeanimation':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateEdge( id, {
                            animated: currentActivity.oldvalues[index].animated,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateEdge( id, {
                            animated: currentActivity.newvalues[index].animated,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgepath':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateEdgeData( id, {
                            pathtype: currentActivity.oldvalues[index].pathtype,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateEdgeData( id, {
                            pathtype: currentActivity.newvalues[index].pathtype,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgedelete':
                if(type == 'undo') {
                    const allEdges    = getEdges();
                    setEdges( [ ...allEdges, ...currentActivity.oldvalues] );
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    const edgesToDelete  = currentActivity.id.map(id => { return { id } });
                    deleteElements({ edges: edgesToDelete  });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgearrow':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateEdge( id, {
                            markerStart: currentActivity.oldvalues[index].markerStart,
                            markerEnd:   currentActivity.oldvalues[index].markerEnd,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateEdge( id, {
                            markerStart: currentActivity.newvalues[index].markerStart,
                            markerEnd:   currentActivity.newvalues[index].markerEnd,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgebehavior':
                if(type == 'undo') {
                    currentActivity.id.map((id, index) => {
                        updateEdgeData( id, {
                            type: currentActivity.oldvalues[index].type,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.id.map((id, index) => {
                        updateEdgeData( id, {
                            type: currentActivity.newvalues[index].type,
                        });
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'edgeAllAnim':
                if(type == 'undo') {
                    const affectedEdges = currentActivity.oldvalues as Edge[];
                    affectedEdges.map((edge) => {
                        updateEdge( edge.id, {
                            animated: edge.animated,
                        });
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    const edges    = getEdges();
                    const newEdges = edges.map( (edge) => {
                        return {  ...edge, animated: currentActivity.newvalues[0] };
                    });
                    setEdges( newEdges );
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'addNodeOnDrop':
                if( type == 'undo' ) {
                    currentActivity.newvalues.map((val ) => {
                //delete the added node and the edges
                        deleteElements({
                            nodes: [ { id: val.node.id } ],
                            edges: [ { id: val.edge.id } ]
                        })
                    });
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    currentActivity.newvalues.map((val) => {
                //On the other hand, add the node and the edges
                        addNodes( val.node );
                        addEdges( val.edge );
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;

//=======================================================================================================
            case 'nodeSort':
                console.log('UNHANDLED ACTIVITY TYPE! This activity is not stored to the undo/redo system');
                break;

            case 'pasteElements':
                if(type == 'undo') {
            //delete all of the nodes that was added
                    const nodeToDelete = currentActivity.id.map(id => { return { id } });
                    deleteElements({ nodes: nodeToDelete });
                    setIndex( activityIndexRef.current + 1);
                }

            //on the other hand, add the new nodes
                else {
                    const newNodes = currentActivity.id.map((id, index) => {
                        return {
                            ...currentActivity.newvalues[0].nodes[index],
                            selected: false,
                        }
                    });
                    setNodes([ ...allNodes, ...newNodes as any]);
                    setEdges([ ...allEdges, ...currentActivity.newvalues[0].edges ])
                    setIndex( activityIndexRef.current - 1);
                }
                break;

            case 'cutElements':
                if(type == 'undo') {
                //In undo the current activity, the first element in old values are valid node and edges
                    addNodes( currentActivity.oldvalues[0].nodes );
                    addEdges( currentActivity.oldvalues[0].edges );
                
                //then the second element are edges that become invalid after the cut
                    addEdges( currentActivity.oldvalues[1].edges );
                    setIndex( activityIndexRef.current + 1);
                }
                else {
                    const allEdgesToDelete = [ ...currentActivity.oldvalues[0].edges, ...currentActivity.oldvalues[1].edges ];
                    deleteElements({
                        nodes: currentActivity.oldvalues[0].nodes,
                        edges: allEdgesToDelete
                    });
                    setIndex( activityIndexRef.current - 1);
                }
                break;
            
//=======================================================================================================
            default:
                console.log('cant perform the UNDO change');
        }
    }

//==========================================================================================
//==========================================================================================
    const { showToast } = useToast();
    const undo = useCallback(() => {
        if( (activityIndexRef.current) >= activityRef.current.length ) {
            showToast('Nothing to Undo', 'info');
            //console.log('cannot do any undo anymore');
            return;
        }
        DoThis("undo");
    }, []);
    
    const redo = useCallback(() => {
        if( activityIndexRef.current == 0) {
            showToast('Nothing to Redo', 'info');
            //console.log("NOTHING to Redo!");
            return;
        }
        DoThis("redo");
    }, []);

//==========================================================================================
//==========================================================================================
    return {
        activity,
        activityIndex,
        valueBeforeChange,
        setHistory,
        addHistory,
        clearHistory,
        undo,
        redo,
        setValueBeforeChange,

        RecalculateEdgesForUpdatedNodes,
        getActivity
    }
}
