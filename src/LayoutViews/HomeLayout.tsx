/**
    @TYPE
        Layout - A layout 

    @DESCRIPTION
        Handle the appearance of the home page

    @VISIBLE
        The user is at home page
*/
import './layout/home.scss';
import useDimension from '../Utilities/useWindowDimension'
import {
    Navbar,
    SlidingMenu,
    NavItem,
    HeaderProfile,
    //FancyButton,
    Columns,
    BasicCard,
    LinedStyled
} from '../UIElements';

interface propsReceive {
    navigationbar :{
        brandIconPath :string;
        navitems :Array<NavItem>;
        navcallback :(i :number, name :string) => void;
    };
    introduction :{
        title :string;
        alias :Array<string>;
        text :string;
        imagepath :string;
    };
    skills: Array<{
        title: string;
        text :string;
    }>;
    projects :Array<Cards>;
}

interface Cards {
    name :string;
    image :string;
    description :string;
    tags :Array<string>;
    link :string;
    btntext: string;
}

export default function HomeLayout( props :propsReceive ) {
    const { isMobile, isDesktop } = useDimension();

    return ( 
    <div id='Home'>
        <div className='navbar'>
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

        <div className='introduction'>
            <HeaderProfile 
                title={props.introduction.title}
                alias={props.introduction.alias}
                text={props.introduction.text}
                imagepath={props.introduction.imagepath}
                isHorizontal={!isMobile}
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
                props.projects.map((project :Cards, index :number) => {
                    return (
                        <div key={index}>
                            <BasicCard
                                image={project.image}
                                title={project.name}
                                text={project.description}
                                btn={project.btntext}
                                tags={project.tags}
                                onpress={() => alert('pressed')}
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
