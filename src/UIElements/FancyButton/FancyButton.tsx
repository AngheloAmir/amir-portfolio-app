/*
*/
import React from 'react';
import './FancyButton.scss';

export function FancyButton() {
    const [iseffect, setEffect] = React.useState( false );
	
	const handleClick = (e :any) => {
		e.stopPropagation();
		setEffect( true );
		setTimeout( () => {
				setEffect( false );
				//callback();
			}, 300 );
	}
	
	return (
		<button id="PongDesignFancyButton" style={ iseffect ? { position: "relative" } : {} } onClick={ handleClick } >
			Hire ME
			{
				iseffect ? <div className="ripple-effect"></div> : ''
			}
		</button>
	);
}