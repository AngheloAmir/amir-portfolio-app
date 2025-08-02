import { useReactFlow, Node } from "@xyflow/react";
import { useCallback }        from "react";
import useDragAndDropState    from "../features/context/useDragNDropNodes";
import UseReactFlowUndoable from "./lib/ReactFlowUndoable";
import AdjustNodeSize from "../contextmenu/helpers/adjustNodeSize";
import { GETBASECLIP } from ".";

/** ========================================================================================================
     DRAG AND DROP NODES FUNCTIONALITY
        Based on: https://reactflow.dev/examples/interaction/drag-and-drop
========================================================================================================*/
export default function DragAndDrop() {
    const { addNodes, screenToFlowPosition } = useReactFlow();
    const { addHistory } = UseReactFlowUndoable();
    const nodetype       = useDragAndDropState.use.nodetype();

    const onDragOver = useCallback((event :any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

   const onDrop = (event :any) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent: any) => {
            if (readerEvent && readerEvent.target) {
                    const content = readerEvent.target.result;
                    const imageUrl = URL.createObjectURL(file);
                    const img = new Image();
                    img.onload = () => {
                    const width = img.width;
                    const height = img.height;
                    URL.revokeObjectURL(imageUrl);
                    addNode( event, file, content, width * 0.5, height * 0.5);
                     };
                    img.src = imageUrl;
                }
            };
        } 
        else if (file.type.startsWith("application/json")) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (readerEvent: any) => {
            if (readerEvent && readerEvent.target) {
                const content = JSON.parse(readerEvent.target.result);
                addNode(event, file, content, 0, 0);
                }
            };
        }
   };

   function addNode(event :any, file: File, content: any, width: any, height: any) {
        const fileType = file.name.split('.').pop();
        const nodename = file.name.slice(0, file.name.lastIndexOf('.'));
        const position = screenToFlowPosition({
            x: event.clientX - GETBASECLIP().left,
            y: event.clientY - GETBASECLIP().top,
        });
        const size = AdjustNodeSize( fileType as string, width, height );

        const id = `${ Date.now().toString(36) }`;
        const newNode :Node  = {
            id: id,
            position,
            width:  size.width,
            height: size.height, 
            data: { 
                label:          nodename,
                image:          content,
                imageFileType:  fileType,
            },
            type: nodetype,
        };
        addNodes( newNode );
        addHistory({
            type:      'newnode',
            id:        [id],
            newvalues: [newNode],
            oldvalues: []
        })
   }

   return {
       onDragOver,
       onDrop
   }
}