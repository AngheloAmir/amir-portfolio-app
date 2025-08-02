import { VscChromeClose } from "react-icons/vsc";

export default function CloseButton( {onClick} :any) {
    return (
        <div onClick={onClick} 
        className="cursor-pointer w-7 h-7 p-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 duration-100">
            <VscChromeClose className="w-full h-full" />
        </div>
    )
}
