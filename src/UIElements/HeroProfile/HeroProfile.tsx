import './HeroProfile.scss';
import { HeroProfileInterface } from  '../_lib/HeroProfile';

import ProfileIcon from './ProfileIcon';
import Text from './Text';

/**
 * Used as the Hero Section
 * @example
    imagepath?      :string;
    imagesize?      :[string | number, string | number]
    welcomemsg?     :string;
    name?           :string;
    text?           :string;
    btnaction?      :Array<string>;
    btnactioncallback?  :(index :number, itemname :string) => void;

    {
        "imagepath":        "./assets/profile.jpg",
        "welcomemsg":       "Hi my name is",
        "name":             "Anghelo Amir",
        "text":             "\"Let's us [] Websites and Apps\"",
        "tags":             ["Make", "Improve", "Maintain"],
        "btnaction":        ["My Projects", "Contact Me"],
        "resumeDownload":   "https://angheloamir.github.io/#/projects"
    }
 */
export function HeroProfile(props :HeroProfileInterface) {   
    return (
        <div id='PongDesignDescriptiveCard'>
            <ProfileIcon
                {...props}
            />
            <Text
                {...props}
            />            
        </div>
    )
}
