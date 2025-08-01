/*
*/
export namespace ProjectLayoutInterface {
    export interface propsReceive {
        projects :Array<Cards>;
        projectOnAction: (index :number, name :string) => void;
        projectOnAction2:  (index :number, name :string) => void;
    }

    export interface Cards {
        name :string;
        image :string;
        description :string;
        tags :Array<string>;
        link :string;
        btntext: string;
        secbtn: string;
        link2 :string;
    }
}
