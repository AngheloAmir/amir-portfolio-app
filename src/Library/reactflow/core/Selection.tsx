/**
 * HOW TO USE:
 *  useEffect(() => {
        initCanvasElement('ReactFlowBaseContainer');
    }, [])

    REUSABLE!

    NOTE: useMouseLoc store the mouse position in the canvas element
    since it uses mouseMove event
*/
import { useCallback, useRef, useState } from "react";
import { create }          from "zustand";
import { createSelectors } from "./lib/zustandSelector";

const SelectionState = create<{
    isOnSelectionMode   :boolean;
    showSelectionGrid   :boolean;
    selectionPosStart   :{ x: number, y: number };
    selectionDistance   :{ w: number, h: number };
    selectedElements    :string[];

    setShowGrid           :(showSelectionGrid :boolean, x? :number, y? :number) => void;
    setSelectionGridStart :(x: number, y: number) => void;
    setSelectionDistance  :(w :number, h :number)       => void;
    setSelectedElements   :(selectedElements :string[]) => void;
    setIsOnSelectionMode  :(isOnSelectionMode :boolean) => void;

}>()((set) => ({
    showSelectionGrid: false,
    selectionPosStart: { x: 0, y: 0 },
    selectionDistance: { w: 0, h: 0 },
    selectedElements: [],
    isOnSelectionMode: false,

    setShowGrid: (showSelectionGrid, x = 0, y = 0) => set((state) => ({
        showSelectionGrid, selectionPosStart: { x, y }
    })),
    setSelectionGridStart: (x, y) => set( (state) => ({
        selectionPosStart: { x, y}
    })),
    setSelectionDistance: (w, h) => set( (state) => ({
        selectionDistance:{
        w, h
        }
    })),
    setSelectedElements: (selectedElements) => set( (state) => ({
        selectedElements
    })),
    setIsOnSelectionMode: (isOnSelectionMode) => set( (state) => ({
        isOnSelectionMode
    })),
}));
export const useSelectionState = createSelectors(SelectionState);

const MouseLoc = create<{
    position: {x: number, y: number};
    setPosition: (position: {x: number, y: number}) => void
}>()((set) => ({
    position: {x: 0, y: 0},
    setPosition: (position) => set( (state) => ({ position })),
}));
export const useMouseLoc = createSelectors(MouseLoc);

//==============================================================================================
export default function Selection() {
    const showSelectionGrid = useSelectionState.use.showSelectionGrid();
    const selectionPosStart = useSelectionState.use.selectionPosStart();
    const selectionDistance = useSelectionState.use.selectionDistance();

    if(showSelectionGrid)
    return (
        <div
            className="absolute w-12 h-12 left-0 border-2 border-dashed border-gray-400 dark:border-gray-600"
            style={{
                top:  `${selectionPosStart.y}px`,
                left: `${selectionPosStart.x}px`,
                width: selectionDistance.w,
                height: selectionDistance.h
            }}
        >
        </div>
    )
}

//============================================================================================
export function useSelections() {
    const CANVASELEMENT = useRef<HTMLElement>();
    const CLIP          = useRef<{top: number, left: number}>({ top: 0, left: 0});
    const setPosition   = useMouseLoc.use.setPosition();

    const setSelectionGridStart  = useSelectionState.use.setSelectionGridStart();
    const setSelectionDistance   = useSelectionState.use.setSelectionDistance();
    const setShowGrid            = useSelectionState.use.setShowGrid();
    const startX  = useRef(0);
    const startY  = useRef(0);

    const dx  = useRef(0);
    const dy  = useRef(0);
    const dW  = useRef(0);
    const dh  = useRef(0);
    const isRightMouseDrag     = useRef(false);
    const isValidRightDrag     = useRef(false);

    const [selectedArea, setArea]  = useState<{x: number, y: number, w:number, h:number}>({
        x: 0,
        y: 0,
        w:0,
        h:0,
    });
    const [hasSelection, setIs] = useState(false);

    const onMouseDown = useCallback((e :any) => {
        if (e.button == 2) { 
            if(!CANVASELEMENT.current) 
                CANVASELEMENT.current = document.getElementById( "ReactFlowBaseContainer" ) as any;
            CLIP.current = {
                top: CANVASELEMENT.current?.getBoundingClientRect().top   as number,
                left: CANVASELEMENT.current?.getBoundingClientRect().left as number,
            }
            isRightMouseDrag.current = true;
            startX.current = e.clientX - CLIP.current.left;
            startY.current = e.clientY - CLIP.current.top;
        }
    }, []);

    const onMouseUp = useCallback((e :any) => {
        if (isRightMouseDrag.current) {
            isRightMouseDrag.current = false;
            if( isValidRightDrag.current) {
                setArea({
                    x: dx.current + CLIP.current.left,
                    y: dy.current + CLIP.current.top,
                    w: dW.current,
                    h: dh.current,
                });
                setIs( true );
            }
            isValidRightDrag.current = false;
            setShowGrid( false );
            e.preventDefault();
            e.stopPropagation();

            setTimeout(() =>{
                setIs(false);
            }, 10)
        }
    }, []);

    const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setPosition({
            x: event.clientX,
            y: event.clientY,
        });

        if (isRightMouseDrag.current) {
            const dragWidth  = Math.abs( (event.clientX - CLIP.current.left) - startX.current );
            const dragHeight = Math.abs( (event.clientY - CLIP.current.top)  - startY.current );
            if (!isValidRightDrag.current) {
                if( dragWidth > 25 && dragHeight > 25) {
                    isValidRightDrag.current = true; 
                    setSelectionDistance( 25, 25 );
                    setShowGrid( true, startX.current, startY.current );
                    return;
                }
                return;
            }
            const screenx = event.clientX - CLIP.current.left;
            const screeny = event.clientY - CLIP.current.top;
            const newPosX = screenx < startX.current ? screenx : startX.current;
            const newposY = screeny < startY.current ? screeny : startY.current;
            setSelectionGridStart( newPosX, newposY );
            setSelectionDistance( dragWidth, dragHeight );
            dW.current = dragWidth;
            dh.current = dragHeight;
            dx.current = newPosX;
            dy.current = newposY;
        }
    }, []);
      
    return {
        onMouseDown,
        onMouseUp,
        onMouseMove,
        selectedArea, hasSelection
    }
}
