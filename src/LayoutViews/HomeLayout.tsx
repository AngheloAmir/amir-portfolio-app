/**
    @TYPE
        Layout - A layout 

    @DESCRIPTION
        Handle and renders appearance of the home page

    @VISIBLE
        The user is at home page
*/
import './layout/home.scss';
//import useDimension from '../_app/useWindowDimension';
import { HomeLayoutInterface } from './_lib/HomeLayoutInterface';
import {
    HeroProfile,
    GridImageAccordion,
    //Carousel,
    //Columns,
    BasicCard,
    //LinedStyled,
    //ModalBox
} from '../UIElements';

export default function HomeLayout( props :HomeLayoutInterface.propsReceive ) {
    //const { isMobile } = useDimension();

    return ( 
    <div id='Home'>
        <section id='hero'>
            <div className='content-container'>
                <HeroProfile {...props.introduction} />
            </div>
        </section>

        <section id='skills'>
            <div className='content-container'>
                <h1 className='skills-title'>What can I <span>DO?</span></h1>
                <GridImageAccordion { ...props.skills }/>
            </div>
        </section>
        
        <section id='projects'>
            <div className='content-container'>
                <h1 className='projects-title'><span>Projects</span> that I Create</h1>
                <div className='items'>
                    { props.projects.map((project :any, index :number) => {
                        return(
                            <div className='item'>
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
        </section>

     
    <p style={{width: '50px', margin: 'auto', paddingTop: '5rem'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A
    </p>
    </div> 
    );
}

/*
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
*/