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
    DescriptiveCard,
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
        alias :string;
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
            <DescriptiveCard 
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
            <h3>Projects</h3>
            <div className='item'>
                    asdasdasd
                </div>
                <div className='item'>
                    asdasdasd
                </div>
            <BasicCard />

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta laboriosam facere consequatur architecto accusantium quibusdam ducimus, nam nisi sint porro adipisci sequi tempore repudiandae aspernatur fugit non tenetur dignissimos quia.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta laboriosam facere consequatur architecto accusantium quibusdam ducimus, nam nisi sint porro adipisci sequi tempore repudiandae aspernatur fugit non tenetur dignissimos quia.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta laboriosam facere consequatur architecto accusantium quibusdam ducimus, nam nisi sint porro adipisci sequi tempore repudiandae aspernatur fugit non tenetur dignissimos quia.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta laboriosam facere consequatur architecto accusantium quibusdam ducimus, nam nisi sint porro adipisci sequi tempore repudiandae aspernatur fugit non tenetur dignissimos quia.</p>
        </div>
    </div> 
    );
}
