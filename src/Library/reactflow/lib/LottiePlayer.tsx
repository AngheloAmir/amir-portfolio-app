import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottiePlayer = ({ animationData, loop = true, autoplay = true, style = {}, path = undefined } :any ) => {
  const containerRef = useRef<any>(null); // Reference for the container

  useEffect(() => {
    lottie.setQuality('low');

    const anim = lottie.loadAnimation({
      container: containerRef.current, // Lottie will inject the canvas here
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
      path,
    });

    // Cleanup on unmount
    return () => anim.destroy();
  }, [animationData, loop, autoplay]);

  return <div className='w-full h-full' ref={containerRef} style={style}></div>; // Container div for Lottie to inject canvas
};

export default LottiePlayer;
