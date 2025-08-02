import PromptModal  from "./components/PromptModal";
import useShowModal from "./useShowModal";
import TwoInput     from "./components/TwoInput";
import Confirm      from "./components/Confirm";

export default function Modals() {
    const whatModal  = useShowModal.use.whatModal();

    switch( whatModal ) {
        case 'prompt':
            return <PromptModal />

        case 'twoinput':
            return <TwoInput />

        case 'confirm':
            return <Confirm />

        default:
            return <></>;
    }
    
}
