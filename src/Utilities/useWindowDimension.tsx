import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
    isMobile:   width >= 578 ? false : true,
    isDesktop:  width >= 981 ? true : false
  };
}

/**
 * A hooks that return the current screen dimension
 * @returns 
 *  width     :number,
    height    :number,
    isMobile  :boolean
    isDesktop :boolean
 */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
