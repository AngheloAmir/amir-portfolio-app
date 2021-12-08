import './FancyButton.scss';

/**
 * A button designed with PongDesign theme
 * @example
 * name 		:string;
 * callback		:() => void; 
 */
export function FancyButton( {name, callback } :{name :string, callback :() => void}) {
	const handleClick = (e :any) => {
		e.stopPropagation();
		callback();
	}
	
	return (
		<button id="PongDesignFancyButton" onClick={ handleClick } >
			{name}
		</button>
	);
}
