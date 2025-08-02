/*
 * This file defines the look of the nodes and edges in ReactFlow.
 * You can also define your own custom nodes and edges.
 * 
 * In ReactFlow, each node and edges are essentially a React component
 * and thus can access many hooks and context states which make it very
 * versitile and powerful.
 * 
 * See the official documentation for more details:
 *  https://reactflow.dev/examples/nodes/custom-node
*/

/** Defines the type of a custom node created for this project */
export type CustomNodeTypes = 
    'default'    |
    'imageType'  |
    'terminator' |
    'io'         |
    'diamond'    |
    'document'   |
    'predefinedProcess' |

    'advancedDocumentNode'
;

/**This values should be same with the values in the CSS */
export const NODE_width  = 210; //240;
export const NODE_height = 64;  //72;

//=================================================================================================
import Node       from './node/Node';
import Terminator from './node/flowchart/Terminator';
import IO         from './node/flowchart/IO';
import Diamond    from './node/flowchart/Diamond';
import Document   from './node/flowchart/Document';
import PredefProcess       from './node/flowchart/PredefProcess';
import AdvanceDocumentNode from './node/advance/AdvanceDocumentNode';

export const nodeTypes = {
    default:   Node,

    //flowchart
    terminator: Terminator,
    io:         IO,
    diamond:    Diamond,
    document:   Document,
    predefinedProcess: PredefProcess,

    //advanced
    advancedDocumentNode: AdvanceDocumentNode,
};

//=================================================================================================
import Edge      from './edge/Edge';
export type CustomEdgeTypes = 
    'default'    |
    'none'
;

export const edgeTypes = {
    default:   Edge,
};
