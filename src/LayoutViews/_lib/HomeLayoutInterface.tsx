/*
*/
import { HeroProfileInterface, GIAInterface } from '../../UIElements';

export namespace HomeLayoutInterface {
    export interface propsReceive {
        introduction :HeroProfileInterface;
        skills       :GIAInterface


        
        projects :Array<Cards>;
        projectOnAction: (index :number, name :string) => void;

        reachme: {
            title :string;
            text :string;
            items :Array<ReachMeItems>
        },
        isModalVisible: boolean;
        onModalClose:   () => void;
        footerText:     string;
    }
    
    export interface Cards {
        name :string;
        image :string;
        description :string;
        tags :Array<string>;
        link :string;
        btntext: string;
    }

    export interface ReachMeItems {
        name? :string;
        link? :string;
        text? :string;
        note? :string;
    }
}
