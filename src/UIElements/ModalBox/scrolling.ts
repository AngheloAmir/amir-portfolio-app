/*
    Used to stop the body scrolling when something is displayed on the screen
*/

/**
 * Disable the body scrolling
 */
export function stopScroll() {
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){ window.scrollTo(x, y); };
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
}

/**
 * Enable the body scrolling
 */
export function enableScroll() {
    window.onscroll = null;
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
}
