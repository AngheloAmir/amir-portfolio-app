import { Edge, useOnSelectionChange, Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { create } from "zustand";
import { createSelectors } from "./lib/zustandSelector";

const ActiveElementsState = create<{
    selectedNodes:string[];
    selectedEdges:string[];
    setSelectedNodes: (selectedNodes :string[]) => void;
    setSelectedEdges: (selectedEdges :string[]) => void;
}>()((set) => ({
    selectedNodes: [],
    selectedEdges: [],
    setSelectedNodes: (selectedNodes :string[]) => set({ selectedNodes }),
    setSelectedEdges: (selectedEdges :string[]) => set({ selectedEdges }),
}));
export const useActiveElements = createSelectors(ActiveElementsState);

export default function ActiveElements() {
    const { getNodes, getEdges, setEdges, setNodes} = useReactFlow();
    const selectedNodes    = useActiveElements.use.selectedNodes();
    const selectedEdges    = useActiveElements.use.selectedEdges();
    const setSelectedNodes = useActiveElements.use.setSelectedNodes();
    const setSelectedEdges = useActiveElements.use.setSelectedEdges();
    
    const onChange = useCallback(({ nodes, edges } :any) => {
        setSelectedNodes( nodes.map((node :Node) => node.id ));
        setSelectedEdges( edges.map((edge :Edge) => edge.id ));
    }, []);
    
    useOnSelectionChange({
        onChange,
    });

    const clearSelection = useCallback(() => {
        setSelectedNodes([]);
        setSelectedEdges([]);
        const allNodes = getNodes();
        const allEdges = getEdges();
        const newNodes = allNodes.map((node) => {
            if( node.selected ) {
                if( node.data.showTextInput )
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            showTextInput: false    
                        },
                        selected: false,
                        draggable: true
                    }
                return { ...node, selected: false };
            }
            return node;
        });

        const newEdges = allEdges.map((edge) => {
            if( edge.selected ) {
                if( edge.data?.showTextInput )
                    return {
                        ...edge,
                        data: {
                            ...edge.data,
                            showTextInput: false    
                        },
                        selected: false
                    }
                return { ...edge, selected: false };
            }
            return edge;
        });
        
        setNodes(newNodes);
        setEdges(newEdges);
    }, []);

    return {
        selectedNodes,
        selectedEdges,
        clearSelection,
        setSelectedNodes,
        setSelectedEdges,
    }
}
