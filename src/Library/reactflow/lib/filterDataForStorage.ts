import { Edge, Node } from "@xyflow/react";

/** If we want to get the nodes and edges data for storage, we only
 * need to get the variables that is needed.
 * because some of the data is not needed for the  storage
 */
export default function filterDataForStorage(nodes :Node[], edges :Edge[]) {
    const newNodes :any = [];
    const newEdges :any = [];

    for(let i = 0; i < nodes.length; i++) {
        newNodes.push({
            id:         nodes[i].id,
            position:   nodes[i].position,
            type:       nodes[i].type ?? 'default',
            data:       nodes[i].data ?? { label: '' },
            width:      nodes[i].width,
            height:     nodes[i].height,
            measured:   nodes[i].measured,
        });
    }

    for(let i = 0; i < edges.length; i++) {
        newEdges.push({
            id:             edges[i].id,
            source:         edges[i].source,
            target:         edges[i].target,
            sourceHandle:   edges[i].sourceHandle,
            targetHandle:   edges[i].targetHandle,
            type:           edges[i].type,
            data:           edges[i].data,
            animated:       edges[i].animated,
            markerEnd:      edges[i].markerEnd,
            style:          edges[i].style
        });
    }

    return { 
        nodes: newNodes, 
        edges: newEdges
    };
}
