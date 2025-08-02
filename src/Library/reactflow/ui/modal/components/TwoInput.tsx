import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import useShowModal from "../useShowModal";

/**
 * 
 * @example
 * showModal('twoinput',
        "Edit Slide",
        {
            first:  'Slide Name',
            second: 'Slide Description'
        },
        {
            first:  slides[ contextMenuIndex ].name,
            second: slides[ contextMenuIndex ].desc
        },
        (value :any) => {
            window.app.closeAll();
            const copy = [ ...slides ];
            copy[ contextMenuIndex ].name = value.first;
            copy[ contextMenuIndex ].desc = value.second;
            setSlides( copy );
    });
 */
export default function TwoInput() {
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

        <Modal.Body>
            <div className="mb-5 block">
                <Label htmlFor="first" value={ modalDesc.first } />
                <TextInput
                    id="first"
                    autoFocus
                    autoCorrect="off"
                    autoComplete="off"
                    className="mt-2"
                    placeholder={ modalDesc.first }
                    value={ value.first }
                    onChange={(event) => setvalue({
                        ...value,
                        first: event.target.value
                    })}
                    required
                />
            </div>
            
            <div className="mb-5 block">
                <Label htmlFor="second" value={ modalDesc.second } />
                <Textarea
                    id="second"
                    autoCorrect="off"
                    autoComplete="off"
                    className="mt-2 scrollingbar"
                    rows={3}
                    placeholder={modalDesc.second}
                    value={ value.second }
                    onChange={(event) => setvalue({
                        ...value,
                        second: event.target.value
                    })}
                    required
                />
            </div>
        </Modal.Body>

        <Modal.Footer className="w-full flex justify-end -mt-8" >
          <Button className="w-1/3 mr-4" onClick={() => {
            callback( value );
            onCloseModal();
          }}> OK </Button>
          <Button className="w-1/3" color="gray" onClick={onCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    );
}
