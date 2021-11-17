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
    projects :Array<{
        name :string;
        image :string;
        description :string;
        link :string;
    }>;
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

        <div className='barscolumn'>
            <div className='container'>
                <h3>Skills</h3>
                <Columns 
                    columns={props.skills}
                    isSingleVertical={isMobile}
                    columnCount={isDesktop ? 4 : 2}
                />
            </div>
        </div>

        <div className='projects'>
            <h3>Projects Highlight</h3>
            <div className='projects-item'>
                {
                    props.projects.map((project :{
                        name :string;
                        image :string;
                        description :string;
                        link :string;
                    }, index :number) => {
                        return (
                            <div key={index}>
                                <BasicCard
                                    image={project.image}
                                    title={project.name}
                                    text={project.description}
                                    btn={'Lunch'}
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
