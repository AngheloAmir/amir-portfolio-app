import { Button } from "flowbite-react";

interface TextButtonProps {
    children ?: React.ReactNode;
    onClick ?: () => void;
    icon ?: React.ReactNode;
    className ?: string;
    text?: string;
    active ?: boolean;
}

export default function TextButton( props :TextButtonProps) {
    return (
        <Button  outline={props.active} className={`flex items-center flex-col w-full mx-1 ${props.className}`} onClick={props.onClick}> 
            <>
                { props.icon }
                { props.children }
                { props.text && <p className="text-xs font-light"> { props.text } </p> }
            </>
        </Button>
    )
}

