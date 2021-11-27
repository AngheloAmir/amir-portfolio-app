/**
 * Contents of the HeaderProfile UI elements
 * @example
 * imagepath?       :string;
 * imagesize?       :[string | number, string | number]
    title?          :string;
    alias?          :string;
    text?           :string;
    isHorizontal?   :boolean;
 */
export interface HeaderProfileInterface {
    imagepath?      :string;
    imagesize?      :[string | number, string | number]
    title?          :string;
    alias?          :Array<string>;
    text?           :string;
    isHorizontal?   :boolean;
    btnaction?      :Array<string>;
    btnactioncallback? :(index :number, itemname :string) => void;
}
