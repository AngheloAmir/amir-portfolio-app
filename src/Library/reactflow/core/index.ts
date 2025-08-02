import { create }          from "zustand";
import { createSelectors } from "./lib/zustandSelector";
import { ConnectionMode, DefaultEdgeOptions, Edge, FitViewOptions, MarkerType, Node, PanelPosition, PanOnScrollMode }  from '@xyflow/react';
import { CustomEdgeTypes, CustomNodeTypes } from "../custom";

export interface NODEDATA {
  label:          string;
  image?:         string;
  imageFileType?: string;

  /** TAILWIND CLASS NAME of the border color: example border-blue-500 */
  border?:         string;
  boderDark?:      string;
  background?:     string;
  backgroundDark?: string;

  /**Used internally, no need to set. It means show the textarea element or not */
  showTextInput?  :boolean;

  /**A number used to set the opacity and make the jerky movement invisible during image load */
  opacity?:        number;
}

export interface EDGEDATA {
  label:   string;
  type?:   string;
  showTextInput?  :boolean;
  pathtype?:  'bezier'        | 'smooth' | 'straight';
  arrowType?: 'source-target' | 'both'   | 'none';
}

export const DEFAULTEDGECOLOR = '#2196f3';
export const DEFAULTARROWSIZE = 15;

declare global {
  interface Window {
    baseElement: any
  }
}

/**Return the base clipping area of the editor in the screen.
 * This is very important as the clientX in the event will not be same when display an
 * element in "absolute" position
 * 
 * @example
 *  const { left, top } = GETBASECLIP();
 */
export function GETBASECLIP() {
  if( !window.baseElement )
    window.baseElement = document.getElementById("ReactFlowBaseContainer");
  const baseclip = window.baseElement.getBoundingClientRect();

  return {
    left: baseclip.left,
    top:  baseclip.top
  }
}

const flowState = create<FlowInterface>()((set) => ({
  options: {
    nodesDraggable:     true,
    nodesConnectable:   true,
    nodesFocusable:     true,
    edgesFocusable:     true,
    elementsSelectable: true,
    autoPanOnConnect:   true,
    autoPanOnNodeDrag:  true,
    selectionOnDrag:    false, 
    selectionMode:      "full",
    autoPanSpeed:       20,
    panOnDrag:          true,
    panOnScroll:        false,
    panOnScrollSpeed:   1,
    panOnScrollMode:    PanOnScrollMode.Free,
    zoomOnScroll:       true,
    zoomOnPinch:        false,
    zoomOnDoubleClick:  false,
    selectNodesOnDrag:  true,
    connectOnClick:     true,
    elevateNodesOnSelect: true,
    connectionMode:       ConnectionMode.Loose,
  },
  viewportOptions: {
    fitView:          true,
    fitViewOptions:   { },
    minZoom:          0.05,  //default was 0.2
    maxZoom:          1,     //default was 2
    snapToGrid:       false,
    snapGrid:         [25,25],
    onlyRenderVisibleElements: false,
    preventScrolling:          true,
    attributionPosition:       "bottom-right"
  },
  edgeOptions: {
    elevateEdgesOnSelect: false,
    defaultMarkerColor:   "#b1b1b7",
    defaultEdgeOptions:   {
      type: 'default',
      //no arrow node have undefined markerEnd, cant add this thing
      // markerEnd: {
      //     type: MarkerType.ArrowClosed,
      //     width:  DEFAULTARROWSIZE,
      //     height: DEFAULTARROWSIZE,
      //     color:  DEFAULTEDGECOLOR,
      // },
      style: {
          //strokeWidth: 3, this is adjusted in css file
          stroke: DEFAULTEDGECOLOR,
      },
      data: {
          label: '',
          type: 'default',
      },
    },
    reconnectRadius:      50,
    edgesReconnectable:   true
  },

  setOptions: (options : FlowOptions) => {
    set( (state) => {
      return {
        options: {
          ...state.options,
          ...options
        }
      }
    });
  },
  setViewportOptions(options) {
    set( (state) => {
      return {
        viewportOptions: {
          ...state.viewportOptions,
          ...options
        }
      }
    });
  },
  setEdgeOptions(options) {
    set( (state) => {
      return {
        edgeOptions: {
          ...state.edgeOptions,
          ...options
        }
      }
    });
  },
  
  theme: 'light',
  setTheme: (theme) => {
    set( (state) => {
      return {
        theme: theme
      }
    });
  },

  isReactFlowReady : undefined,
  setFlowIsReady   : () => set(({ isReactFlowReady: true })),

  isLoading: false,
  setLoading: (isLoading) => set( (state) => {
    return {
      isLoading: isLoading
    }
  }),

  edgeTextEditorEdgeId  :'',
  edgeTextEditorText    :'',
  edgeTextEditorShow    :false,
  setEdgeTextEditorText :( edgeTextEditorText ) => {
    set(({ edgeTextEditorText }))
  },
  showEdgeTextEditor: (edgeTextEditorShow, edgeTextEditorEdgeId, edgeTextEditorText ) => {
    set( (state) => {
      return ({
        edgeTextEditorShow:   edgeTextEditorShow,
        edgeTextEditorEdgeId: edgeTextEditorEdgeId ?? state.edgeTextEditorEdgeId,
        edgeTextEditorText:   edgeTextEditorText   ?? edgeTextEditorText
      })
    })
  },
  
  showMainContextMenu  :false,
  showNodeContextMenu  :false,
  showEdgeContextMenu  :false,
  showMultipleContextMenu:false,
  contextMenuPosition  :{x :0, y:  0},
  contextTriggeringData: [],
  contextKind          : undefined,
  showContextMenu      :( whatMenu : 'main' | 'node' | 'edge' | 'multiple' |'none', position? : { x: number, y: number}, contextTriggeringData = undefined) =>  {
    set( (state) => {
      if(whatMenu != 'none' && position) {
        switch( whatMenu ) {
          case "main":
            return {
              showMainContextMenu :true,
              showNodeContextMenu :false,
              showEdgeContextMenu :false,
              showMultipleContextMenu: false,
              contextMenuPosition :position,
              contextTriggeringData,
            }
          case "node":
            return {
              showMainContextMenu :false,
              showNodeContextMenu :true,
              showEdgeContextMenu :false,
              showMultipleContextMenu: false,
              contextMenuPosition :position,
              contextTriggeringData,
              contextKind: 'node',
            }
          case "edge":
            return {
              showMainContextMenu :false,
              showNodeContextMenu :false,
              showEdgeContextMenu :true,
              showMultipleContextMenu: false,
              contextMenuPosition :position,
              contextTriggeringData,
              contextKind: 'edge',
            }
          case "multiple":
            return {
              showMainContextMenu :false,
              showNodeContextMenu :false,
              showEdgeContextMenu :false,
              showMultipleContextMenu: true,
              contextMenuPosition :position,
              contextTriggeringData,
            }
            default:
              return {
                showMainContextMenu :false,
                showNodeContextMenu :false,
                showEdgeContextMenu :false,
                showMultipleContextMenu: false,
                contextMenuPosition :{ x: -99999, y: -999999 },
                contextTriggeringData,
            }
        }
      }

    //close all context menu
      return {
        showMainContextMenu :false,
        showNodeContextMenu :false,
        showEdgeContextMenu :false,
        contextMenuPosition :{ x: -99999, y: -999999 },
        contextTriggeringData,
      }
    });
  },

  isNodeLabelBeingEdited: false,
  setIsNodeLabelBeingEdited: (isNodeLabelBeingEdited) => set( (state) => ({
    isNodeLabelBeingEdited
  })),

}));

/**The Reactflow current editor state.
 * all of the activity in the editor data is stored here.
 * so, if we need to for example, get the current nodes or edges, we use the "useFlowState"
 */
const useFlowState = createSelectors(flowState);
export default useFlowState;

//=================================================================================================
//=================================================================================================
//=================================================================================================

interface FlowInterface {
  setOptions:         (options : FlowOptions) => void;
  setViewportOptions: (options : FlowViewportOptions) => void;
  setEdgeOptions:     (options : FlowEdgeOptions) => void;

  /** These are the ReactFlow options. See https://reactflow.dev/api-reference/react-flow for details */
  options:          FlowOptions;
  /** These are the ReactFlow options. See https://reactflow.dev/api-reference/react-flow for details */
  viewportOptions:  FlowViewportOptions;
  /** These are the ReactFlow options. See https://reactflow.dev/api-reference/react-flow for details */
  edgeOptions:      FlowEdgeOptions;

  /**Prevent certain display in canvas if the ReactFlow is not yet ready */
  isReactFlowReady    :undefined | boolean;
  /**Prevent certain display in canvas if the ReactFlow is not yet ready */
  setFlowIsReady      : () => void;

  isLoading : boolean;
  setLoading: (isLoading : boolean) => void;

  theme  :string;
  setTheme: (theme :string) => void;

  showMainContextMenu   :boolean;
  showNodeContextMenu   :boolean;
  showEdgeContextMenu   :boolean;
  showMultipleContextMenu :boolean;
  contextKind             :undefined | 'node' | 'edge';

  contextMenuPosition   :{x :number, y: number };


  /**The node or edge that trigger a context menu. It may also points the node lable being edited */
  contextTriggeringData : string[];
  /**Show which context menu should be display. See reactflow/contextmenu for which menu is opened */
  showContextMenu       :( whatMenu : 'main' | 'node' | 'edge' | 'multiple' | 'none', position?: { x: number, y: number}, contextTriggeringData? :string[]) => void;

  /**The ID of the edge that is currently being edited */
  edgeTextEditorEdgeId  :string;
  edgeTextEditorText    :string;
  edgeTextEditorShow    :boolean;
  showEdgeTextEditor    :(show :boolean, edgeTextEditorEdgeId? :string, edgeTextEditorText? :string) => void;
  setEdgeTextEditorText :(edgeTextEditorText :string) => void;
  isNodeLabelBeingEdited :boolean;
  setIsNodeLabelBeingEdited : (isNodeLabelBeingEdited :boolean) => void;
}

//======================================================================================================================================
//======================================================================================================================================
interface FlowOptions {
  /** Controls whether all nodes should be draggable or not. Individual nodes can override this setting by setting their draggable prop. If you want to use the mouse handlers on non-draggable nodes, you need to add the "nopan" class to those nodes. */
  nodesDraggable: boolean;
  /** Controls whether all nodes should be connectable or not. Individual nodes can override this setting by setting their connectable prop. */
  nodesConnectable: boolean;
  /** When true, focus between nodes can be cycled with the Tab key and selected with the Enter key. This option can be overriden by individual nodes by setting their focusable prop.*/
  nodesFocusable: boolean;
  /** When true, focus between edges can be cycled with the Tab key and selected with the Enter key. This option can be overriden by individual edges by setting their focusable prop.*/
  edgesFocusable: boolean;
  /** When true, elements (nodes and edges) can be selected by clicking on them. This option can be overriden by individual elements by setting their selectable prop. */
  elementsSelectable: boolean;
  /** When try, the viewport will pan automatically when the cursor moves to the edge of the viewport while creating a connection.*/
  autoPanOnConnect: boolean;
  /** When true, the viewport will pan automatically when the cursor moves to the edge of the viewport while dragging a node. */
  autoPanOnNodeDrag: boolean;

  /** The speed at which the viewport will pan for autoPanOnNodeDrag and autoPanOnConnect*/
  autoPanSpeed: number;
  /** Enabling this prop allows users to pan the viewport by clicking and dragging. You can also set this prop to an array of numbers to limit which mouse buttons can activate panning. For example, [0,2] would allow panning with the left and right mouse buttons.*/
  panOnDrag: boolean | (0 | 1 | 2 | 3 | 4)[];
  /** Selection on drag behavior */
  selectionOnDrag: boolean;
  /** When set to "partial", when the user creates a selection box by click and dragging nodes that are only partially in the box are still selected.*/
  selectionMode: "partial" | "full";

  /** What mouse wheel will do, will it pan or zoom */
  panOnScroll: boolean;
  /** Pan on scroll speed */
  panOnScrollSpeed: number;
  /** This prop is used to limit the direction of panning when panOnScroll is enabled. The "free" option allows panning in any direction. */
  panOnScrollMode: PanOnScrollMode;

  /** Whether to zoom on scroll */
  zoomOnScroll: boolean;
  /** Whether to zoom on pinch */
  zoomOnPinch: boolean;
  /** Whether to zoom on double click */
  zoomOnDoubleClick: boolean;

  /** Enabling this option will raise the z-index of nodes when they are selected. */
  elevateNodesOnSelect: boolean;
  /** Whether to select nodes on drag */
  selectNodesOnDrag: boolean;
  /** The connectOnClick option lets you click or tap on a source handle to start a connection and then click on a target handle to complete the connection. If you set this option to false, users will need to drag the connection line to the target handle to create a connection.*/
  connectOnClick: boolean;
  /** A loose connection mode will allow you to connect handles of any type to one another. The strict mode will only allow you to connect source handles to target handles.*/
  connectionMode: "loose" | "strict";
}

interface FlowViewportOptions {
  /** When true, the flow will be zoomed and panned to fit all the nodes initially provided. */
  fitView: boolean;
  /** When you typically call fitView on a ReactFlowInstance, you can provide an object of options to customize its behaviour. This prop lets you do the same for the initial fitView call. */
  fitViewOptions: FitViewOptions;
  /** Minimum zoom level */
  minZoom: number;
  /** Maximum zoom level */
  maxZoom: number;
  /** When enabled, nodes will snap to the grid when dragged.*/
  snapToGrid: boolean;
  /** If snapToGrid is enabled, this prop configures the grid that nodes will snap to. */
  snapGrid: [number, number];
  /** You can enable this optimisation to instruct React Flow to only render nodes and edges that would be visible in the viewport.*/
  onlyRenderVisibleElements: boolean;
  /** Disabling this prop will allow the user to scroll the page even when their pointer is over the flow.*/
  preventScrolling: boolean;
  /** By default, React Flow will render a small attribution in the bottom right corner of the flow. You can use this prop to change its position in case you want to place something else there.*/
  attributionPosition: PanelPosition;
}

interface FlowEdgeOptions {
  /** Enabling this option will raise the z-index of edges connected to a node when selected. */
  elevateEdgesOnSelect: boolean;
  /** Default marker color "#b1b1b7" */
  defaultMarkerColor: string;
  /** Any defaults set here will be applied to all new edges that are added to the flow. Properties on a new edge will override these defaults if they exist. */
  defaultEdgeOptions: DefaultEdgeOptions;
  /** The radius around an edge connection that can trigger an edge reconnection.*/
  reconnectRadius: number;
  /** Whether or not edges can be updated once they are created. When both this prop is true and an onReconnect handler is provided, the user can drag an existing edge to a new source or target. Individual edges can override this value with their reconnectable property. */
  edgesReconnectable: boolean;
}

/** The interface of the node data to be inputed to ReactFlow Editor 
 * 
 * @example
 * [{
      id:    '1',
      position: { x: 0, y: 0 },
      data: { label: 'Start', type: 'default' },
      type: 'default',
   }]
 */
export interface NodeDataInterface {
  id: string;
  position: { x: number, y: number };
  type: string;
  data: NODEDATA;
  width?: number;
  height?: number;
  measured?: {
    width: number;
    height: number;
  };
}

/** The interface of the edge data to be inputed to ReactFlow Editor
 * 
 * @example
 * [{
    id: 'a',
    source: '1',
    target: '2',
    sourceHandle: 'c',
    targetHandle: 'a',
    type: 'default'
  }]
*/
export interface EdgeDataInterface {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  animated? : boolean;
  data?: EDGEDATA;
  markerEnd? : {
    type:   MarkerType | string;
    width:  number;
    height: number;
    color:  string;
  },
  markerStart? : {
    type:   MarkerType | string;
    width:  number;
    height: number;
    color:  string;
  },
  style ?: {
    strokeWidth?: number;
    stroke?:      string;
  },
}

/**The properties of a node data that trigger the event.
 * For example, the user double clicks on a node,
 * this data will appear in the event context
 */
export interface NodeEventContext {
  id: string;
  position: { x: number, y: number };
  data: NODEDATA;
  type: CustomNodeTypes,
  measured: { width: number, height: number };
  selected: boolean;
  dragging: boolean;
}

/**The properties of a node data that trigger the event.
 * For example, the user double clicks on a node,
 * this data will appear in the event context
 */
export interface EdgeEventContext {
  type: CustomEdgeTypes,
  markerEnd: {
    type:   MarkerType;
    width:  number;
    height: number;
    color:  string;
  },
  style: {
    strokeWidth: number;
    stroke:      string;
  },
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  animated?: boolean;
  data?: EDGEDATA;
}
  

//=========================== PARAMS =============================
export interface NodeParam {
    data: NODEDATA;
    deletable: boolean;
    dragHandle?: any; // or dragHandle: undefined if you want to be explicit
    draggable: boolean;
    dragging: boolean;
    height: number;
    id: string;
    isConnectable: boolean;
    parentId?: string; // or parentId: undefined if you want to be explicit
    positionAbsoluteX: number;
    positionAbsoluteY: number;
    selectable: boolean;
    selected?: any;       // or selected: undefined if you want to be explicit
    sourcePosition?: any; // or sourcePosition: undefined if you want to be explicit
    targetPosition?: any; // or targetPosition: undefined if you want to be explicit
    type: string;
    width: number;
    zIndex: number;
}

export interface EdgeParam {
  animated: boolean;
  data :EDGEDATA;
  deletable: boolean;
  id: string;
  interactionWidth?: number; // or interactionWidth: undefined if you want to be explicit
  label: string;
  labelBgBorderRadius?: number; // or labelBgBorderRadius: undefined if you want to be explicit
  labelBgPadding?: number; // or labelBgPadding: undefined if you want to be explicit
  labelBgStyle?: any; // or labelBgStyle: undefined if you want to be explicit
  labelShowBg?: boolean; // or labelShowBg: undefined if you want to be explicit
  labelStyle?: any; // or labelStyle: undefined if you want to be explicit
  markerEnd: string;
  markerStart?: string; // or markerStart: undefined if you want to be explicit
  pathOptions?: any; // or pathOptions: undefined if you want to be explicit
  selectable: boolean;
  selected?: any; // or selected: undefined if you want to be explicit
  source: string;
  sourceHandleId: string;
  sourcePosition: string;
  sourceX: number;
  sourceY: number;
  style: {
    strokeWidth: number;
    stroke: string;
  };
  target: string;
  targetHandleId: string;
  targetPosition: string;
  targetX: number;
  targetY: number;
  type: string;
}

// export interface UseReactFlowInstance {
//   addEdges: (payload: any) => void;
//   addNodes: (payload: any) => void;
//   deleteElements: (param: any) => Promise<void>;
//   fitBounds: (bounds: any, options: any) => Promise<void>;
//   fitView: (options: any) => void;
//   flowToScreenPosition: (flowPosition: any) => any;
//   getEdge: (id: string) => any;
//   getEdges: () => any[];
//   getHandleConnections: (param: any) => any;
//   getInternalNode: (id: string) => any;
//   getIntersectingNodes: (nodeOrRect: any) => any[];
//   getNode: (id: string) => any;
//   getNodes: () => any[];
//   getNodesBounds: (nodes: any[]) => any;
//   getViewport: () => any;
//   getZoom: () => number;
//   isNodeIntersecting: (nodeOrRect: any, area: any) => boolean;
//   screenToFlowPosition: (clientPosition: any) => any;
//   setCenter: (x: number, y: number, options: any) => Promise<void>;
//   setEdges: (payload: any) => void;
//   setNodes: (payload: any) => void;
//   setViewport: (viewport: any, options: any) => Promise<void>;
//   toObject: () => any;
//   updateEdge: (id: string, edgeUpdate: any) => void;
//   updateEdgeData: (id: string, dataUpdate: any) => void;
//   updateNode: (id: string, nodeUpdate: any) => void;
//   updateNodeData: (id: string, dataUpdate: any) => void;
//   viewportInitialized: boolean;
//   zoomIn: (options: any) => void;
//   zoomOut: (options: any) => void;
//   zoomTo: (zoomLevel: number, options: any) => void;
// }

// export type ReactFlowInstance<T, U> = {
//   // Nodes and Edges
//   getNode: (id: string) => Node<T> | undefined;
//   getNodes: () => Node<T>[];
//   addNodes: (payload: Node<T>[] | Node<T>) => void;
//   setNodes: (payload: Node<T>[] | ((nodes: Node<T>[]) => Node<T>[])) => void;
 
//   getEdge: (id: string) => Edge<U> | undefined;
//   getEdges: () => Edge<U>[];
//   addEdges: (payload: Edge<U>[] | Edge<U>) => void;
//   setEdges: (payload: Edge<U>[] | ((edges: Edge<U>[]) => Edge<U>[])) => void;
 
//   toObject: () => ReactFlowJsonObject<T, U>;
//   deleteElements: (payload: {
//     nodes?: (Partial<Node> & { id: Node['id'] })[];
//     edges?: (Partial<Edge> & { id: Edge['id'] })[];
//   }) => void;
//   getNodesBounds: (nodes: (NodeType | InternalNode | string)[]) => Rect;
 
//   // Intersections
//   getIntersectingNodes: (
//     node: (Partial<Node<T>> & { id: Node['id'] }) | Rect,
//     partially?: boolean,
//     nodes?: Node<T>[],
//   ) => Node<T>[];
 
//   isNodeIntersecting: (
//     node: (Partial<Node<T>> & { id: Node['id'] }) | Rect,
//     area: Rect,
//     partially?: boolean,
//   ) => boolean;
 
//   // Viewport
//   viewportInitialized: boolean;
//   zoomIn: (options?: { duration: number }) => void;
//   zoomOut: (options?: { duration: number }) => void;
//   zoomTo: (zoomLevel: number, options?: { duration: number }) => void;
//   getZoom: () => number;
//   setViewport: (viewport: Viewport, options?: { duration: number }) => void;
//   getViewport: () => Viewport;
//   fitView: (fitViewOptions?: FitViewOptions) => boolean;
//   setCenter: (
//     x: number,
//     y: number,
//     options?: { duration: number; zoom: number },
//   ) => void;
//   fitBounds: (
//     bounds: Rect,
//     options?: { duration: number; padding: number },
//   ) => void;
//   screenToFlowPosition: (position: { x: number; y: number }) => {
//     x: number;
//     y: number;
//   };
//   flowToScreenPosition: (position: { x: number; y: number }) => {
//     x: number;
//     y: number;
//   };
//   updateNode: (
//     id: string,
//     nodeUpdate: Partial<NodeType> | ((node: NodeType) => Partial<NodeType>),
//     options?: { replace: boolean },
//   ) => void;
//   updateNodeData: (
//     id: string,
//     dataUpdate:
//       | Partial<NodeType>['data']
//       | ((node: Node) => Partial<NodeType>['data']),
//     options?: { replace: boolean },
//   ) => void;
//   updateEdge: (
//     id: string,
//     edgeUpdate: Partial<EdgeType> | ((node: EdgeType) => Partial<EdgeType>),
//     options?: { replace: boolean },
//   ) => void;
//   updateEdgeData: (
//     id: string,
//     dataUpdate:
//       | Partial<EdgeType>['data']
//       | ((node: Edge) => Partial<EdgeType>['data']),
//     options?: { replace: boolean },
//   ) => void;
// };