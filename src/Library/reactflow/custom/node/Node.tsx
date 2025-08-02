import BaseNode         from './BaseNode';
import { NodeParam }    from '../../core';
import { useReactFlow } from '@xyflow/react';
import { useCallback, useMemo, useRef } from 'react';
import LottiePlayer from '../../lib/LottiePlayer';

export default function DefaultNode( nodeData :NodeParam  ) {
    const { updateNodeData, updateNode } = useReactFlow();
    const imageRef                       = useRef<any>();

    const PreventDefaultAndPropagation = useCallback(( e :any) => {
        if( nodeData.data.showTextInput ) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, [ nodeData.data.showTextInput ]);

    const mainDefaultStyle = useMemo(() :React.CSSProperties => {
        return {
            height:     'calc(100% - 6px)',
            width:      'calc(100% - 6px)',
            marginTop:  '3px',
            marginLeft: '3px',
            boxSizing:  'border-box',
            padding:    '0',
        }
    }, [ nodeData.width, nodeData.height ]);
    
//================================================================================================
/** Class names optimzation */ 
    const NodeClassNames = useMemo(() => {
        const lightBg  = `${ nodeData.data.border    ?? "border-white"}         ${ nodeData.data.background     ?? "bg-white"}`;
        const darkBg   = `${ nodeData.data.boderDark ?? "dark:border-blue-500"} ${ nodeData.data.backgroundDark ?? "dark:bg-gray-800"}`;
        let background = `${lightBg} ${darkBg} ${ !nodeData.data.image && !nodeData.data.background ? "dark:border-0 dark:border-l-4 dark:rounded-l-none" : ""}`;

        if( nodeData.data.imageFileType && ( nodeData.data.imageFileType == 'svg' || nodeData.data.imageFileType == 'json') )
            background = "bg-transparent";

        const nodeContainerNoImage = `w-full h-full border-2 overflow-hidden rounded-md shadow-xl dark:shadow-none ${background}`;
        const nodeContainerWImage  = `w-full h-full rounded-md dark:shadow-none border-0 ${background}`;
        const textarea             = `min-h-10 onScreenTextArea overflow-hidden resize-none w-full h-full tracking-wider text-black dark:text-white text-base text-center ${background}`;

        return {
            nodeContainerNoImage,
            nodeContainerWImage,
            textarea,
        }
    }, [ nodeData.data.imageFileType, nodeData.data.background, nodeData.data.backgroundDark ] );

//================================================================================================
//change the node label or its size if needed
    const onChange = useCallback(( event :any ) => {
        const textarea = event.target;
        
    //For a node with png or jpeg image, we increase the height of the node 
    //to accomodate the text
    //however with SVG and JSON (Lottie) file, text are position in absolute
    //so we need only to increase the text editor height only
    //NOTE: the textarea is detach to the Node component as abosolute position element
        if( nodeData.data.imageFileType == 'svg' || nodeData.data.imageFileType == 'json' ) {
            textarea.style.height = textarea.scrollHeight + 'px';
            updateNodeData( nodeData.id, {  label: event.target.value });
            return;
        }

    //increase the node height if the text is too long
    //this one focus if there is an image in a node
        else if( nodeData.data.image && nodeData.height ) {
            const textInputHeight = nodeData.height - imageRef.current.height;
            if( textarea.scrollHeight > textInputHeight) {
                updateNode( nodeData.id, { 
                    height: imageRef.current.height + textarea.scrollHeight + 12,
                    data: {
                        ...nodeData.data,
                        label: event.target.value
                    }
                });
            }
            else {
                updateNodeData( nodeData.id, {  label: event.target.value });
            }
        }

    //focus if there is no image loaded in a node
        else if((textarea.scrollHeight + 8) > ( nodeData.height )) {
            updateNode( nodeData.id, { 
                height: textarea.scrollHeight + 8,
                data: {
                    ...nodeData.data,
                    label: event.target.value
                }
            });
        }

    //there is no need to increase the height of the node
        else
            updateNodeData( nodeData.id, {  label: event.target.value });

    }, [ nodeData.data, nodeData.height, nodeData.id ]);

//================================================================================================
/** Renders the text content of the node optimized */ 
    const RendersChars = useMemo(() => {
        if( nodeData.data.showTextInput ) 
            return <></>;
        if( nodeData.data.label.length === 0 || !nodeData.data.label )
            return <></>;

        const lines = nodeData.data.label.split('\n');
        return (
            <div className="w-full tracking-wider text-black dark:text-white text-base text-center">
                { lines.map((text, index) => {
                    if(text.length === 0) 
                        return <div key={index} className='opacity-0'> M </div>

                    else if( text.startsWith('##', 0)) {
                        const newtext = text.substring(2, text.length);
                        return <h1 key={index} className='text-2xl font-bold'>{ newtext }</h1>
                    }
                    else if( text.startsWith('#', 0)) {
                        const newtext = text.substring(1, text.length);
                        return <h1 key={index} className='font-bold'>{ newtext }</h1>
                    }
                    
                    else if( text.startsWith('>', 0)) {
                        const newtext = text.substring(1, text.length);
                        return <p key={index} className={`text-left text-base border-l-4 border-blue-500 border-opacity-50 pl-3 py-1 mx-5 ${ nodeData.data.background  ?? "bg-gray-100"} ${ nodeData.data.backgroundDark  ?? "dark:bg-gray-700"} dark:text-white text-black font-thin tracking-wider`} >{ newtext }</p>
                    }

                    else if( text.startsWith('"', 0)) 
                        return <p key={index} className='italic text-base opacity-70'>{ text }</p>

                    return <div key={index}>{ text }</div>
                })}
            </div>
        )
    }, [ nodeData.data.label, nodeData.data.showTextInput ] );

//================================================================================================
/** Node Images optimzation */ 
    const NodeImageUsed = useMemo(() => {
        switch( nodeData.data.imageFileType ) {
        case 'svg':
            return <img
                className='w-full h-full object-contain'
                src={nodeData.data.image}
                ref={imageRef}
            /> 

        case 'json':
            return (
                <div
                    className='w-full h-full'
                    ref={imageRef}
                >
                    <LottiePlayer
                        animationData={nodeData.data.image}
                    /> 
                </div>
            ) 
            
        default:
            return <img
                className="w-full h-full object-cover" 
                src={nodeData.data.image}
                ref={imageRef}
            /> 
        }
    }, [ nodeData.data.image, nodeData.data.imageFileType ]);

//================================================================================================
    function RenderTextInputOrChars() {
        if( nodeData.data.showTextInput ) {
            if( nodeData.data.imageFileType == 'svg' || nodeData.data.imageFileType == 'json' )
                return (
                    <div 
                        style={{ 
                            position: 'absolute',
                            width:    '100%',
                            top:      `${ imageRef.current ? imageRef.current.scrollHeight + 4 : 0}px`,
                        }}
                    >
                        <textarea 
                            autoFocus
                            autoCorrect='off'
                            autoComplete='off'
                            onFocus={(e ) => {
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            value={nodeData.data.label}
                            className={ NodeClassNames.textarea } 
                            onChange={onChange}
                        />
                    </div>
                );

            return <textarea 
                autoFocus
                autoCorrect='off'
                autoComplete='off'
                value={nodeData.data.label}
                className={ NodeClassNames.textarea } 
                onChange={onChange}
            />
        }

    //The text input is not show but there is an SVG or JSON animation icon
        else if( nodeData.data.imageFileType == 'svg' || nodeData.data.imageFileType == 'json' )
            return (
                <div 
                    style={{ 
                        position:   'absolute',
                        width:      '100%',
                        zIndex:     -1,
                        top:        `${ imageRef.current ? imageRef.current.scrollHeight + 8: 0}px`,
                        pointerEvents: 'none'
                    }}
                >
                    { RendersChars }
                </div>
            );

    //The default behavior. There could be an image or just plain node
        return RendersChars;
    }

//================================================================================================
//Render
    return (
        <BaseNode nodeData={nodeData} canShowAddNodes={ !nodeData.data.showTextInput }>
            <div 
                style        ={mainDefaultStyle}
                onClick      ={PreventDefaultAndPropagation}
                onDoubleClick={PreventDefaultAndPropagation}
                onContextMenu={PreventDefaultAndPropagation}>
                <div className="flex flex-col justify-center items-center h-full w-full" style={ nodeData.data.opacity != undefined ? { opacity: nodeData.data.opacity } : {} }>
                { nodeData.data.image ?
                    <div className={ NodeClassNames.nodeContainerWImage } >
                    <div className="flex flex-col justify-center items-center h-full w-full">
                        { NodeImageUsed }
                        { RenderTextInputOrChars() }
                    </div>
                    </div>
                    :
                    <div className={ NodeClassNames.nodeContainerNoImage }>
                    <div className="flex flex-col justify-center items-center h-full w-full">
                        { RenderTextInputOrChars() }
                    </div>
                    </div>
                }
                </div>
            </div>
        </BaseNode>
    );
}
