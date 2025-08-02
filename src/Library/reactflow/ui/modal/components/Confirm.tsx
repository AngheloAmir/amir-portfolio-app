import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import useShowModal from "../useShowModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function PromptModal() {
  const modalTitle  = useShowModal.use.modalTitle();
  const modalDesc   = useShowModal.use.modalDesc();
  const value       = useShowModal.use.value();
  const setvalue    = useShowModal.use.setvalue();
  const callback    = useShowModal.use.callback();
  const showModal   = useShowModal.use.showModal();

  function onCloseModal() {
    showModal('none', '', '', '');
  }

  return (
      <Modal show={true} size="md" onClose={onCloseModal} popup>
        <Modal.Header />

        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                { modalDesc }
            </h3>
    
          </div>
        </Modal.Body>

        <Modal.Footer className="w-full flex justify-end -mt-8" >
          <Button className="w-1/3 mr-4" color="failure" onClick={() => {
            callback(value);
            onCloseModal();
          }}> OK </Button>
          <Button className="w-1/3" color="gray" onClick={onCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
