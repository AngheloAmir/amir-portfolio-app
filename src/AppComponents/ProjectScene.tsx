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
import NavigationBar from './shared/NavigationBar';
import ProjectLayout from '../LayoutViews/ProjectLayout';
import projectlist   from '../_database/projectslist.json';
import porfolioinfo  from '../_database/portfolio.json';

export default function ProjectScene() {
    const handleProjectAction = (index :number, name :string) => {
        window.open( projectlist.projects[index].link);
    }

    const handleProjectAction2 = (index :number, name :string) => {
        window.open( projectlist.projects[index].link2 );
    }

    return (
        <React.Fragment>
            <NavigationBar />
            <ProjectLayout
                //@ts-ignore
                projects={ projectlist.projects }
                projectOnAction={handleProjectAction}
                projectOnAction2={handleProjectAction2}
                footer={{
                    ...porfolioinfo.footer
                }}
            />
        </React.Fragment>
    );
}
