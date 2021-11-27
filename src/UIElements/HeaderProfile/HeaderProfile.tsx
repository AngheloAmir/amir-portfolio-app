/*
*/
import './HeaderProfile.scss';

import Typewriter from 'typewriter-effect';

import { HeaderProfileInterface } from  '../_lib/HeaderProfile';

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
export function HeaderProfile(props :HeaderProfileInterface) {
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
                    <h3>
                    { props.alias &&
                        <Typewriter
                            options={{
                                strings: props.alias,
                                cursor: '',
                                autoStart: true,
                                loop: true,
                                delay: 50,
                                deleteSpeed: 30,
                            }}
                        />
                    }
                    </h3>
                    <p>{props.text}</p>
                </div>

                { props.btnaction &&
                    <h4>{props.btnaction[0]}</h4>
                }

                { props.btnaction &&
                    <h4>{props.btnaction[1]}</h4>
                }
        </div>
    )
}
