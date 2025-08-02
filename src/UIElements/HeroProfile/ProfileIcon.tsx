import React from 'react';
import './ProfileIcon.scss';

interface propsReceive {
    imagepath?       :string;
    imagesize?       :[string | number, string | number]
}

export default function ProfileIcon(props :propsReceive) {
    if(props.imagepath === undefined || props.imagepath === '')
        return <React.Fragment></React.Fragment>

    return (
        <div className='imagecontainer'>
            { props.imagesize ?
                <img src={props.imagepath} alt={props.imagepath}
                    style={{width: props.imagesize[0], height: props.imagesize[1]}}/>
                :
                <img src={props.imagepath} alt={props.imagepath} />
            }
        </div>
    )
}
