/**
    @TYPE
        Layout - A layout 

    @DESCRIPTION
        Handle the appearance of the home page

    @VISIBLE
        The user is at home page
*/
import './layout/home.scss';
import useDimension from '../_app/useWindowDimension';
import { HomeLayoutInterface } from './_lib/HomeLayoutInterface';
import {
    Navbar,
    SlidingMenu,
    HeaderProfile,
    Columns,
    BasicCard,
    LinedStyled
} from '../UIElements';

export default function HomeLayout( props :HomeLayoutInterface.propsReceive ) {
    const { isMobile, isDesktop } = useDimension();

    return ( 
    <div id='Home'>
        <div id='navbar'>
            {!isMobile ?
                <Navbar
                    brandIconPath={props.navigationbar.brandIconPath}
                    items={props.navigationbar.navitems}
                    callback={props.navigationbar.navcallback}
                />
                :
                <SlidingMenu
                    items={props.navigationbar.navitems}
                    callback={props.navigationbar.navcallback}
                />
            }
        </div>

        <div id='introduction'>
            <HeaderProfile 
                title={props.introduction.title}
                alias={props.introduction.alias}
                text={props.introduction.text}
                imagepath={props.introduction.imagepath}
                isHorizontal={!isMobile}
                btnaction={props.introduction.btnaction}
                btnactioncallback={props.introduction.btnactioncallback}
            />
        </div>

        <div id='barscolumn'>
            <div className='container'>
                <div className='content'>
                    <h3>Skills</h3>
                    <Columns 
                        columns={props.skills}
                        isSingleVertical={isMobile}
                        columnCount={isDesktop ? 4 : 2}
                    />
                </div>
            </div>
        </div>

        <div id='projects'>
            <LinedStyled
                text='Projects Highlight'
                isHorizontal={!isMobile}
            />
            <div className='projects-item'>
            {
                props.projects.map((project :HomeLayoutInterface.Cards, index :number) => {
                    return (
                        <div key={index}>
                            <BasicCard
                                image={project.image}
                                title={project.name}
                                text={project.description}
                                btn={project.btntext}
                                tags={project.tags}
                                onpress={() => props.projectOnAction(index, project.name)}
                                />
                        </div>
                    )
                })
            }
            </div>
        </div>
    </div> 
    );
}
