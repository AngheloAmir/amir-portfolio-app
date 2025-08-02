import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useRef, useCallback, useEffect } from "react";
import ActiveElements  from "../ActiveElements";
import { useToast }    from "../Toast";
import { useMouseLoc } from "../Selection";
import { NODE_height, NODE_width } from "../../custom";
import UseReactFlowUndoable from "./ReactFlowUndoable";

export default function UseEdits() {
    const { getNode, getEdge, getEdges, screenToFlowPosition, addNodes, addEdges, deleteElements } = useReactFlow();
    const { addHistory }       = UseReactFlowUndoable();
    const { clearSelection }   = ActiveElements();
    const { showToast }        = useToast();
    const position             = useMouseLoc.use.position();
    const Copies   = useRef<{nodes :Node[], edges:Edge[]}>({nodes:[], edges:[]});
    const NodeIDS  = useRef<string[]>([]);
    const MouseLoc = useRef({x:0, y:0});
    
    const {
        selectedNodes,
        selectedEdges,
    } = ActiveElements();

    const setCopies = useCallback((value :{nodes :Node[], edges:Edge[]}) => {
        console.log('not working');
    }, []);

    const setCopiesFromIds = useCallback((nodes :string[], edges:string[] ) => {
        console.log('not working');
    }, []);
 
    const getCopies = useCallback(() => {
        return Copies.current;
    }, []);

    const selectedNodesRef = useRef(selectedNodes);
    const selectedEdgesRef = useRef(selectedEdges);
    useEffect(() => {   
        selectedNodesRef.current = selectedNodes;
        selectedEdgesRef.current = selectedEdges;
    }, [selectedNodes, selectedEdges]);
    useEffect(() => {
        MouseLoc.current = position;
    }, [position]);

    const ctrlc = useCallback(() => {
        if(selectedNodesRef.current.length > 0) {
            Copies.current.nodes = [];
            NodeIDS.current      = [];
            selectedNodesRef.current.forEach((id) => {
                const nodes = getNode( id ) as Node;
                Copies.current.nodes.push(nodes);
                NodeIDS.current.push( nodes.id );
            })
        }
        if(selectedEdgesRef.current.length > 0) {
            Copies.current.edges = [];
            selectedEdgesRef.current.forEach((id) => {
                const edges = getEdge( id ) as Edge;
                Copies.current.edges.push(edges);
            })
        }
        showToast( 'Copied', 'info' );
    }, []);

    const ctrlv = () => {
        clearSelection();
        
        const canvasPos = screenToFlowPosition( MouseLoc.current );
        if( Copies.current.nodes.length == 0 ) {
            showToast( 'Nothing to paste', 'info' );
            return
        }
        
    //before we paste the new node, we need to create a new sets of id
        const newNodesId :{from: string, to :string}[] = [];
        Copies.current.nodes.map((node, index) => {
            const newId = `${ (Date.now() + index).toString(36) }`;
            newNodesId.push({
                from: node.id,
                to: newId
            }) 
        });

    //when we copy nodes, we want them to align relative to the mouse cursor
        const topLeftmostNode = Copies.current.nodes.reduce((minNode, currentNode) => {
            return (
              currentNode.position.x < minNode.position.x ||
              (currentNode.position.x === minNode.position.x && currentNode.position.y < minNode.position.y)
            ) ? currentNode : minNode;
        }, Copies.current.nodes[0] );

    //this now create a new set of nodes with new IDs
        const NewNodes :Node[] = [];
        const NewNodesIds :string[] = [];
        Copies.current.nodes.map((node, index) => {
            NewNodes.push({
                ...node,
                id: newNodesId[index].to,
                position: {
                    x: canvasPos.x - (topLeftmostNode.position.x - node.position.x) - (NODE_width / 2),
                    y: canvasPos.y - (topLeftmostNode.position.y - node.position.y) - (NODE_height / 2),
                }
            });
            NewNodesIds.push( newNodesId[index].to );
        });
 
    //create a new set of edges with id and with new node id
        const NewEdges :Edge[] = [];
        Copies.current.edges.map((edges, index) => {
            const sourceNode = newNodesId.find( (val) => val.from == edges.source )?.to as any;
            const targetNode = newNodesId.find( (val) => val.from == edges.target )?.to as any;
            const newId      = `${ (Date.now() + index).toString(36) }`;
            NewEdges.push({
                ...edges,
                id:     newId,
                source: sourceNode,
                target: targetNode,
            })
        });

        addNodes( NewNodes );
        addEdges( NewEdges );

        addHistory({
            type:      'pasteElements',
            id:        NewNodesIds,
            newvalues: [{
                nodes: NewNodes,
                edges: NewEdges
            }],
            oldvalues: []
        });
        showToast( 'Paste', 'info' );
    }

    const ctrlx = useCallback(() => {
    //This is same as with the crtl.
    //I need to rewrite because it does not work correctly
        if(selectedNodesRef.current.length > 0) {
            Copies.current.nodes = [];
            NodeIDS.current      = [];
            selectedNodesRef.current.forEach((id) => {
                const nodes = getNode( id ) as Node;
                Copies.current.nodes.push(nodes);
                NodeIDS.current.push( nodes.id );
            })
        }
        if(selectedEdgesRef.current.length > 0) {
            Copies.current.edges = [];
            selectedEdgesRef.current.forEach((id) => {
                const edges = getEdge( id ) as Edge;
                Copies.current.edges.push(edges);
            })
        }
    
    //after copying all nodes, we need to delete them
    //there are edges that are not included in the copies will get deleted because they 
    //loose a valid connect (must have both source and target nodes)
    //so we need to get those for us make the undo possible
        const allEdgesThatHasConnectionWithSelecteedElements = getEdges().filter((edge) => {
            if( NodeIDS.current.find( thisnode => edge.source == thisnode || edge.target == thisnode ) )
                return edge;
            return null;
        });

    //we get only edges that have no matching pair inside the selected nodes
        const edgesToDelete :Edge[] = [];
        allEdgesThatHasConnectionWithSelecteedElements.map((edge) => {
            const hasSourceInside = NodeIDS.current.find( thisnode => edge.source == thisnode );
            const hasTargetInside = NodeIDS.current.find( thisnode => edge.target == thisnode );
            if( !hasSourceInside || !hasTargetInside ) 
                edgesToDelete.push(edge);
        });

        deleteElements({
            nodes: Copies.current.nodes,
            edges: [...Copies.current.edges, ...edgesToDelete ]
        });

        addHistory({
            type:      'cutElements',
            id:        NodeIDS.current,
            oldvalues: [
        //do note that, in cut elements the first element contains the copied elements
        //then the second element contains edges that has no valid connection after the cut
            {
                nodes: Copies.current.nodes,
                edges: Copies.current.edges
            },
            {
                edges: edgesToDelete
            }
            ],
            newvalues: []
        });
        showToast( 'Cut', 'info' );
    }, []);
 
    return {
        setCopies,
        setCopiesFromIds,
        getCopies,

        ctrlc,
        ctrlv,
        ctrlx,
    }
}
