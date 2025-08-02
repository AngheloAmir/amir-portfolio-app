import { HiFire }          from "react-icons/hi";
import { create }          from "zustand";
import { createSelectors } from "./lib/zustandSelector";
import { useEffect }       from "react";
import { FaMouse }         from "react-icons/fa";

const ToastState = create<{
    toast:        boolean;
    toastMessage: string;
    iconType    : 'mouse' | 'info';
    showToast: (toastMessage? :string, type? : 'mouse' | 'info') => void;

}>()((set) => ({
    toast: false,
    toastMessage: 'test 101',
    iconType:     'info',
    showToast(toastMessage, iconType = 'info') {
        if(toastMessage)
            set( ({ toast: true, toastMessage, iconType }))
        else
            set( ({ toast: false }))
    },
}));
export const useToast = createSelectors(ToastState);

export default function ToastComponent() {
    const toastState = useToast();

    useEffect(() => {
        if( toastState.toast )
            setTimeout(() => {
                if( toastState.toast )
                    toastState.showToast()
            }, 5000);
    }, [toastState.toast]);
 
    return (
        <div className="absolute bg-white dark:bg-gray-800 flex text-gray-500 dark:text-gray-400 rounded top-2 right-2 p-0 w-auto p-2 pr-3"
            style={{
                animationDuration: '1',
                animation: 'ease',
                zIndex: 0,
                userSelect: 'none',
                opacity: toastState.toast ? 1 : 0
            }}
            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation() }}
        >
        <div className="flex h-5 items-center justify-center rounded-lg text-blue-500 dark:text-blue-200">
            {  toastState.iconType == 'info'  && <HiFire className="h-5 w-5" />  }
            {  toastState.iconType == 'mouse' && <FaMouse className="h-5 w-5" /> }
            
        </div>
        <div className="ml-2 text-sm font-normal">
            { toastState.toastMessage }
        </div>
        
        </div>
    );
}
