import useFlowState    from "../core";
import EdgeContextMenu from "./EdgeMenu";
import MainContextMenu from "./Main";
import MultipleContextMenu from "./MultipleContextMenu";
import NodeContextMenu     from "./NodeMenu";

export default function ContentMenuContainer() {
    const contextTriggeringData   = useFlowState.use.contextTriggeringData();
    const showNodeContextMenu     = useFlowState.use.showNodeContextMenu();
    const showMultipleContextMenu = useFlowState.use.showMultipleContextMenu();
    const showContextMenu         = useFlowState.use.showContextMenu();

    if(showMultipleContextMenu)
        return <MultipleContextMenu />
        
    else if(contextTriggeringData) {
        if( showNodeContextMenu) {
            return <NodeContextMenu />
        }
        return <EdgeContextMenu />
    }

    return <MainContextMenu />
}
