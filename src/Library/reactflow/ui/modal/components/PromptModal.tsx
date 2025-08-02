import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import useShowModal from "../useShowModal";

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
        { modalTitle &&
          <Modal.Header>
            <p className="p-2 pt-3 self-center whitespace-nowrap dark:text-white">
              { modalTitle }
            </p>
          </Modal.Header>
        }

        <Modal.Body className="">
          <TextInput
              placeholder={modalDesc}
              value={value}
              onChange={(event) => setvalue(event.target.value)}
              autoCorrect="off"
              autoComplete="off"
              autoFocus
            />
        </Modal.Body>

        <Modal.Footer className="w-full flex justify-end -mt-8" >
          <Button className="w-1/3 mr-4" onClick={() => {
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
