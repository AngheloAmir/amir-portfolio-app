import { Button } from "flowbite-react";
import React, { useState } from "react";

interface Props {
    content: React.ReactNode;
    icon:    React.ReactNode;    
    text:    string;
}

export default function PopMenuButton( props: Props ) {
    const [showPopover, setShowPopover] = useState(false);

    return (
        <div className="my-1 relative" onMouseEnter={() => setShowPopover(true)} onMouseLeave={() => setShowPopover(false)}>
            { showPopover  &&
                <>
                    <div className="absolute -top-2 left-0 w-32 h-[72px]"></div>
                    <div className="absolute -top-2 left-[72px] z-10">
                        { props.content }
                    </div>
                </>
            }

            <Button color="none" className={`${showPopover ? "bg-gray-200 dark:bg-gray-500" : ""}`} onClick={() => setShowPopover(!showPopover)}>
                <div className="flex flex-col items-center p-0 m-0 w-[32px]">
                    { props.icon }
                    <p className="text-xs dark:text-white py-1"> { props.text } </p>
                </div>
            </Button>
        
        </div>
    )
}
