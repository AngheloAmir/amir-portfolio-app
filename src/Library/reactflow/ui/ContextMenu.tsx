import { ReactNode } from "react"

interface Props {
    position: {
        x: number
        y: number
    } 
    show:       boolean;
    className?: string;
    items: Array<{
        text     :string;
        onClick? :(e :any) => void;
        icon?    :ReactNode;
        keyboardtext?: string;
        isDisabled?: boolean;
    }>
}

/**A standard displayed context menu
 * 
 * @example
 * <ContextMenu
        position={{ x: contextMenuPosition.x,  y: contextMenuPosition.y }}
        show={showMainContextMenu}
        items={[
            { text: "Save", icon: <IoIosSave color="gray" />, onClick: () => {} },
            { text: "Animate All Edges", icon: <MdAnimation color="gray" />, onClick: () => {} },
            { text: "Animate Nodes", icon: <FaCrown color="gold" />, onClick: () => {} },
        ]}
    />
 */
export default function ContextMenu( props : Props ) {
    if( props.show) {
        return (
            <div style={{
                position: 'absolute',
                top:      `${ props.position.y - 20}px`,
                left:     `${ props.position.x - 10}px`,
                zIndex:    10,
                width:    "240px",
            }} className="select-none border-2 user-select-none dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 py-2 px-2 shadow-lg"
                onContextMenu={ (e) => e.preventDefault() }
                onDoubleClick={ (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                {
                    props.items.map( (item, index) => {
                        if(item.text === "") {
                            return <hr key={index} className="my-1 dark:opacity-10" />
                        } 
                        return (
                            <div key={item.text} onClick={ (e) => { if(item.onClick && !item.isDisabled) item.onClick(e) }} className={`cursor-pointer flex w-full px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white text-black font-thin tracking-wider ${item.isDisabled ? 'opacity-50' : ''}`}>
                                <span className="mr-3 text-gray-700 dark:text-gray-400">
                                    { item.icon }
                                </span>
                                <p>{ item.text }</p>

                                { item.keyboardtext &&
                                    <span className="ml-auto text-xs p-0 pt-1 opacity-50">{ item.keyboardtext }</span>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
