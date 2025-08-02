import ContextMenu    from "@/components/ui/ContextMenu";
import useFlowState, { GETBASECLIP }   from "../core";
import { BsBack }        from "react-icons/bs";
import { IoGitNetwork }  from "react-icons/io5";
import { FaCopy }        from "react-icons/fa6";
import { FaCut }         from "react-icons/fa";
import { FaPaste }       from "react-icons/fa6";
import { FaUndoAlt }     from "react-icons/fa";
import { FaRedo }        from "react-icons/fa";
import { MdDelete }      from "react-icons/md";

import { useReactFlow, Node, Edge } from "@xyflow/react";
import UseReactFlowUndoable from "../core/lib/ReactFlowUndoable";

export default function MultipleContextMenu() {
    const { getNode, getEdges, deleteElements, setEdges, getNodes } = useReactFlow();
    const { addHistory, undo, redo } = UseReactFlowUndoable();
    const contextTriggeringData = useFlowState.use.contextTriggeringData() as any;
    const contextMenuPosition   = useFlowState.use.contextMenuPosition();
    const showContextMenu       = useFlowState.use.showContextMenu();

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

    function deleteNode() {
        const ctd = contextTriggeringData.nodes as string[];
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

    return (
        <ContextMenu
            position={{
                x: contextMenuPosition.x + 5, 
                y: contextMenuPosition.y 
            }}
            show={true}
            items={[
                { text: "Adjust Node",  icon:  <BsBack />, onClick: (e) => {
                    const { left, top } = GETBASECLIP();
                    showContextMenu("node", 
                        { 
                            x: e.clientX - left, 
                            y: e.clientY - top + 24,
                        },
                        [...contextTriggeringData.nodes ]  as string[]
                    )}},
                { text: "Adjust Edge",  icon:  <IoGitNetwork />, onClick: (e) => {
                    const { left, top } = GETBASECLIP();
                    showContextMenu("edge", 
                        { 
                            x: e.clientX - left, 
                            y: e.clientY - top + 24,
                        },
                        [...contextTriggeringData.edges ]  as string[]
                    )}},
                { text: "" },

                { text: "Paste", icon: <FaPaste />, keyboardtext: 'ctrl+v', onClick: () => simulateKeyPress('v')},
                { text: "Copy",  icon: <FaCopy />,  keyboardtext: 'ctrl+c', onClick: () => simulateKeyPress('c')},
                { text: "Cut",   icon: <FaCut />,   keyboardtext: 'ctrl+x', onClick: () => simulateKeyPress('x')},
                { text: "" },

                { text: "Undo",  icon: <FaUndoAlt  />, onClick:() => { undo(); showContextMenu( 'none' ); }, keyboardtext: 'ctrl+z' },
                { text: "Redo",  icon: <FaRedo  />,    onClick:() => { redo(); showContextMenu( 'none' ); }, keyboardtext: 'ctrl+shift+z' },

                { text: "" },
                { text: "Delete", icon: <MdDelete />, onClick: deleteNode },
            ]}
        />
    )
}
