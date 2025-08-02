import './LinedStyled.scss';

/**
 * Draw a horizontal with a text in the middle (or just line or text)
 * @example
 * text?            :string;
 * isHorizontal?    :boolean; (Will render line)
 */
export function LinedStyled({text, isHorizontal} :{text? :string, isHorizontal? :boolean}) {
    return (
        <div id='LinedStyled'>
            { isHorizontal && <div className='line'></div> }
            { text && <h3>{text}</h3> }
            { isHorizontal && <div className='line'></div> }
        </div>
    )
}
