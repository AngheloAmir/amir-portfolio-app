import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
    children?       :ReactNode;
    style?          :CSSProperties;
    initx?          :number;        //initial position of the element
    inity?          :number;        //initial position of the element
    centerOnScreen? :boolean;       //if true, will center the element, ignoring initx and inity
    classname?      :string;
    width?          :number;
    height?         :number;

    /**Make the container non draggable which is weird? */
    draggable?      :boolean;

    /**A callback used to get the current x and y position*/
    onChangePosition?: (x: number, y:number) => void;
}

/**The base component for making a draggable component in the screen.
 * It also used to display any modal and context menus
 * 
 * @example
 * <DraggableContainer>
 *      <h1> Drag me! </h1>
 * </DraggableContainer>
 */
export default function DraggableContainer(props :Props) {
    const [display, setdisplay]               = useState(false);
    const [position, setposition]             = useState<CSSProperties>({ left: '0px', top: '0px', width: `${props.width}px`, height: `${props.height}px`});
    const [posOnDragStart, setPosOnDragStart] = useState({ mx: 0, my: 0});
    const containerRef = useRef<any>();

    useEffect(() => {
        if( containerRef.current ) {
            if(!props.centerOnScreen) {
                let x = 0, y = 0, width = 'auto', height = 'auto';
                if(props.initx)
                    x = props.initx;
                if(props.inity)
                    y = props.inity;
                if(props.width)
                    width = `${props.width}px`;
                if(props.height)
                    height= `${props.height}px`;

                setposition({
                    left:   `${x}px`,
                    top:    `${y}px`,
                    width,
                    height,
                });
            }

        //center the element in the screen
            else {
                let cwidth  = containerRef.current.clientWidth;
                let cheight = containerRef.current.clientHeight;

                if(props.width) 
                    cwidth = props.width;
                
                if(props.height) 
                    cheight= props.height;
                
                setposition({
                    top:  `${ (window.innerHeight - cheight - 1) / 2}px`,
                    left: `${ (window.innerWidth  - cwidth - 1) / 2 }px`, 
                    width:  `${cwidth}px`,
                    height: `${cheight}px`,
                });
            }

            setdisplay(true);
        }
    }, []);

    //handle changes with the position of the dragable container from parent component
    //make sure that the changes is only applied to non draggable container
    useEffect(() => {
        if( props.draggable == false && props.draggable != undefined )
            setposition({
                left:   `${props.initx}px`,
                top:    `${props.inity}px`,
                width:  `${props.width}px`,
                height: `${props.height}px`
            });
    }, [ props.initx, props.inity, props.width, props.height ]);
    
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.stopPropagation();
        setPosOnDragStart({
            mx:   event.clientX,    //store the position of the mouse x/y on the initial drag
            my:   event.clientY,    //then add/subtract that after the dragging ends
        });
    };

    const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let left = 0, top = 0;

        if(typeof position.left == 'string')
            left = parseInt(position.left) + (event.clientX  - posOnDragStart.mx);
        if(typeof position.top == 'string')
            top  = parseInt(position.top)  +  (event.clientY  - posOnDragStart.my);

        setposition({
            width:  `${props.width}px`,
            height: `${props.height}px`,
            left:   `${left}px`,
            top:    `${top}px`,
        });

        if(props.onChangePosition)
            props.onChangePosition( left, top);
    };

    function getGetStyle() :CSSProperties {
        if(props.style)
            return  {
                ...position, ...props.style,
                visibility: display ? 'visible' : 'hidden'
            }
        return {
            ...position,
            visibility: display ? 'visible' : 'hidden'
        };
    }

    return (
        <div 
            id="DraggableContainer"
            className={props.classname}
            ref={containerRef}
            draggable={ props.draggable == undefined || props.draggable ? true : false }
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={getGetStyle()}
        >
            { props.children }
        </div>
    )
}
