import { Edge, MarkerType, useReactFlow } from "@xyflow/react";
import useFlowState, { DEFAULTARROWSIZE, DEFAULTEDGECOLOR } from "../core"
import { MdAnimation }        from "react-icons/md";
import { MdDelete }           from "react-icons/md";
import { BiText }             from "react-icons/bi";
import { IoGitNetwork }       from "react-icons/io5";
import { FaArrowPointer }     from "react-icons/fa6";
import { FaArrowsAltH }       from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiStraightPipe }     from "react-icons/gi";
import { BsBezier2 }          from "react-icons/bs";
import { FaArrowTrendUp }     from "react-icons/fa6";
import { IoOptionsSharp }     from "react-icons/io5";

import ContextMenu             from "../ui/ContextMenu";
import { useEffect, useState } from "react";
import UseReactFlowUndoable    from "../core/lib/ReactFlowUndoable";
import useShowModal            from "../ui/modal/useShowModal";

export default function EdgeContextMenu() {
    const showModal             = useShowModal.use.showModal();
    const showEdgeContextMenu   = useFlowState.use.showEdgeContextMenu();
    const contextMenuPosition   = useFlowState.use.contextMenuPosition();
    const contextTriggeringData = useFlowState.use.contextTriggeringData();
    const showContextMenu       = useFlowState.use.showContextMenu();
    const setOptions            = useFlowState.use.setOptions();
    const showEdgeTextEditor    = useFlowState.use.showEdgeTextEditor();
    const { getEdge, updateEdgeData, updateEdge, deleteElements } = useReactFlow();

    const [showEdgeTypeMenu, setShowEdgeTypeMenu] = useState(false);
    const [showEdgeDirMenu, setShowEdgeDirMenu]   = useState(false);
    const [showEdgeBehaviorMenu, setShowEdgeBehaviorMenu]   = useState(false);

    const { setValueBeforeChange, addHistory  } = UseReactFlowUndoable();
    
    useEffect(() => {
        setShowEdgeDirMenu( false );
        setShowEdgeTypeMenu( false );
    }, [ showEdgeContextMenu ]); 

    function changeBorderColor( color?: string ) {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectedEdgeId :string[] = [];
        const oldvalues: any[] = [];
        const newvalues: any[] = [];

        ctd.forEach( (edgeid :string) => {
            const currentEdge = getEdge( edgeid ) as any;
            if( !currentEdge )                      return;
            if( currentEdge.style && currentEdge.style.stroke == color ) return;
            
            affectedEdgeId.push( edgeid );
            const edgeMarker = currentEdge.markerEnd   ? { ...currentEdge.markerEnd,   color } : undefined;
            const edgeStart  = currentEdge.markerStart ? { ...currentEdge.markerStart, color } : undefined;

            oldvalues.push( {
                markerEnd:   currentEdge.markerEnd,
                markerStart: currentEdge.markerStart,
                style:       currentEdge.style ? currentEdge.style : { stroke: DEFAULTEDGECOLOR },
            });
            newvalues.push( {
                markerEnd:   edgeMarker,
                markerStart: edgeStart,
                style:       { stroke: color },
            });

            updateEdge(
                currentEdge.id, {
                    markerEnd:   edgeMarker,
                    markerStart: edgeStart,
                    style:  { stroke: color },
                }
            );
        });
        if(affectedEdgeId.length > 0) addHistory({
            type:      'edgecolor',
            id:        affectedEdgeId,
            oldvalues: oldvalues,
            newvalues: newvalues
        });
    }

//==================================================================================
    function changeAnimation() {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectedEdgeId :string[] = [];
        const oldvalues: any[] = [];
        const newvalues: any[] = [];
        ctd.forEach( (edgeid :string) => {
            const currentEdge = getEdge( edgeid ) as any;
            if( !currentEdge )                      return;
            oldvalues.push( {
                animated: currentEdge.animated 
            });
            newvalues.push( {
                animated: !currentEdge.animated
            });
            affectedEdgeId.push( edgeid );
            updateEdge( edgeid, { animated: !currentEdge.animated } );
        });
        if(affectedEdgeId.length > 0) addHistory({
            type:      'edgeanimation',
            id:        affectedEdgeId,
            oldvalues: oldvalues,
            newvalues: newvalues,
        });
    }

//==================================================================================
    function changePathDrawing( path : 'bezier' | 'smooth' | 'straight') {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectedEdgeId :string[] = [];
        const oldvalues: any[] = [];
        const newvalues: any[] = [];
        ctd.forEach( (edgeid :string) => {
            const currentEdge = getEdge( edgeid ) as Edge;
            if( !currentEdge )                      return;
            updateEdgeData( edgeid, { pathtype: path } );
            oldvalues.push({ pathtype: currentEdge.data?.pathtype ?? 'bezier'  });
            newvalues.push({ pathtype: path });
            affectedEdgeId.push( edgeid );
        });
        if(affectedEdgeId.length > 0) addHistory({
            type:      'edgepath',
            id:        affectedEdgeId,
            oldvalues: oldvalues,
            newvalues: newvalues
        })
    }

//==================================================================================
    function deleteEdge() {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectedEdgeId :string[] = [];
        const oldvalues: any[] = [];
        ctd.forEach( (edgeid :string) => {
            const currentEdge = getEdge( edgeid ) as any;
            if( !currentEdge )                      return;
            oldvalues.push( currentEdge );
            affectedEdgeId.push( edgeid );
        });
        deleteElements( { edges: oldvalues } );
        if(affectedEdgeId.length > 0) addHistory({
            type:      'edgedelete',
            id:        affectedEdgeId,
            oldvalues: oldvalues,
            newvalues: [],
        });
    }

//==================================================================================
    function EditLabel(e : any) {
        e.stopPropagation();
        if( contextTriggeringData.length > 1 ) {
            showModal('prompt', 'Label Text', 'Enter New Label Text For All Selected Edges', '', (label: string) => {
                const affectedEdgeId :string[]      = [];
                const oldvalues: { label :string}[] = [];
                const newvalues: { label :string}[] = [];
    
                contextTriggeringData.forEach( (edge :any) => {
                    const currentEdge = getEdge( edge ) as any;
                    if( !currentEdge ) return;
                    affectedEdgeId.push( edge );

                    if( currentEdge.data != undefined && currentEdge.data.label != undefined)
                        oldvalues.push( { label: currentEdge.data.label } );
                    else
                        oldvalues.push( { label: '' });

                    newvalues.push( { label: label } );
                    updateEdgeData ( edge, { label: label });
                })
                showContextMenu( 'none' );
                if(affectedEdgeId.length > 0) addHistory({
                    type:      'edgelabel',
                    id:        affectedEdgeId,
                    oldvalues: oldvalues,
                    newvalues: newvalues
                });
            })
        }

        else {
            const edgeId      = contextTriggeringData[0];
            const currentEdge = getEdge( edgeId ) as any;
            const edgeLabel   = currentEdge.data?.label ?? '';
            showContextMenu( 'none', undefined, contextTriggeringData );
            setOptions     ( { panOnDrag: false } as any );
            updateEdgeData ( edgeId, { showTextInput: true });
            setValueBeforeChange([{ label: edgeLabel }]);
            setTimeout(() => { 
                showEdgeTextEditor( true, edgeId, edgeLabel as string );
            }, 0);
        }
    }

//==================================================================================
    function changeArrowDirection(arrowType: 'source-target' | 'both' | 'none') {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectedEdgeId :string[] = [];
        const oldvalues: any[] = [];
        const newvalues: any[] = [];
        ctd.forEach( (edgeid :string) => {
            const currentEdge = getEdge( edgeid ) as any;
            if( !currentEdge )                      return;
            const edgeSize   = currentEdge.markerEnd      ? currentEdge.markerEnd.width   : DEFAULTARROWSIZE;
            const edgeColor  = currentEdge.style?.stroke ?? DEFAULTEDGECOLOR;

            switch( arrowType ) {
                case 'source-target':
                    const edgeMarker =  currentEdge.markerEnd  ??
                        {   type: MarkerType.ArrowClosed,
                            width:  edgeSize,
                            height: edgeSize,
                            color:  edgeColor, 
                        };
                    updateEdge( currentEdge.id, { markerStart: undefined, markerEnd: edgeMarker } ); 
                    oldvalues.push( {
                        markerStart: currentEdge.markerStart,
                        markerEnd:   currentEdge.markerEnd
                    });
                    newvalues.push( {
                        markerStart: undefined,
                        markerEnd:   edgeMarker,
                    });
                    affectedEdgeId.push( edgeid );
                    break;
                
                case 'both':
                    const markerEndDef = currentEdge.markerEnd  ??
                        {   type: MarkerType.ArrowClosed,
                            width:  edgeSize,
                            height: edgeSize,
                            color:  edgeColor, 
                        };
                    const markerStart = {
                        type:   MarkerType.ArrowClosed,
                        orient: 'auto-start-reverse',
                        color:  edgeColor,
                        width:  edgeSize,
                        height: edgeSize,
                    }
                    updateEdge( currentEdge.id, {
                        markerEnd:   markerEndDef,
                        markerStart: markerStart
                    });
                    oldvalues.push( {
                        markerStart: currentEdge.markerStart,
                        markerEnd:   currentEdge.markerEnd
                    });
                    newvalues.push( {
                        markerStart: markerStart,
                        markerEnd:   markerEndDef,
                    });
                    affectedEdgeId.push( edgeid );
                    break;
    
                case 'none':
                    updateEdge( currentEdge.id, { markerStart: undefined, markerEnd: undefined } );
                    oldvalues.push( {
                        markerStart: currentEdge.markerStart,
                        markerEnd:   currentEdge.markerEnd
                    });
                    newvalues.push( {
                        markerStart: undefined,
                        markerEnd:   undefined,
                    });
                    affectedEdgeId.push( edgeid );
                    break;
            }
            if(affectedEdgeId.length > 0) addHistory({
                type:      'edgearrow',
                id:        affectedEdgeId,
                oldvalues: oldvalues,
                newvalues: newvalues,
            });                
        })
    }

//==================================================================================
    function changeType( type: 'default' | 'floating') {
        showContextMenu( 'none' );
        const ctd = contextTriggeringData as string[];
        const affectedEdgeId :string[] = [];
        const oldvalues: any[] = [];
        const newvalues: any[] = [];
        ctd.forEach( (edgeid :string) => {
            const currentEdge = getEdge( edgeid ) as any;
            if( !currentEdge )                      return;
            oldvalues.push( {
                type: currentEdge.type ?? 'default'
            });
            newvalues.push({
                type
            });
            affectedEdgeId.push( edgeid );
            updateEdgeData( edgeid, { type } );  
        });
        if(affectedEdgeId.length > 0) addHistory({
            type:      'edgebehavior',
            id:        affectedEdgeId,
            oldvalues: oldvalues,
            newvalues: newvalues,
        });
    }

    if(showEdgeContextMenu) {
        const contextWidth  = 320;
        const contextHeight = contextTriggeringData.length > 1 ? 108 : 78;
        return (
            <div style={{
                position: 'absolute',
                top:      `${ contextMenuPosition.y - contextHeight - 0    }px`,
                left:     `${ contextMenuPosition.x - ( contextWidth / 2 ) }px`,
                zIndex:    10,
                width:    `${contextWidth}px`,
                height:   `${contextHeight}px`,
            }}
            className="select-none border dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 py-2 px-2 shadow-lg"
            >
                { contextTriggeringData.length > 1 && 
                    <p className="text-center text-gray-500 text-sm pb-2 "> Multiple <b>Items</b> Are Selected </p>
                }

               <div className="flex w-full justify-between">
                    <div className="w-6 h-6 rounded-full  bg-blue-500  hover:border-2 hover:border-white" onClick={() => changeBorderColor("#2196f3")}></div>
                    <div className="w-6 h-6 rounded-full bg-red-600    hover:border-2 hover:border-white" onClick={() => changeBorderColor("#DC2626"   )}></div>
                    <div className="w-6 h-6 rounded-full bg-orange-400 hover:border-2 hover:border-white" onClick={() => changeBorderColor("#FFA726")}></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-300 hover:border-2 hover:border-white" onClick={() => changeBorderColor("#F7DC6F")}></div>
                    <div className="w-6 h-6 rounded-full bg-green-400  hover:border-2 hover:border-white" onClick={() => changeBorderColor("#34C759" )}></div>
                    <div className="w-6 h-6 rounded-full bg-cyan-500   hover:border-2 hover:border-white" onClick={() => changeBorderColor("#00bcd4")}></div>
                    <div className="w-6 h-6 rounded-full bg-violet-700 hover:border-2 hover:border-white" onClick={() => changeBorderColor("#7A0BC0")}></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500   hover:border-2 hover:border-white" onClick={() => changeBorderColor("#9E9E9E")}></div>
                    <div className="w-6 h-6 rounded-full bg-black      hover:border-2 hover:border-white" onClick={() => changeBorderColor("#000")}></div>
                </div>
                <div className="flex w-full justify-between mt-3">
                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={EditLabel} >
                        { /* @ts-ignore */ }
                        <BiText className="w-full h-full text-gray-500" />
                    </div>

                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={() => {
                        setShowEdgeTypeMenu( !showEdgeTypeMenu );
                        setShowEdgeDirMenu(false);
                        setShowEdgeBehaviorMenu(false);
                    }} >
                        { /* @ts-ignore */ }
                        <IoGitNetwork className="w-full h-full text-gray-500" />
                    </div>

                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={() => {
                        setShowEdgeTypeMenu(false );
                        setShowEdgeDirMenu( !showEdgeDirMenu );
                        setShowEdgeBehaviorMenu(false);
                    }} >
                        { /* @ts-ignore */ }
                        <FaArrowPointer className="w-full h-full text-gray-500" />
                    </div>

                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={changeAnimation}>
                        { /* @ts-ignore */ }
                        <MdAnimation className="w-full h-full text-gray-500" />
                    </div>
                    
                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={() => {
                        setShowEdgeTypeMenu(false );
                        setShowEdgeDirMenu( false );
                        setShowEdgeBehaviorMenu( !showEdgeBehaviorMenu );
                    }}>
                        { /* @ts-ignore */ }
                        <IoOptionsSharp className="w-full h-full text-gray-500" />
                    </div>

                    <div className="w-full h-6 mx-1 rounded-full  border border-gray-300 dark:border-gray-700  p-1 hover:bg-gray-200 dark:hover:bg-gray-600" onClick={deleteEdge}>
                        { /* @ts-ignore */ }
                        <MdDelete className="w-full h-full text-red-500" />
                    </div>
                </div>
                
                { /* @ts-ignore */ }
                <ContextMenu
                    position={{ x: 100,  y: 60 }}
                    show={ showEdgeTypeMenu }
                    items={[
                        /* @ts-ignore */
                        { text: "Bezier (Default)", icon: <BsBezier2      color="gray" />, onClick: () => changePathDrawing('bezier')},
                        /* @ts-ignore */
                        { text: "Smooth Step",      icon: <FaArrowTrendUp color="gray" />, onClick: () => changePathDrawing('smooth')},
                         /* @ts-ignore */
                        { text: "Straight Line",    icon: <GiStraightPipe color="gray" />, onClick: () => changePathDrawing('straight')},
                    ]}
                />

                { /* @ts-ignore */ }
                <ContextMenu
                    position={{ x: 150,  y: 60 }}
                    show={ showEdgeDirMenu }
                    items={[
                        /* @ts-ignore */
                        { text: "Source To Target", icon: <FaLongArrowAltLeft className="rotate-45" color="gray" />, onClick: () => changeArrowDirection('source-target')},
                        /* @ts-ignore */
                        { text: "Both Directions",  icon: <FaArrowsAltH       className="rotate-45" color="gray" />, onClick: () => changeArrowDirection('both') },
                        /* @ts-ignore */
                        { text: "No Arrow",         icon: <GiStraightPipe     className="rotate-45" color="gray" />, onClick: () => changeArrowDirection('none') },
                    ]}
                />

                { /* @ts-ignore */ }
                <ContextMenu
                    position={{ x: 240,  y: 60 }}
                    show={ showEdgeBehaviorMenu }
                    items={[
                        /* @ts-ignore */
                        { text: "Default Behavior", icon: <IoOptionsSharp  color="gray" />, onClick: () => changeType('default') },
                        /* @ts-ignore */
                        { text: "Floating Edge",    icon: <IoOptionsSharp  color="gray" />, onClick: () => changeType('floating') }
                    ]}
                />
            </div>
        )
    }
}
