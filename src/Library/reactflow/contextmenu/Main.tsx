import ContextMenu      from "@/components/ui/ContextMenu";
import { useReactFlow, Node } from "@xyflow/react";
import useFlowState, { GETBASECLIP }           from "../core";
import filterDataForStorage   from "../lib/filterDataForStorage";

import { MdAnimation }      from "react-icons/md";
import { VscDebugConsole }  from "react-icons/vsc";
import { BsBack }           from "react-icons/bs";
import { FaImage, FaPaste }          from "react-icons/fa";
import UseReactFlowUndoable from "../core/lib/ReactFlowUndoable";

import { FaUndoAlt }  from "react-icons/fa";
import { FaRedo }     from "react-icons/fa";
import { GrSelect }   from "react-icons/gr";

import OpenFileImage  from "../lib/OpenImage";
import AdjustNodeSize from "./helpers/adjustNodeSize";
import { useToast }   from "../core/Toast";

export default function MainContextMenu() {
    const showMainContextMenu = useFlowState.use.showMainContextMenu();
    const contextMenuPosition = useFlowState.use.contextMenuPosition();
    const showContextMenu       = useFlowState.use.showContextMenu();
    const { getNodes, getEdges, setEdges, addNodes, screenToFlowPosition } = useReactFlow();
    const { addHistory, undo, redo } = UseReactFlowUndoable();
    const { showToast } = useToast();

    function AnimateAllEdges( willAnimate: boolean ) {
        const edges    = getEdges();
        const newEdges = edges.map( (edge) => {
            return {  ...edge,  animated: willAnimate };
        });
        setEdges( newEdges );
        showContextMenu( 'none' );

        const previusAllEdgesAnimation = edges.map( (edge) => {
            return {
                animated: edge.animated ?? undefined,
                id:       edge.id
            }
        });

        addHistory({
            type:      'edgeAllAnim',
            id:        [ ],
            oldvalues: [ ...previusAllEdgesAnimation ],
            newvalues: [ willAnimate ]
        });
    }

    function ConsoleLogData() {
        const data = filterDataForStorage( getNodes(), getEdges() );
        console.log( JSON.stringify( data ) );
    }

    function addNode() {
        const id       = `${Date.now().toString(36)}`;
        const position = screenToFlowPosition({
            x: contextMenuPosition.x + 5 + GETBASECLIP().left, 
            y: contextMenuPosition.y + 5 + GETBASECLIP().top,
        });

        const newNode :Node = {
            id,
            position: position,
            data: { label: "" }, 
            type: 'default',
        };
        addNodes( newNode );
        showContextMenu( 'none' );

        addHistory({
            type:      'newnode',
            id:        [id],
            newvalues: [newNode],
            oldvalues: []
        })
    }

    function addImageNode() {
        const id       = `${ Date.now() }`;
        const position = screenToFlowPosition({
            x: contextMenuPosition.x + 5, 
            y: contextMenuPosition.y - 40
        });
        showContextMenu( 'none' );

        OpenFileImage( (file :any, content, width, height) => {
            const fileType = file.name.split('.').pop();
            const nodeSize = AdjustNodeSize( fileType, width, height );
            const nodeName = file.name.slice(0, file.name.lastIndexOf('.'));
            const newNode :Node = {
                id,
                position: position,
                width:    nodeSize.width,
                height:   nodeSize.height,
                data: { 
                    label:         nodeName,
                    image:         content,
                    imageFileType: fileType,
                }, 
                type: 'default',
            };
            addNodes( newNode );
            addHistory({
                type:      'newnode',
                id:        [id],
                newvalues: [newNode],
                oldvalues: []
            })
        })
    }

    function startSelection() {
        showToast('Click and Drag Right Mouse Button', 'mouse');
        showContextMenu( 'none' );
    }

    //for some reason, hooks useEdits() do not work here, so we need to simulate it
    function simulateKeyPress( key :string) {
        const element = document.getElementById("ReactFlowBaseContainer") as HTMLDivElement;
        const event = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key,
            ctrlKey: true
        });
        element.dispatchEvent(event);
        showContextMenu('none')
    }

    return (
        <ContextMenu
            position={{
                x: contextMenuPosition.x + 5, 
                y: contextMenuPosition.y 
            }}
            show={showMainContextMenu}
            items={[
                { text: "Add Node",        icon:  <BsBack />,  onClick: addNode },
                { text: "Add Image Node",  icon:  <FaImage />, onClick: addImageNode },
                { text: "" },
                { text: "Animate All Edges", icon: <MdAnimation  />,  onClick:() => { AnimateAllEdges(true)  } },
                { text: "Remove Animation",  icon: <MdAnimation  />,  onClick:() => { AnimateAllEdges(false) } },
                { text: "" },

                { text: "Selection Mode",       icon:  <GrSelect />,  onClick: startSelection },
                { text: "" },

                { text: "Undo",  icon: <FaUndoAlt  />, onClick:() => { undo(); showContextMenu( 'none' ); }, keyboardtext: 'ctrl+z' },
                { text: "Redo",  icon: <FaRedo  />,    onClick:() => { redo(); showContextMenu( 'none' ); }, keyboardtext: 'ctrl+shift+z' },
                { text: "Paste", icon: <FaPaste />, keyboardtext: 'ctrl+v', onClick: () => simulateKeyPress('v')},
                { text: "" },

                { text: "Console Log Data",  icon: <VscDebugConsole  />,  onClick: ConsoleLogData },
            ]}
        />
    )
}
