import { useState } from 'react';
import useFlowState        from '../core';
import { CustomNodeTypes } from '../custom';
import useDragAndDropState from './context/useDragNDropNodes';

import { FcWorkflow }    from "react-icons/fc";
import { FcCommandLine } from "react-icons/fc";
import { FcComboChart }  from "react-icons/fc";
import FloatingButton    from '@/components/ui/FloatingButton';


export default function DragNDropNodes() {
    const isReactFlowReady = useFlowState.use.isReactFlowReady();
    const setNodeType      = useDragAndDropState.use.setNodeType();
    const [showShapes, setShowShapes] = useState(false);

    const onDragStart = (event: React.DragEvent, nodeType: CustomNodeTypes) => {
        event.dataTransfer.effectAllowed = 'move';
        setNodeType(nodeType);
    };

    return <></>;

    return ( 
        <>
        <div className="z-10 absolute opacity-70 top-[12px] right-3 w-9 h-[116px] bg-white dark:bg-gray-800 rounded border-2 border-gray-300 dark:border-gray-700">
            {/* This is the background for button */}
        </div>

        <FloatingButton tooltip='Shapes'  classTooltipPosition="top-0 right-12" classNamePositioning="top-[12px] right-3 " icon={  <FcWorkflow /> }>
            <Shapes />
        </FloatingButton>

        <FloatingButton tooltip='Computers & Networks' classTooltipPosition="top-0 right-12" classNamePositioning="top-[52px] right-3 " icon={  <FcCommandLine /> }>
            <Shapes />
         </FloatingButton>

         <FloatingButton  tooltip="Graphs" classTooltipPosition="top-0 right-12" classNamePositioning="top-[92px] right-3 " icon={  <FcComboChart /> }>
            <Shapes />
         </FloatingButton>
        </>
    )

    function Shapes() {
        if( showShapes )
            return (
            <div className='absolute -top-12 right-14 z-10 w-64 h-32' onClick={ e => e.stopPropagation() }>
            <div className='w-full h-full rounded-xl p-2 bg-white dark:bg-gray-800 shadow-md dark:text-white'>
                <header className='text-center pb-1 text-sm opacity-80 w-full border-b-2 border-gray-300 dark:border-gray-700'>
                    Flowchart Shapes
                </header>
            </div>
            </div>
        )
    }


    if( !isReactFlowReady)
        return (
            <aside  className='absolute top-20 right-3 bg-gray-100 dark:bg-gray-600' >
            <svg aria-hidden="true" className="w-16 h-16 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            </aside>
        )

    return (
        <aside className='absolute top-20 right-3 w-[240px] border-2 border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-600 p-2 rounded-md opacity-70' >
            <h3 className='mb-2 text-center'> Drag These Nodes </h3>
            <div className='flex justify-between'>
                <div 
                    onDragStart={(event) => onDragStart(event, 'default')} draggable
                    className="w-full h-full border-2 border-blue-500 rounded-md p-1 mx-1 text-center shadow-md text-black dark:text-white bg-white dark:bg-gray-800">
                    Node
                </div>
                <div 
                    className="w-full h-full border-2 border-blue-500 rounded-3xl p-1 mx-1 text-center shadow-md text-black dark:text-white bg-white dark:bg-gray-800"
                    onDragStart={(event) => onDragStart(event, 'terminator')} draggable>
                    Start
                </div>
            </div>

        <div className='flex'>
            <div 
                className='w-12 h-12 flex'  
                onDragStart={(event) => onDragStart(event, 'io')} draggable>
                <svg viewBox="108 95.344 120 56.691"  className={`w-full h-full `} strokeLinecap="round" strokeLinejoin="round">
                    <path
                        className="stroke-blue-500"
                        fill="none"
                        strokeWidth={2}
                        d="M 127.629 95.344 L 109.981 151.905 L 208.238 152.035 L 226.366 95.377 L 127.629 95.344 Z"/>
                </svg>
    
            </div> 

            <div 
                className='w-12 h-12 flex mt-1'   
                onDragStart={(event) => onDragStart(event, 'diamond')} draggable >
                <svg viewBox="1.3 1.3 21.4 21.4"  className="w-full h-full">
                <path 
                     className="stroke-blue-500"
                     fill="none"
                     strokeWidth={2}
                    d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/>
                </svg>
            </div> 


            <div className='w-12 h-12 flex mt-1'    onDragStart={(event) => onDragStart(event, 'document')} draggable>
                <svg className="w-full h-full" viewBox="10 11 42 42" >
                    <path
                         className="stroke-blue-500"
                         fill="none"
                         strokeWidth={2}
                        d="M1.5 15.5h60v29.376c-30-12.006-30 12.346-60-2.129z"
                    />
                </svg>
            </div>

            <div className='w-12 h-12 flex mt-1'  onDragStart={(event) => onDragStart(event, 'predefinedProcess')} draggable>
            <svg className="w-full h-full" viewBox="13.5 8 36 46"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g 
                     className="stroke-blue-500"
                     fill="none"
                     strokeWidth={2}
                >
                    <path d="M1.5 16.5h60v30h-60z"/>
                    <path d="M9.5 16.5v30m44-30v30"/>
                </g>
            </svg>
            </div>

            </div>
        </aside>
    );
};