import { HighFiveInterface } from "..";
import './HighFive.scss';

import React from 'react';

export function HighFive( props :HighFiveInterface) {
    const [currentState, setState] = React.useState(0);
    const [isFadeout, setFadeOut] = React.useState(false);

    return (
        <div id="highfive">
        { currentState === 0 &&
            <div className={`slide1 ${isFadeout ? "fadeout-anim" : " "}`}>
                <div className="image-state">
                    <img src={props.intro.image} alt={props.intro.image}
                        onClick={() => {
                            setFadeOut(true);
                            setTimeout(() => setState(1), 1000);
                            setTimeout(() => setState(2), 4000);
                        }}
                    />
                </div>
                <div className="text-state">
                    <h1>{props.intro.text}</h1>
                </div>
            </div>
        }

        { currentState === 1 &&
            <div className="slide1 transmission-state">
                <div className="text-state">
                    <h1>{props.transistion.text}</h1>
                </div>
            </div>
        }

        { currentState === 2 &&
            <div className="aboutme">
                <div className="text-state">
                    <p>{props.aboutme.text}</p>
                </div>
                <div className="aboutme-image">
                    <img src={props.aboutme.image} alt={props.intro.image}
                        
                    />
                </div>
                
            </div>
        }

        </div>
    )
}
