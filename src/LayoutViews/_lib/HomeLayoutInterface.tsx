/*
*/
import { HeroProfileInterface, GIAInterface, HighFiveInterface, FormInterface } from '../../UIElements';

export namespace HomeLayoutInterface {
    export interface propsReceive {
        introduction :HeroProfileInterface;
        skills       :GIAInterface;
        projects     :Array<Cards>;
        projectOnAction: (index :number, name :string) => void;
        projectOnMore:   () => void;
        contactMe    :FormInterface;

        introduceMe  :HighFiveInterface;
    };

    export interface Cards {
        name :string;
        image :string;
        description :string;
        tags :Array<string>;
        link :string;
        btntext: string;
    }
}
