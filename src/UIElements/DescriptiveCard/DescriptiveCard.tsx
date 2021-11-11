/*
*/
import './DescriptiveCard.scss';

import { DescriptiveCardInterface } from  '../_lib/DescriptiveCard';

/**
 * Card used for noticable information such as Profile home page  
 * @example
 * imagepath?       :string;
 * imagesize?       :[string | number, string | number]
    title?          :string;
    alias?          :string;
    text?           :string;
    isHorizontal?   :boolean;
 */
export function DescriptiveCard(props :DescriptiveCardInterface) {
    const containerClass :string = props.isHorizontal ? 'horizontal' : 'vertical';
    return (
        <div id='PongDesignDescriptiveCard' className={containerClass}>
                { props.imagepath &&
                    <div className='imagecontainer'>
                        { props.imagesize ?
                            <img src={props.imagepath} alt={props.imagepath}
                                style={{width: props.imagesize[0], height: props.imagesize[1]}}/>
                            :
                            <img src={props.imagepath} alt={props.imagepath} />
                        }
                        
                    </div>
                }
                <div className='text'>
                    <h1>{props.title}</h1>
                    <h3>{props.alias}</h3>
                    <p>{props.text}</p>
                </div>
        </div>
    )
}
