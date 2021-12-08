/*
*/
import React, { ReactElement } from 'react';
import './ModalBox.scss';
import { enableScroll, stopScroll } from './scrolling';
import { FancyButton } from '../';

interface ModalBoxInterface {
    isVisible      :boolean;
    onClose        :() => void;
    onCloseText    :string;
    title?         :string;
    content        :() => ReactElement<any, any>;
}

/**
 * A modal (alert box) box. This display a fixed position ui that captures <body> to prevent scrolling
 * @example

 */
export function ModalBox(props :ModalBoxInterface) {
    return (
        <React.Fragment>
            {
                props.isVisible &&
                <ModalBoxContents
                    { ...props }
                />
            }
        </React.Fragment>
    )
}

function ModalBoxContents(props :ModalBoxInterface) {
    const ref = React.useRef<any>();

    React.useEffect( () => {
		ref.current.style.opacity = 1;
        stopScroll();
        return () => enableScroll();
	}, []);

    return (
        <div id="PongDesignModalBox" >
            <div id="content" ref={ref} >
                <div className='closebtn'>
                    <span className='button' onClick={props.onClose}>X</span>
                    { props.title && <h4>{props.title}</h4> }
                </div>
               { props.content() }
               <div className='btn'>
                    { props.onCloseText && <FancyButton name={props.onCloseText} callback={props.onClose} /> }
               </div>
            </div>
        </div>
    )
}

