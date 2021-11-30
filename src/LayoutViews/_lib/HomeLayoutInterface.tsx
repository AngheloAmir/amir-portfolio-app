/*
*/
import { NavItem } from '../../UIElements';

export namespace HomeLayoutInterface {
    export interface propsReceive {
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
            btnaction  :Array<string>;
            btnactioncallback :(index :number, itemname :string) => void;
        };
        skills: Array<{
            title: string;
            text :string;
        }>;
        projects :Array<Cards>;
        projectOnAction: (index :number, name :string) => void;
    }
    
    export interface Cards {
        name :string;
        image :string;
        description :string;
        tags :Array<string>;
        link :string;
        btntext: string;
    }
}