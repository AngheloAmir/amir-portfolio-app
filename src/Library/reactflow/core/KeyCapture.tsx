import { useCallback }      from "react";
import UseReactFlowUndoable from "./lib/ReactFlowUndoable";
import useEdits             from './lib/UseEdits';

export default function KeyCapture() {
    const {  undo, redo}          = UseReactFlowUndoable();
    const { ctrlc, ctrlv, ctrlx } = useEdits();

    const onKeyDown = useCallback( (event: React.KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'z') {
            event.stopPropagation();
            event.preventDefault();
            undo();
        } else if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
            event.stopPropagation();
            event.preventDefault();
            redo();
        }
        else if (event.ctrlKey && event.key === 'c') {
            event.stopPropagation();
            event.preventDefault();
            ctrlc()
        }
        else if (event.ctrlKey && event.key === 'v') {
            event.stopPropagation();
            event.preventDefault();
            ctrlv( )
        }
        else if(event.ctrlKey && event.key === 'x') {
            event.stopPropagation();
            event.preventDefault();
            ctrlx()
        }
    }, []);

    return {
        onKeyDown
    }
}
