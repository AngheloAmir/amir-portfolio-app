/**
 * Contents of the HeaderProfile UI elements
 * @example
 * imagepath?       :string;
 * imagesize?       :[string | number, string | number]
    title?          :string;
    alias?          :string;
    text?           :string;
 */
export interface HeroProfileInterface {
    imagepath?      :string;
    imagesize?      :[string | number, string | number]
    welcomemsg?     :string;
    name?           :string;
    text?           :string;
    tags?           :string[];
    btnaction?      :Array<string>;    
    btnactioncallback?  :(index :number, itemname :string) => void;
}
