import React from 'react';
import './GridImageAccordion.scss';
import { GIAInterface } from '../';

/**
 * An accordion based on the images. When an images is hovered or clicked, a text will appear on the
 * left side (desktop) or in the bottom (mobile)
 * 
 */
export function GridImageAccordion(props :GIAInterface) {
    const [active, setActive] = React.useState(0);

    function setActiveFloat(i :number) {
        setActive(i);
    }

    function whichText() {
        switch(active) {
            case 0:
                return (
                    <div className="text-container opacity"  >
                        <h3>{ props.texts.text1.title }</h3>
                        <p> { props.texts.text1.text }</p>
                    </div>
                );
            case 1:
                return (
                    <div className="text-container opacity1"  >
                        <h3>{ props.texts.text2.title }</h3>
                        <p> { props.texts.text2.text }</p>
                    </div>
                );
            case 2:
                return (
                    <div className="text-container opacity2"  >
                        <h3>{ props.texts.text3.title }</h3>
                        <p> { props.texts.text3.text }</p>
                    </div>
                );
            case 3:
                return (
                    <div className="text-container opacity3"  >
                        <h3>{ props.texts.text4.title }</h3>
                        <p> { props.texts.text4.text }</p>
                    </div>
                );
            default:
                return (
                    <div></div>
                )
        }
    }

    return (
        <div id='GridImageAccordion'>
            <div className='images-container'>
                <img
                    src={props.images.image1}
                    className={active === 0 ? 'activeanim' : ''}
                    onClick={() => setActiveFloat(0)}
                    alt=' icon'
                />
                <img
                    src={props.images.image2}
                    className={active === 1 ? 'activeanim' : ''}
                    onClick={() => setActiveFloat(1)}
                    alt=' icon'
                />
                <img 
                    src={props.images.image3}
                    className={active === 2 ? 'activeanim' : ''}
                    onClick={() => setActiveFloat(2)}
                    alt=' icon'
                />
                <img 
                    src={props.images.image4}
                    className={active === 3 ? 'activeanim' : ''}
                    onClick={() => setActiveFloat(3)}
                    alt=' icon'
                />
            </div>
            { whichText() }
        </div>
    )
}
