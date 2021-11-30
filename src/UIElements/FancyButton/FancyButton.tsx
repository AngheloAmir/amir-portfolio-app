/*
*/
import './FancyButton.scss';

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
