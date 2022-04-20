/**
    @TYPE
        Controller - A component that handles the functionality

    @DESCRIPTION
        It also handle the process (what happen when a button is clicked).

    @VISIBLE
        The user is at home page

    @NOTICE
        This component return statement should not contain any html tags and text/data.
        only providing the process and data from StateAPI
*/
import React from 'react';
import { useHistory } from 'react-router-dom';
import HomeLayout from '../LayoutViews/HomeLayout';
import porfolioinfo from '../_database/portfolio.json';
import NavigationBar from './shared/NavigationBar';


export default function HomeScene() {
    const history = useHistory();
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleIntroductionBTNAction = (i :number, itemname :string) => {
        if(i === 0) {
            window.open(porfolioinfo.herosection.resumeDownload);
        }
        if(i === 1)
            setModalVisible(true);
    }

    const handleProjectAction = (index :number, name :string) => {
        window.open( porfolioinfo.projects[index].link);
    }

    const handleProjectMore = () => {
        history.push('/projects');
    }

    const handleModalClose = () => {
        setModalVisible(false);
    }

    return (
        <React.Fragment>
            <HomeLayout
                //Hero section data
                introduction={{
                    ...porfolioinfo.herosection,
                    btnactioncallback: handleIntroductionBTNAction
                }}

                //skill section data
                skills={{ ...porfolioinfo.skilsSections }}

                //project section data
                projects={porfolioinfo.projects}
                projectOnAction={handleProjectAction}
                projectOnMore={handleProjectMore}
               
                //about me section
                introduceMe={porfolioinfo.introsection}
                
            />
            <NavigationBar />
        </React.Fragment>
    );
}
