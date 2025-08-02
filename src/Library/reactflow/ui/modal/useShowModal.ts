import { createSelectors } from '@/appcontext/interface/zustandSelector';
import { create }          from 'zustand';

type modalType = 'none' | 'prompt' | 'twoinput' | 'confirm';

const showModal = create<{
    whatModal:   modalType;
    value:       any;
    modalTitle:  string;
    modalDesc:   any;

    callback: (value :any) => void;
    showModal: (modal :modalType, title: string, desc: any, value: any, callback?: ( value: any) => void) => void;
    setvalue: (value: any) => void;
}>()((set) => ({
    whatModal:  'none',
    modalTitle:  '',
    modalDesc:   '',
    value:       '',

    setvalue:   (value) => set({ value }),
    callback:   () => console.log(),
    showModal:  ( modal, title, desc, value, callback ) => set({ whatModal: modal, value, callback, modalTitle: title, modalDesc: desc }),
}));

const useShowModal = createSelectors(showModal);
export default useShowModal;
