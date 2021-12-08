/**
 * Contents of the Column UI elements
 * @example
 * columns :Array<{
        title :string;
        text :string;
    }>;
    isSingleVertical?   :boolean;
    columnCount?    :1 | 2 | 3 | 4 | 5 | 6;
 */


export interface ColumnsInterface {
    columns :Array<{
        title :string;
        text :string;
    }>;
    isSingleVertical?   :boolean;
    columnCount?    :1 | 2 | 3 | 4 | 5 | 6;
    fade?   :boolean;
}