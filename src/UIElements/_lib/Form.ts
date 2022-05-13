
export interface FormInterface {
    forms   :Array<{
        name    :string;
        type    : string | 'text' | 'input' | 'email' | 'number';
    }>;
    callback    :( res :any) => void;
}
