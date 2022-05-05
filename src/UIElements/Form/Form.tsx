import './form.module.scss';
import '../FancyButton/FancyButton.scss';
import React from 'react';

export interface FormProps {
    title   :string;
    text    :string;
}

export function Form(props :FormProps) {
    const [text, setText] = React.useState('');

    function handleSubmit() {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=angheloamir@gmail.com&su=Visitor&body=' + text);
    }

    return (
        <form
            onSubmit={(e :React.SyntheticEvent ) => { 
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div>
                <label >Send Me a Message </label>
                <textarea 
                    value={text}
                    onChange={ e => setText(e.target.value)} />
            </div>
            <button type="submit" id="PongDesignFancyButton">Submit</button>
        </form>
    );
}

/*
    <div>
        <label >Name </label>
        <input type="text" name="text" />
    </div>
    <div>
        <label >Email </label>
        <input type="email" name="email" />
    </div>
*/
