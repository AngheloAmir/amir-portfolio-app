/**
 * The Base style of a node
 * This component adds the following features:
 * - Resizing
 *      Which show a resizer when the node is selected
 * - Connection handles
 *      Which show a handle when the node is selected and remove the handle
 *      when the "adding edge started"
 * 
 *  A node can be added according to: https://reactflow.dev/examples/nodes/custom-node
 *  but in order to avoid copying the same code allover again, we use the BaseNode
 */
import { Handle, Position, useConnection, NodeResizer, useReactFlow } from '@xyflow/react';
import { useCallback, useEffect,  useRef,  useState } from 'react';
import { NodeParam } from '../../core';
import UseReactFlowUndoable from '../../core/lib/ReactFlowUndoable';
import { positions } from 'slate';
import { NODE_width, NODE_height } from '..';

interface Props {
    children?: React.ReactNode;
    nodeData : NodeParam;
    keepAspectRatioOfTheResize? : boolean;
    resizerMinWidth?:  number;
    resizerMinHeight?: number;

    /**Tell whether to show the add button (add edges) in a node. 
     * This is used with textarea, so let say the user is editing the node we want to hide those add button 
     * as it obstruct the texteditor to the user
     */
    canShowAddNodes? :boolean;
}

export default function BaseNode( props: Props) {
    const { addHistory } = UseReactFlowUndoable();
    const sizeTemp       = useRef({ width: 0, height: 0, position: { x: 0, y: 0 } });

    const { getNode }      = useReactFlow();
    const connection       = useConnection();
    const isTarget         = connection.inProgress && connection.fromNode.id !== props.nodeData.id;

    const [isSelected, setSelected]     = useState(false);
    const [showResizer, setShowResizer] = useState(false);
    const [isResizing, setIsResizing]   = useState(false);
    const [nodeSize, setNodeSize]       = useState({ width: props.nodeData.width, height: props.nodeData.height });
    const initialSize  = useRef({ width: props.nodeData.width, height: props.nodeData.height });

    useEffect (() => {
        setSelected( props.nodeData.selected);
        setShowResizer( props.nodeData.selected );
    }, [ props.nodeData.selected ]);

    useEffect (() => {
        if( connection.inProgress ) 
            setShowResizer(false);
        else {
            if( isSelected )
                setShowResizer(true);
            else
                setShowResizer(false);
        }
    }, [ connection.inProgress, isSelected ]);

    const onResizeStart = useCallback(() => {
        const currentNode = getNode( props.nodeData.id ) as any;
        if(!currentNode) return;
        sizeTemp.current = {
            height:     currentNode.height,
            width:      currentNode.width,
            position:   currentNode.position,
        };
        setNodeSize({
            width:  currentNode.width   ?? NODE_width,
            height: currentNode.height ?? NODE_height
        });
        initialSize.current = { width: currentNode.width, height: currentNode.height };
        setIsResizing(true);
    }, []);

    const onResize = useCallback(() => {
        const currentNode = getNode( props.nodeData.id ) as any;
        if(!currentNode) return;
        setNodeSize({ 
            width:  currentNode.width,
            height: currentNode.height
        });
    }, []);

    const onResizeEnd = useCallback(() => {
        const currentNode = getNode( props.nodeData.id );
        if(!currentNode) return;
        setIsResizing(false);

    //check if this actuall has changed
        if( initialSize.current.width === nodeSize.width && initialSize.current.height === nodeSize.height )
            return;

        addHistory({
            type: 'noderesize',
            id:   [ props.nodeData.id ],
            oldvalues: [ {
                height:   sizeTemp.current.height,
                width:    sizeTemp.current.width,
                position: sizeTemp.current.position
            }],
            newvalues: [{
                height:    currentNode.height,
                width:     currentNode.width,
                position:  currentNode.position
            }]
        });
    }, []);

    return (
        <>
        {  isResizing &&
            <div className='absolute -top-7 -right-4 bg-gray-100 dark:bg-gray-800 rounded px-2 text-xs text-gray-600 dark:text-gray-300 tracking-wider font-thin'>
                { nodeSize.width } x { nodeSize.height }
            </div>
        }

        { !connection.inProgress && (
            <>
                <Handle type="source" position={Position.Top}     id="a" className='opacity-0 zerosize' />
                <Handle type="source" position={Position.Right}   id="b" className='opacity-0 zerosize' />
                <Handle type="source" position={Position.Bottom}  id="c" className='opacity-0 zerosize' />
                <Handle type="source" position={Position.Left}    id="d" className='opacity-0 zerosize'  />
            </>
        )}

        {(connection.inProgress && !isSelected && isTarget ) && (
            <Handle type="source" position={Position.Top}     id="a" className='handleOnConnect'/>
        )}
        
        {(isSelected && !connection.inProgress && props.canShowAddNodes) && (
            <>
                <Handle type="source" position={Position.Top}     id="a" className='addicon' />
                <Handle type="source" position={Position.Right}   id="b" className='addicon' />
                <Handle type="source" position={Position.Bottom}  id="c" className='addicon' />
                <Handle type="source" position={Position.Left}    id="d" className='addicon' />
            </>
        )}

        { props.children }

        <NodeResizer
            isVisible={ showResizer && !props.nodeData.data.showTextInput }
            minWidth={ props.resizerMinWidth   ?? 80 }
            minHeight={ props.resizerMinHeight ?? 35 }
            keepAspectRatio={ props.keepAspectRatioOfTheResize }
            color="#99b"
            handleStyle={{ width: '18px',       height:      '18px',     opacity: 0.6 }}
            lineStyle={{   borderColor: '#99b', borderWidth: '2px', borderRadius: '2px', opacity: 0.6, borderStyle: 'dashed'}}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
        />
    </>
    );
}
