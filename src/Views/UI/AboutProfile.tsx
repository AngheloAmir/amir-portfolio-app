/*
    * TYPE
        Fragment of MainDesktop.tsx or MainMobile.tsx

    * DESCRIPTION
        Display an profile icon with an about information

    * VISIBLE WHEN
        At the Main (Home) of the application. It appear in the left side (desktop) or
        in the middle of the screen (mobile)
*/
import './scss/AboutProfile.scss';

interface propsReceive {
    imagepath   :string;
    text        :string;
}

export default function AboutProfile(props :propsReceive) {
    return (
        <div id='AboutProfile'>
            <div>
                <img src={props.imagepath} alt={props.imagepath}/>
            </div>
            <div className='contents'>
                <h3> V ABOUT</h3>
                <p> {props.text} </p>
            </div>
        </div>
    );
}
