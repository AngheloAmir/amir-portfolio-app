/**
 * Contents of the Basic Card UI Element
 * @example
 * image?   :string;
    title?   :string;
    text?    :string;
    btn?     :string;
    tags?    :Array<string>;
    onpress? :() => void;
 */

export interface BasicCardInterface {
    image?   :string;
    title?   :string;
    text?    :string;
    btn?     :string;
    secbtn?  :string;
    seclink? :string;
    tags?    :Array<string>;
    onpress?    :() => void;
    onpresssec? :() => void;
}