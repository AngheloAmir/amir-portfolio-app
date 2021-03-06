import { ColumnsInterface } from '../';
import './Columns.scss';

/**
 * A column for text and description.
 * @example
 * columns :Array<{
        title :string;
        text :string;
    }>;
    isHorizontal?   :boolean;
    columnCount?    :1 | 2 | 3 | 4 | 5 | 6; //ignored if isHorizontal is true
 */
export function Columns(props :ColumnsInterface) {
    let enableMagicShow :boolean = props.fade ? true : false;

    let columnClassName = 'column1';
    if(props.columnCount && !props.isSingleVertical) {
        switch( props.columnCount) {
            case 1: columnClassName = 'column1'; break;
            case 2: columnClassName = 'column2'; break;
            case 3: columnClassName = 'column3'; break;
            case 4: columnClassName = 'column4'; break;
            case 5: columnClassName = 'column5'; break;
            case 6: columnClassName = 'column6'; break;
            default: break;
        }
    }
    else if(props.isSingleVertical)
        columnClassName='singular';

    return (
        <div id='PongDesignColumns' className={columnClassName}>
            {
                props.columns.map(({title, text}, index :number) => {
                    return (
                        <div key={index} className={enableMagicShow ? 'magic' : ''}>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    );
                })
            }
        </div>
    )
}
