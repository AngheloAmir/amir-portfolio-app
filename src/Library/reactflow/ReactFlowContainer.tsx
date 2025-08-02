import '@xyflow/react/dist/style.css';
import './core/style.css';
import './custom/node/style/handle.css';
import './custom/node/style/customNodeStyles.css';

import {  ReactFlow, useReactFlow, OnNodesChange, Edge, Node } from '@xyflow/react';
import React, { useCallback, useEffect, useRef,  } from 'react';
import { edgeTypes, nodeTypes } from './custom';
import DragNDropNodes from './features/DragNDropNodes';
import HelperLines    from './features/HelperLine';
import Toast          from './core/Toast';

import useFlowState             from './core';
import ContentMenuContainer     from './contextmenu';
import EdgeTextEditor           from './contextmenu/EdgeTextEditor';

import Selection, { useSelections } 
                                from './core/Selection';
import OncloseContextMenus      from './core/CloseContextMenus';
import HelperLine               from './core/HelperLines';
import DragAndDrop              from './core/DragAndDrop';
import AddNodeOnDrop            from './core/AddNodeOnDrop';
import BackspaceDelete          from './core/BackspaceDelete';
import ElementEvents            from './core/ElementEvents';
import ActiveElements           from './core/ActiveElements';
import GetAllSelectedElements   from './core/GetAllSelectedElements';
import KeyCapture               from './core/KeyCapture';

interface Props {
    theme: string;
}

/**This component including all others inside the folder "reactflow" is a 
 * stand alone components. This is done to make this very easy edit and add changes without
 * distributing the whole project.
 * 
 * In order to change the ReactFlow data, the page.tsx must be contain the <ReactFlowProvider>
 * 
 * @example
 * function page() {
*     return (
*         <ReactFlowProvider>
*             <App />
*          </ReactFlowProvider>
 *  )
 * } 
 * 
 * //The child component should change the content of the flow diagram
 * //and must done after the ReactFlow is ready
 * function App() {
 *  const {setNodes, setEdges } = useReactFlow();
    const isReactFlowReady      = useFlowState.use.isReactFlowReady();

    useEffect(() => {
        if(isReactFlowReady) {
            setNodes( ...my nodes   ..... as any );
            setNodes( ....my edges ...... as any );
        }
    }, [ isReactFlowReady]);

 *     return (
        <ReactFlowContainer
            theme='light'
        />
    )
}
 * 
 * //To get the current node count
 * function ChangeNodes() {
        const reactFlowInstance = useReactFlow();
        const [count, setCount] = useState(0);
        const countNodes = useCallback(() => {
            setCount(reactFlow.getNodes().length);
        }, [reactFlow]);

        return(
            <Button onClick={ () => reactFlowInstance.addNodes( ...... ) }>
                nodeCount: { count }
            </Button>
        )
 }
 */
export default function ReactFlowEditorCanvas (props : Props) {
    const { setNodes }       = useReactFlow();
    const setTheme           = useFlowState.use.setTheme();
    const setFlowIsReady     = useFlowState.use.setFlowIsReady();
    const showContextMenu    = useFlowState.use.showContextMenu();

    const isLoading          = useFlowState.use.isLoading();
    const isNodeLabelBeingEdited = useFlowState.use.isNodeLabelBeingEdited();
    const edgeTextEditorShow = useFlowState.use.edgeTextEditorShow();
    const options            = useFlowState.use.options();
    const viewportOptions    = useFlowState.use.viewportOptions();
    const edgeOptions        = useFlowState.use.edgeOptions();

//These HOOKS are originally written inside the file but remove for REDABILITY OF THE CODE!
    const { customApplyNodeChanges, helperLineHorizontal, helperLineVertical } = HelperLine();
    const { OnNodeDragStart, OnNodeDragEnd,  onEdgeConnected }     = ElementEvents();
    const { selectedNodes, selectedEdges, clearSelection }                     = ActiveElements();
    const { closeContextMenu    }    = OncloseContextMenus();
    const { onDragOver, onDrop }     = DragAndDrop();
    const {  onConnectEnd }          = AddNodeOnDrop();
    const { onBackspaceDelete }      = BackspaceDelete();
    const { selectedElements }       = GetAllSelectedElements();
    const { onKeyDown }              = KeyCapture();
    const { onMouseDown,  onMouseUp, onMouseMove, selectedArea, hasSelection } = useSelections();

    const FlowRef = useRef<HTMLDivElement>(null);

    const onNodesChange: OnNodesChange = useCallback( (changes) => {
        setNodes((nodes) => customApplyNodeChanges(changes, nodes));
    }, [customApplyNodeChanges] );

//===========================================================================================
    const OnContextNode = useCallback((event: any, node: Node)  => {
        if(window && window.app)
            window.app.closeAll({ reactflow: true });

        event.preventDefault();
        event.stopPropagation();
        const position   = 'changedTouches' in event ? event.changedTouches[0] : event; 
        position.clientX = position.clientX - FlowRef.current!.getBoundingClientRect().left;
        position.clientY = position.clientY - FlowRef.current!.getBoundingClientRect().top;

        if(hasSelection)
            return;

        if( isNodeLabelBeingEdited || edgeTextEditorShow) {
            closeContextMenu();
            clearSelection();
        }
        else if( selectedNodes.length <= 1)
            showContextMenu("node",  { x: position.clientX, y: position.clientY }, [node.id] );
        else if(selectedNodes.length > 1)
            showContextMenu("node",  { x: position.clientX, y: position.clientY }, selectedNodes );
    }, [isNodeLabelBeingEdited, edgeTextEditorShow, hasSelection, selectedNodes]);
    
//===========================================================================================
    const onContextEdge = useCallback((event: any, edge: Edge)  => {
        if(window && window.app)
            window.app.closeAll({ reactflow: true });

        event.preventDefault();
        event.stopPropagation();
        const position   = 'changedTouches' in event ? event.changedTouches[0] : event; 
        position.clientX = position.clientX - FlowRef.current!.getBoundingClientRect().left;
        position.clientY = position.clientY - FlowRef.current!.getBoundingClientRect().top;

        if(hasSelection)
            return;

        if( isNodeLabelBeingEdited || edgeTextEditorShow ) {
            closeContextMenu();
            clearSelection();
        }
        
        else if( selectedEdges.length <= 1)
            showContextMenu("edge",  { x: position.clientX, y: position.clientY }, [edge.id] );
        else if(selectedEdges.length > 1)
           showContextMenu("edge",  { x: position.clientX, y: position.clientY }, selectedEdges );
    }, [isNodeLabelBeingEdited, edgeTextEditorShow, hasSelection, selectedEdges]);

//===========================================================================================
    const onContextMenu = useCallback((event: any) => {
        if(window && window.app)
            window.app.closeAll({ reactflow: true });

        event.preventDefault();
        event.stopPropagation();
        const position   = 'changedTouches' in event ? event.changedTouches[0] : event; 
        position.clientX = position.clientX - FlowRef.current!.getBoundingClientRect().left;
        position.clientY = position.clientY - FlowRef.current!.getBoundingClientRect().top;

        if( hasSelection )
            return;

        if( isNodeLabelBeingEdited || edgeTextEditorShow) {
            closeContextMenu();
            clearSelection();
        }
        else if( 
            ( selectedNodes.length > 1  && selectedEdges.length > 1 )  || //multipe selected
            ( selectedNodes.length > 1  && selectedEdges.length == 1)  || //multiple node but single edge
            ( selectedNodes.length == 1 && selectedEdges.length > 1 )     //single node but multiple edge
        )
            showContextMenu("multiple", 
                { x: position.clientX, y: position.clientY },
         //note: this is an object but not an array of string id 
         //because the MultipleContextMenu cant access the selectedNodes & selectedEdges from the hook
                { nodes: selectedNodes, edges: selectedEdges } as any 
            );

        else if( selectedNodes.length >= 1 )
            showContextMenu("node",  { x: position.clientX, y: position.clientY }, selectedNodes );
        else if( selectedEdges.length >= 1 )
            showContextMenu("edge",  { x: position.clientX, y: position.clientY }, selectedEdges );
        else
            showContextMenu("main", { x: position.clientX, y: position.clientY });
        }, [isNodeLabelBeingEdited, edgeTextEditorShow, hasSelection, selectedNodes, selectedEdges]);

//===========================================================================================
    useEffect(() => {
        if(hasSelection) {
            selectedElements( selectedArea );
        }
    }, [selectedArea, hasSelection]);

//===========================================================================================
    return (
    <div
        id="ReactFlowBaseContainer"
        className='relative outline-none'
        tabIndex={0}
        onKeyDown={onKeyDown}

    //selction mode=========================================================
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        ref={FlowRef}
    >
        <div className="reactFlowWrapper relative bg-gray-200 dark:bg-gray-900">
            { isLoading &&
            <>
                <div className='absolute top-0 left-0 w-full h-full z-10 bg-black opacity-40'> </div>
                <div className="loader absolute z-20 top-1/2 left-1/2 w-12 h-12 opacity-1"></div>
            </>
            }

            <ReactFlow
                id="react-flow"

                //@ts-ignore
                edgeTypes={ edgeTypes } nodeTypes={ nodeTypes }

                { ...options }
                { ...viewportOptions }
                { ...edgeOptions }
                proOptions={{
                    hideAttribution: true
                }}

                defaultNodes={ [] }
                defaultEdges={ [] }
                onInit={setFlowIsReady}
                onNodesChange={onNodesChange}
                onConnectEnd={onConnectEnd}
                onDrop={onDrop}
                onDragOver={onDragOver}

            //overide the default deletion behavior=======================
                //onBeforeDelete={ onBackspaceDelete }

            //close context menu when the panning=======================
                onClick={closeContextMenu}
                onDoubleClick={closeContextMenu}
                onMove={closeContextMenu}
                onDragStart={closeContextMenu }
                onNodeClick={closeContextMenu}
                onEdgeClick={closeContextMenu}
               
            //related to undo and redo functions===========================
                onNodeDragStart={OnNodeDragStart}
                onNodeDragStop={OnNodeDragEnd}
                onConnect={onEdgeConnected}

            //Context Menu handler=====================================
                onContextMenu    ={ onContextMenu }
                onNodeDoubleClick={ OnContextNode }
                onNodeContextMenu={ OnContextNode }
                onEdgeDoubleClick={ onContextEdge }
                onEdgeContextMenu={ onContextEdge }
            >
            <HelperLines
                horizontal={helperLineHorizontal}
                vertical={helperLineVertical}
                theme={ props.theme }
            />
        </ReactFlow>
        </div>

        <EdgeTextEditor />  
        <ContentMenuContainer />
        <DragNDropNodes />
        <Selection />

        <Toast />
    </div>

    );
};
