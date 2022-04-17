import './BasicCard.scss';

import { BasicCardInterface, FancyButton } from '../';

/**
 * Contents of the Basic Card UI Element
 * @example
 * image?   :string;
    title?   :string;
    text?    :string;
    btn?     :string;
    tags?    :Array<string>;
    onpress? :() => void;
 */
export function BasicCard( props :BasicCardInterface) {
    return (
        <div id='PongDesignBasicCard'>
            { props.image && <img src={props.image} alt={props.image} />}
            <div className="information">
                { props.title && <h3>{props.title}</h3> }
                { props.text  && <p>{props.text}</p> }
                <div className='tags'>
                    { props.tags  && props.tags.map((item :string, i :number) => {
                        return (
                            <span key={i}>{item}</span>
                        )
                    })
                    }
                </div>
            </div>
            <div className='btn'>
                { props.btn &&
                    <FancyButton
                        name={props.btn}
                        //@ts-ignore
                        callback={() => props.onpress()}
                    />
                }
            </div>
        </div>
    )
}
//{ props.btn && <button onClick={props.onpress}>{props.btn}</button> }
