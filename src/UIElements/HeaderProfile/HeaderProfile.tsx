/*
*/
import './HeaderProfile.scss';

import Typewriter from 'typewriter-effect';

import { HeaderProfileInterface } from  '../_lib/HeaderProfile';
import { FancyButton } from '../';

/**
 * Card used for noticable information such as Profile home page  
 * @example
 * imagepath?       :string;
 * imagesize?       :[string | number, string | number]
    title?          :string;
    alias?          :string;
    text?           :string;
    isHorizontal?   :boolean;
    btnaction?      :Array<string>;
    btnactioncallback? :(index :number, itemname :string) => void;
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
                                delay: 30,
                                deleteSpeed: 30,
                                //@ts-ignore
                                pauseFor: 2000,
                            }}
                        />
                    }
                    </h3>
                    <p>{props.text}</p>

                    { props.btnaction && props.btnactioncallback &&
                    <div id='calltoactions'> 
                        { props.btnaction[0] && 
                            <FancyButton name={props.btnaction[0]}
                            //@ts-ignore
                            callback={() => props.btnactioncallback(0, props.btnaction[0])} />
                        }
                        { props.btnaction[1] &&
                            <FancyButton name={props.btnaction[1]}
                            //@ts-ignore
                            callback={() => props.btnactioncallback(1, props.btnaction[1])} />
                        }
                    </div>
                    }

                </div>
        </div>
    )
}
