import './Text.scss';

import Typewriter from 'typewriter-effect';
import { FancyButton } from '..';

import TextAnimation from './TextAnimation';
import React from 'react';

export interface propsReceive {
    welcomemsg?     :string;
    name?           :string;
    text?           :string;
    tags?           :string[];
    btnaction?      :Array<string>;
    btnactioncallback? :(index :number, itemname :string) => void;
}

export default function Text(props :propsReceive) {
    function generateTagLine() {
        if(!props.tags) return <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
            { props.text?.split(' ').map((text :string, index :number) => {
                    if(text === "[]")
                        return (
                            <span key={index}><TextAnimation tags={props.tags ? props.tags : []} /></span>
                        );
                    return text + " ";
                })    
            }
            </React.Fragment>
        );
    }

    return (
        <div className='text'>
            <h3>{ props.welcomemsg }</h3>

            <h1>
                <Typewriter
                    options={{
                        strings: props.name,
                        cursor: '',
                        autoStart: true,
                        loop: false,
                        delay: 50,
                    }}
                />
            </h1>

            <h1 className='tagline'>
                { generateTagLine() }
            </h1>

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
    )
}