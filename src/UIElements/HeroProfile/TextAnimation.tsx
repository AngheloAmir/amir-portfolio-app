import React from 'react';
import './TextAnimation.scss';

export interface propsReceive {
    tags :string[];
}

export default function TextAnimation(props :propsReceive) {
    //use for timers
    const update                     = React.useRef(false);
    const [timeToUpdate, makeUpdate] = React.useState(false);
    
    React.useEffect(()=> {
        const i = setInterval(() => {
            update.current = !update.current;
            makeUpdate(update.current)
        }, 3500);
        return () => clearInterval(i);
    }, []);

    const [index, setindex] = React.useState(-1);
    const [isOpactity, setOpacity] = React.useState(false);

    React.useEffect(() => {
        if((index + 1) >= props.tags.length) {
            setindex( 0 );
        }
        else
            setindex( index + 1);
        setOpacity( !isOpactity);

        // eslint-disable-next-line
    }, [timeToUpdate])

    return (
        <div id='textslideup-animation'>
            <div className='addOpacityEffect'>{props.tags[index]}</div>
        </div>
    )
}
