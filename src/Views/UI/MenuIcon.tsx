/*
    * TYPE
        Fragment of MainDesktop.tsx or MainMobile.tsx

    * DESCRIPTION
        Display an profile icon with an about information

    * VISIBLE WHEN
        At the Main (Home) of the application. It appear in the left side (desktop) or
        in the middle of the screen (mobile)
*/

interface propsReceive {
    isCross :boolean;
}

export default function MenuIcon(props :propsReceive) {
    return (
        <div id="menuicon1" className={  props.isCross ? "change" : '' } >
			<div className="bar1 hamburger-icon"></div>
			<div className="bar2 hamburger-icon"></div>
			<div className="bar3 hamburger-icon"></div>
		</div>
    )
}



/*
<div id="menuicon1" className={  iscross ? "change" : '' } onClick={ handleClick } >
			<div className="bar1 hamburger-icon"></div>
			<div className="bar2 hamburger-icon"></div>
			<div className="bar3 hamburger-icon"></div>
		</div>
*/