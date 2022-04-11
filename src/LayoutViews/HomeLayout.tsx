/**
    @TYPE
        Layout - A layout 

    @DESCRIPTION
        Handle and renders appearance of the home page

    @VISIBLE
        The user is at home page
*/
import './layout/home.scss';
import useDimension from '../_app/useWindowDimension';
import { HomeLayoutInterface } from './_lib/HomeLayoutInterface';
import {
    HeroProfile,
    Columns,
    BasicCard,
    LinedStyled,
    ModalBox
} from '../UIElements';

export default function HomeLayout( props :HomeLayoutInterface.propsReceive ) {
    const { isMobile, isTablet } = useDimension();

    return ( 
    <div id='Home'>
        <section id='hero'>
            <HeroProfile 
                title={props.introduction.title}
                alias={props.introduction.alias}
                text={props.introduction.text}
                imagepath={props.introduction.imagepath}
                btnaction={props.introduction.btnaction}
                btnactioncallback={props.introduction.btnactioncallback}
            />
        </section>

        <div id='barscolumn'>
            <div className='container'>
                <div className='content'>
                    <h3>Skills</h3>
                    <Columns 
                        columns={props.skills}
                        isSingleVertical={isMobile}
                        columnCount={2}
                        fade={false}
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
            { props.projects.map((project :HomeLayoutInterface.Cards, index :number) => {
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
            })}
            </div>
        </div>

        <footer>
            <h5>{props.footerText}</h5>
        </footer>

        <ModalBox
            isVisible={props.isModalVisible}
            onClose={props.onModalClose}
            onCloseText='Close'
            title={props.reachme.title}
            content={
            () => {
            return (
                <div id='ModalBoxContents'>
                    { props.reachme.items.map((item :HomeLayoutInterface.ReachMeItems, index :number) => {
                    return (
                        <div className='items' key={index}>
                            { item.link ?
                                <a href={item.link}>{item.name}</a>
                                :
                                <h4>{item.name}</h4>
                            }
                            { item.text && <p>{item.text}</p> }
                            { item.note && <p className='note'>{item.note}</p> }
                        </div>
                    )})}
                </div>
            )}}
        />
 
    </div> 
    );
}

/*
<HeaderProfile 
                title={props.introduction.title}
                alias={props.introduction.alias}
                text={props.introduction.text}
                imagepath={props.introduction.imagepath}
                isHorizontal={!isMobile}
                btnaction={props.introduction.btnaction}
                btnactioncallback={props.introduction.btnactioncallback}
            />
*/