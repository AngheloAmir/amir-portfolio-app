/**
 * Contents of the Basic Card UI Element
 * @example
 * 
 */

export interface BasicCardInterface {
    image?   :string;
    title?   :string;
    text?    :string;
    btn?     :string;
    tags?    :Array<string>;
    onpress? :() => void;
}