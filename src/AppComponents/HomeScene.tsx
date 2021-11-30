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
import HomeLayout from '../LayoutViews/HomeLayout';
import { FaHome, FaReact } from 'react-icons/fa'; 
import { MdContactPage } from 'react-icons/md';
import porfolioinfo from '../_database/portfolio.json';

export default function HomeScene() {
    const navitems = [
        {
            name: ' Home',
            icon: () => <FaHome />,
            active: true
        },
        {
            name: ' Projects',
            icon: () => <FaReact />,
        },
        {
            name: ' Contacts',
            icon: () => <MdContactPage />,
        },
    ];


    //https://msng.link/o/?Anghelo Amir=fm


    const handleIntroductionBTNAction = (i :number, itemname :string) => {
        if(i == 0) {
            window.open('./downloadable/amir-anghelo-resume-webdeveloper.pdf');
        }
    }

    const handleProjectAction = (index :number, name :string) => {
        window.open( porfolioinfo.projects[index].link);
    }

    return (
        <React.Fragment>
            <HomeLayout
                navigationbar={{
                    navitems:       navitems,
                    brandIconPath:  '',
                    navcallback:    (i :number, name :string) => console.log('you pressed :' + name)
                }}
                introduction={{
                    title:      porfolioinfo.name,
                    alias:      porfolioinfo.title,
                    text:       porfolioinfo.introtext,
                    imagepath:  porfolioinfo.profile,
                    btnaction:  porfolioinfo.btnaction,
                    btnactioncallback: handleIntroductionBTNAction
                }}
                skills={porfolioinfo.skills}
                projects={porfolioinfo.projects}
                projectOnAction={handleProjectAction}
            />
        </React.Fragment>
    );
}
