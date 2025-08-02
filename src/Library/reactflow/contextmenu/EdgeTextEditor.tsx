import { useReactFlow } from "@xyflow/react";
import useFlowState, { GETBASECLIP }  from "../core"
import { useRef }    from "react";

export default function EdgeTextEditor() {
    const { getZoom, updateEdgeData } = useReactFlow();
    const edgeTextEditorEdgeId  = useFlowState.use.edgeTextEditorEdgeId();
    const edgeTextEditorShow    = useFlowState.use.edgeTextEditorShow();
    const edgeTextEditorText    = useFlowState.use.edgeTextEditorText();
    const setEdgeTextEditorText = useFlowState.use.setEdgeTextEditorText();
    const TextRef               = useRef<HTMLDivElement>(null);

    if (edgeTextEditorShow) {
        const edgeLabelElement      = document.getElementById(`edge-label-${ edgeTextEditorEdgeId }`);
        const ReactFlowBaseContainer = document.getElementById("ReactFlowBaseContainer");
        if (!edgeLabelElement || !ReactFlowBaseContainer) return;

        const clip            = edgeLabelElement.getBoundingClientRect();
        const baseclip        = GETBASECLIP(); 
        const zoomLevel       = getZoom();
        const isBelowMinWidth = clip.width <  ( 260 * zoomLevel );
        const clipWidth       = isBelowMinWidth ? 260 * zoomLevel : clip.width;
        const left            = isBelowMinWidth ?
                                clip.left - ( clipWidth / 2 ) + ( clip.width / 2 )  - baseclip.left:
                                clip.left - baseclip.left;
        return (
            <div className="resize-none invisibleScrollBar p-0 mx-0 pt-1"  ref={ TextRef }
            style={{
                position:   'absolute',
                top:        `${ clip.top - (  4 * zoomLevel) - 46}px`,
                left:       `${ left}px`,
                zIndex:     10,
                width:      `${(clipWidth  )}px`,
                border:     'none',
            }}>  
                <textarea 
                    autoFocus
                    className="onScreenTextArea invisibleScrollBar resize-none w-full h-full  bg-gray-200 dark:bg-gray-900 text-center tracking-wider text-gray-800 dark:text-gray-300 leading-normal"
                    style={{
                        fontSize: `${zoomLevel   * 16}px`,
                        height:   `${clip.height + 16}px`,
                        padding:  '0px 0px 0px 0px',
                    }}

                    value={ edgeTextEditorText }

                    onFocus={(e) => {
                        const textarea        = e.target;
                        textarea.style.height = "1px";
                        textarea.style.height = `${textarea.scrollHeight}px`;
                        e.target.select();
                    }}

                    onChange={ (e) => {
                        const text =  e.target.value.trimStart().replace(/\s+/g, ' ');
                        setEdgeTextEditorText(text);
                        updateEdgeData( edgeTextEditorEdgeId, { label: text } );
                        const textarea        = e.target;
                        textarea.style.height = "1px";
                        textarea.style.height = `${textarea.scrollHeight}px`;
                    }}

                    onKeyDown={ (e) => {
                    //This prevent new line character being added because the edge label render 
                    //as of now, do not support new line characters
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.stopPropagation();
                        }

                    //This function fix a bug that cause the textarea to move up when backspace is pressed
                    //this one recalculate the position of the text area so it is still in the center of an edge
                        else if( e.key === "Backspace" ) {
                            setTimeout(() => {
                                const edgeLabelElement = document.getElementById(`edge-label-${ edgeTextEditorEdgeId }`);
                                const { top } = GETBASECLIP(); 
                                
                                if (edgeLabelElement && ReactFlowBaseContainer && TextRef && TextRef.current) {
                                    const clip  = edgeLabelElement.getBoundingClientRect();
                                    const dtop  = clip.top - top - ( 2 * zoomLevel);
                                    TextRef.current.style.top = `${dtop}px`;
                                }
                            }, 0);
                        }
                    }}
                />
            </div>
        );
    } 
  } 

