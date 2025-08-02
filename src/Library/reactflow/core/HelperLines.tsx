import { Node, NodeChange, applyNodeChanges } from "@xyflow/react";
import { useState, useCallback } from "react";
import { getHelperLines }        from "../features/HelperLine";

/**This show a helper line when a node is being dragged. Based On the ReactFLow Documentation */
export default function HelperLine() {
    const [helperLineHorizontal, setHelperLineHorizontal] = useState<number | undefined>(undefined);
    const [helperLineVertical, setHelperLineVertical]     = useState<number | undefined>(undefined);

/* ========================================================================================================
        HELPER LINES FUNCTIONALITY
   =========================================================================================================*/
    const customApplyNodeChanges = useCallback((changes: NodeChange[], nodes: Node[]): Node[] => {
        setHelperLineHorizontal(undefined);
        setHelperLineVertical(undefined);

        if ( changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position ) {
            const helperLines = getHelperLines(changes[0], nodes);

        // if we have a helper line, we snap the node to the helper line position
        // this is being done by manipulating the node position inside the change object
            changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x;
            changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y;

        // if helper lines are returned, we set them so that they can be displayed
            setHelperLineHorizontal(helperLines.horizontal);
            setHelperLineVertical(helperLines.vertical);
        }
            return applyNodeChanges(changes, nodes);
    }, [] );

    return {
        customApplyNodeChanges,
        helperLineHorizontal,
        helperLineVertical
    }
}
