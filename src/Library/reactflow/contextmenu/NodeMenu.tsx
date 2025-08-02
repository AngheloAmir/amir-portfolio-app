import { BiText }       from "react-icons/bi";
import { FaShapes }     from "react-icons/fa";
import { MdDelete }     from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { useReactFlow, Edge, Node } from "@xyflow/react";
import useFlowState                 from "../core"
import OpenFileImage                from "../lib/OpenImage";
import AdjustNodeSize               from "./helpers/adjustNodeSize";
import AdjustNodeNameIfStillDefault from "./helpers/adjustNodeName";
import UseReactFlowUndoable         from "../core/lib/ReactFlowUndoable";
import useShowModal                 from "../ui/modal/useShowModal";

export default function NodeContextMenu() {
    const showModal             = useShowModal.use.showModal();
    const showNodeContextMenu   = useFlowState.use.showNodeContextMenu();
    const contextTriggeringData = useFlowState.use.contextTriggeringData();
    const contextMenuPosition   = useFlowState.use.contextMenuPosition();
    const setIsNodeLabelBeingEdited = useFlowState.use.setIsNodeLabelBeingEdited();
    const showContextMenu       = useFlowState.use.showContextMenu();
    const setOptions            = useFlowState.use.setOptions();
    const { getNodes, getNode, setEdges, getEdges, updateNode, updateNodeData, deleteElements } = useReactFlow();
    const { setValueBeforeChange, addHistory  } = UseReactFlowUndoable();

    function changeBorderColor( background?: string, backgroundDark?: string ) {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectNodesId :string[] = [];
        const oldvalues: any[] = [];
        const newvalues: any[] = [];
        ctd.forEach( (nodeid :string) => {
            const currentNode = getNode( nodeid ) as Node;
            if( !currentNode )                      return;
            if( currentNode.data.image )            return;

            const newColor   = {
                border:         'border-transparent',
                boderDark:       backgroundDark,
                background:      background,
                backgroundDark:  backgroundDark
            }
            oldvalues.push({
                border:          currentNode.data.border,
                boderDark:       currentNode.data.boderDark,
                background:      currentNode.data.background,
                backgroundDark:  currentNode.data.backgroundDark,
            });
            newvalues.push( newColor );
            affectNodesId.push( nodeid );
            updateNodeData( nodeid, newColor );
        });
    
        if(affectNodesId.length > 0) addHistory({
            type:      'nodecolor',
            id:        affectNodesId,
            oldvalues: oldvalues,
            newvalues: newvalues,
        });
    }

//====================================================================================================
    function deleteNode() {
        const ctd = contextTriggeringData as string[];
        const affectNodesId :string[] = [];
        const oldNodeValues : any[] = [];
        const oldEdgeValues : any[] = [];

        ctd.forEach( (nodeid :string) => {
            const currentNode = getNode( nodeid ) as Node;
            if( !currentNode )                      return;
            oldNodeValues.push( currentNode );
            affectNodesId.push( nodeid );

        //before we remove an node, we need to copy all of the edges that is connected the nodes
            const allEdges       = getEdges();
            const connectedEdges =  allEdges.map((edge) => {
                if( edge.target == nodeid || edge.source == nodeid )
                    return edge;
            })
            const fixUndefinedEdges = connectedEdges.filter(edge => edge !== undefined);

            fixUndefinedEdges.forEach(edge => {
                if( !oldEdgeValues.find( e => e.id == edge.id ) ) 
                    oldEdgeValues.push( edge );
            })
        });
        deleteElements({ nodes: oldNodeValues, edges: oldEdgeValues });
        addHistory({
            type      :'nodedelete',
            id        :affectNodesId,
            oldvalues :[{
                nodes: oldNodeValues,
                edges: oldEdgeValues
            }],
            newvalues :[]
        });
        showContextMenu( 'none' );

    //When we delete a node, we want to make sure that
    //invalid edges are remove also. Invalid edges are edge that are connected to a single node or not at all
        setTimeout(() => {
            const edgeValidation = (nodes: Node[], edges: Edge[]) => {
                const nodeIds      = nodes.map(node => node.id) ;
                const validEdges   = edges.filter(edge => {
                  const sourceNode = nodes.find(node => node.id === edge.source);
                  const targetNode = nodes.find(node => node.id === edge.target);
                  return sourceNode && targetNode && sourceNode.id !== targetNode.id;
                });
                const filteredEdges = validEdges.filter(edge => {
                  return nodeIds.includes(edge.source) && nodeIds.includes(edge.target);
                });
                return filteredEdges;
            };
            setEdges( edgeValidation( getNodes(), getEdges() ));
        }, 0);        
    }

    function EditLabel(e : any) {
        e.stopPropagation();
        if( contextTriggeringData.length > 1 ) {
            showModal('prompt', 'Label Text', 'Enter New Label Text For All Selected Nodes', '', (label: string) => {
                const affectNodesId :string[] = [];
                const oldvalues: any[] = [];
                const newvalues: any[] = [];
                contextTriggeringData.map( (nodeid :string) => {
                    const currentNode = getNode( nodeid ) as Node;
                    if( !currentNode )                      return;
                    oldvalues.push({
                        label:  currentNode.data.label,
                        width:  currentNode.width,
                        height: currentNode.height,
                    });
                    newvalues.push({
                        label: label,
                        width:  currentNode.width,
                        height: currentNode.height,
                    });
                    affectNodesId.push( nodeid );

                    updateNodeData( nodeid, { label: label } );
                });
                if(affectNodesId.length > 0) addHistory({
                    type:      'nodelabel',
                    id:        affectNodesId,
                    oldvalues: oldvalues,
                    newvalues: newvalues,
                })
                showContextMenu( 'none' );
            });
        }
        else {
            const currentNode = getNode( contextTriggeringData[0] ) as Node;
            if( !currentNode ) return;

            showContextMenu( 'none', undefined, contextTriggeringData );
            updateNode( currentNode.id, { 
                draggable: false,
                data: {
                    ...currentNode.data,
                    showTextInput: true,
                }
            });
            setOptions({ panOnDrag: false } as any );
            setValueBeforeChange([{
                label:  currentNode.data.label,
                width:  currentNode.width,
                height: currentNode.height,
            }]);
            setIsNodeLabelBeingEdited(true);
        }
    }

    function openImage() {
        OpenFileImage( (file :any, content, width, height) => {
            showContextMenu( 'none' );
            const fileType = file.name.split('.').pop();
            const ctd      = contextTriggeringData as string[];
            const affectNodesId :string[] = [];
            const oldvalues: any[] = [];
            const newvalues: any[] = [];

            ctd.forEach( (nodeid :string) => {
                const currentNode = getNode( nodeid ) as Node;
                if( !currentNode )                      return;
                const nodeSize    = AdjustNodeSize( fileType, width, height, currentNode );
                const nodeName    = AdjustNodeNameIfStillDefault( currentNode, fileType, file );
                const newNodeData = { 
                    width:    nodeSize.width,
                    height:   nodeSize.height,
                    selected: false,
                    data: {
                        ...currentNode.data,
                        image:         content,
                        imageFileType: fileType,
                        label:         nodeName,
                    //the purpose of this is to hide the jerky movement of the node due to edge recalculation
                        opacity:       0,  
                    },
                }
                updateNode( currentNode.id, newNodeData);

                oldvalues.push({
                    image:         currentNode.data.image         ?? undefined,
                    imageFileType: currentNode.data.imageFileType ?? undefined,
                    label:         currentNode.data.label         ?? '',
                    width:         currentNode.width,
                    height:        currentNode.height,
                    position:      currentNode.position,
                });
                newvalues.push({
                    image:         content,
                    imageFileType: fileType,
                    width:         nodeSize.width,
                    height:        nodeSize.height,
                    label:         nodeName,
                    position:  {
                        x: currentNode.position.x + (nodeSize.width / 3),
                        y: currentNode.position.y - 1,
                    }  
                });
                affectNodesId.push( nodeid );
            });
            addHistory({
                type:      'nodeimage',
                id:        affectNodesId,
                oldvalues: oldvalues,
                newvalues: newvalues,
            });

        //this one will move the node a bit
        //this is require because in the newvalues in the history the nodes are already adjusted
            setTimeout(() => {
                affectNodesId.map( (nodeIds) => {
                    const currentNode = getNode( nodeIds ) as any;
                    if( !currentNode )                      return;
                    updateNode( nodeIds, { 
                        position: {
                            x: currentNode.position.x + (currentNode.width / 3),
                            y: currentNode.position.y - 1,
                        },
                        data: {
                            ...currentNode.data,
                            opacity: undefined,
                        }
                    });
                })
            }, 20); 
        });
    }

    if(showNodeContextMenu && contextTriggeringData ) {
        const contextWidth  = 280;
        const contextHeight = contextTriggeringData.length > 1 ? 108 : 78;
 
        return (
            <div style={{
                position: 'absolute',
                zIndex:    10,
                top:      `${ contextMenuPosition.y - contextHeight - 8 }px`,
                left:     `${ contextMenuPosition.x - (contextWidth/2)  }px`,
                width:    `${contextWidth}px`,
                height:   `${contextHeight}px`,
            }}
                onClick={(e) =>  {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onContextMenu={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                className="select-none border dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 py-2 px-2 shadow-md"
            >
                 { contextTriggeringData.length > 1 && 
                    <p className="text-center text-gray-500 text-sm pb-2 "> Multiple <b>Items</b> Are Selected </p>
                }

                <div className="flex w-full justify-between">
                    <div className="w-6 h-6 rounded-full border-2 border-blue-500"                        onClick={() => changeBorderColor()}></div>
                    <div className="w-6 h-6 rounded-full bg-red-500    hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-red-500",      "dark:bg-red-700")}></div>
                    <div className="w-6 h-6 rounded-full bg-orange-400 hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-orange-400",   "dark:bg-orange-500")}></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-300 hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-yellow-300",   "dark:bg-yellow-400")}></div>
                    <div className="w-6 h-6 rounded-full bg-green-400  hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-green-400",    "dark:bg-green-500")}></div>
                    <div className="w-6 h-6 rounded-full bg-cyan-500   hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-cyan-500",     "dark:bg-cyan-600")}></div>
                    <div className="w-6 h-6 rounded-full bg-blue-500   hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-blue-400",     "dark:bg-blue-600")}></div>
                    <div className="w-6 h-6 rounded-full bg-violet-700 hover:border-2 hover:border-white" onClick={() => changeBorderColor("bg-violet-500",   "dark:bg-violet-800")}></div>
                </div>

                <div className="flex w-full justify-between mt-3">
                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={EditLabel}>
                        <BiText className="w-full h-full text-gray-500" />
                    </div>
                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={openImage}>
                        <AiFillPicture className="w-full h-full text-gray-500" />
                    </div>
                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <FaShapes className="w-full h-full text-gray-500" />
                    </div>
                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={deleteNode}>
                        <MdDelete className="w-full h-full text-red-500" />
                    </div>
                </div>
            </div>
        )
    }

    else if(showNodeContextMenu)
        console.log( 'no context menu for this type: ', contextTriggeringData );
}
