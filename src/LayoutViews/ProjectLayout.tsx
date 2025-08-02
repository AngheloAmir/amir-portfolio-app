/**
 * 
 */
import './layout/project.scss';
import { ProjectLayoutInterface } from './_lib/ProjectLayoutInterface';
import { BasicCard, LinedStyled } from '../UIElements';
import useDimension               from '../Library/useWindowDimension';

export default function ProjectLayout(props :ProjectLayoutInterface.propsReceive ) {
    const { isMobile } = useDimension();

    return (
        <div id='projects'>
            <LinedStyled
                text='My Projects'
                isHorizontal={!isMobile}
            />

            <div id='projectslist'>
                <div className='projects-item'>
                { props.projects.map((project :ProjectLayoutInterface.Cards, index :number) => {
                    return (
                        <div key={index}>
                            <BasicCard
                                image={project.image}
                                title={project.name}
                                text={project.description}
                                btn={project.btntext}
                                tags={project.tags}
                                onpress={() => props.projectOnAction(index, project.name)}
                                secbtn={project.secbtn}
                                onpresssec={() => props.projectOnAction2(index, project.name)}
                            />
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    );
}
