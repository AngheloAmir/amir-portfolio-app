import './form.module.scss';
import '../FancyButton/FancyButton.scss';
import { FormInterface } from '../';
import React from 'react';

/**
 * A resuable form
 * 
 * @example
 * <Form 
        forms={[
            {
                name: 'input 1',
                type: 'text'
            }
        ]}
        callback={(data) => alert(JSON.stringify(data))}
 * />
 */
export function Form(props :FormInterface) {
    const [formData, setData] = React.useState([{}]);

    React.useEffect(() => {
        const forms = props.forms.map(data => {
            return { name: data.name, value: '' }
        });
        setData(forms);
    }, [props.forms]);

    function handleSubmit( e :React.SyntheticEvent ) {
        e.preventDefault();
        props.callback(formData);
    }

    function handleTextChange(e :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index :number) {
        const newdata = formData.map((data :any, i :number) => {
            if(i === index)
                return { name: data.name, value :e.target.value }
            return data;
        });
        setData(newdata);
    }

    return (
        <form onSubmit={handleSubmit}>
            { props.forms.map((form :{name :string, type: string}, index :number) => {
                return (
                    <div>
                        <label>{form.name}</label>
                        { form.type === 'text' ?
                            <textarea
                                onChange={(e) => handleTextChange(e, index)}
                            />
                            :
                            <input type={form.type}
                                onChange={(e) => handleTextChange(e, index)}
                            />
                        }
                    </div>
                )
            })}
            <button type="submit" id="PongDesignFancyButton">Submit</button>
        </form>
    );
}
