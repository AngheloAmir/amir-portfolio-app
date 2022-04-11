import './HeroProfile.scss';

import Typewriter from 'typewriter-effect';

import { HeaderProfileInterface } from  '../_lib/HeroProfile';
import { FancyButton } from '..';

/**
 * Used as the Hero Section
 * @example
 * imagepath?       :string;
 * imagesize?       :[string | number, string | number]
    title?          :string;
    alias?          :string;
    text?           :string;
    btnaction?      :Array<string>;
    btnactioncallback? :(index :number, itemname :string) => void;
 */
export function HeroProfile(props :HeaderProfileInterface) {   
    return (
        <div id='PongDesignDescriptiveCard'>
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
                    <h3>Hi my name is</h3>
                    <h1>
                        <Typewriter
                            options={{
                                strings: props.title,
                                cursor: '',
                                autoStart: true,
                                loop: false,
                                delay: 50,
                            }}
                        />
                    </h1>
                    <h1 className='tagline'>"Let's <span>Create</span> and <span>Continue</span> Websites and Apps"</h1>

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

/*
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
*/