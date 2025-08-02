import './SocialLinks.scss';
import { SocialLinksInterface } from '..';

import * as FaIcons from 'react-icons/fa';

export function SocialLinks(props :SocialLinksInterface) {
    const size = 52;
    const FaGithub         = FaIcons.FaGithub         as React.ComponentType<{ size: number }>;
    const FaLinkedin       = FaIcons.FaLinkedin       as React.ComponentType<{ size: number }>;
    const FaFacebookSquare = FaIcons.FaFacebookSquare as React.ComponentType<{ size: number }>;
    const FaTwitterSquare  = FaIcons.FaTwitterSquare  as React.ComponentType<{ size: number }>;

    return (
        <div id='SocialLinks'>
            { props.github &&
                <a href={props.github}>
                    <FaGithub size={size} />
                </a>
            }
            { props.linkedin &&
                <a href={props.linkedin}>
                    <FaLinkedin
                        size={size}
                    />
                </a>
            }
            { props.facebook &&
                <a href={props.facebook}>
                    <FaFacebookSquare
                        size={48}
                    />
                </a>
            }
            { props.twitter &&
                <a href={props.twitter}>
                    <FaTwitterSquare
                        size={size}
                    />
                </a>
            }
        </div>
    )
}
