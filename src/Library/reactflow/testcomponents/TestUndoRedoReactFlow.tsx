import UseReactFlowUndoable, { ActivityHistory } from "../core/lib/ReactFlowUndoable";
import { useState } from "react";

/**Use this to test the content of the Redo and Undo state functions */
export default function TestUndoRedoReactFlow() {
    const { activity, activityIndex, clearHistory  } = UseReactFlowUndoable();
    return (
        <div className='scrollingbar h-full w-[240px] bg-gray-200 overflow-scroll overflow-x-hidden dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700'>
            <div className='text-red-500 text-center flex justify-between px-5'>
                TESTING UNDO REDO
                <button onClick={() => clearHistory()} className="bg-red-500 text-white text-sm w-8 rounded"> CLEAR </button>
            </div>
            <div className='dark:text-white text-sm text-center'>
                AT: { activityIndex } / { activity.length }
                --
                Data: { (JSON.stringify(activity).length / 1000).toFixed(2) } kB
            </div>
            { activity.map( (act, i) => {
                return (
                    <div key={i} className={ i == activityIndex ? 'w-full border-2 border-red-500 dark:border-red-500' : 'w-full' }>
                        <ACtivityHistory {...act} />
                    </div>
                )
            })}
        </div>
    )
}

function ACtivityHistory( params :ActivityHistory ) {  
    const [details, setDetails] = useState(true);
    return (
        <div onClick={() => {
            setDetails(!details);
           
        }} className='text-xs text-wrap w-[90%] m-2 border-2 border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white'>
            <header className='pl-5' >
                ACITIVITY TYPE: { params.type}
            </header>

            { details &&
            <div className='bg-gray-200 dark:bg-gray-800' onClick={(e) => {
                e.stopPropagation();
                console.log( params);
            }}>
                { params.id        &&  <p className='text-red-500 text-center'>   ID: { JSON.stringify( params.id )} </p> } 
                    <div> NEW </div>
                { params.newvalues &&  <p className='text-green-500'> { JSON.stringify( params.newvalues ) } </p> }
                    <div> OLD </div> 
                { params.oldvalues &&  <p className='text-green-500'> { JSON.stringify( params.oldvalues ) } </p> } 
            </div>
            }
        </div>
    )
}
