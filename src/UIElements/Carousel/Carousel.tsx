import React from 'react';
import { CarouselInterface } from '..';
import './Carousel.scss';

export function Carousel( props :CarouselInterface) {
    const [slides ,setSlides] = React.useState(0);

    function nextSlide() {
        if((slides + 1) < props.slides.length)
            setSlides(slides + 1);
    }
    
    function prevSlide() {
        if(slides > 0)
            setSlides(slides - 1);
    }
    
    return (
        <div id='carousel-slides'>
            <div className="slides">
                { props.slides.map((slide :any, index :number) => {
                    return (
                        <div className="slideItem" >
                            <img src={slide.image} alt='slide' />
                            <div className="textContainer">
                                <h3> {slide.title}</h3>
                                <p>  {slide.text} </p>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <div className="buttons">
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <button className="next" onClick={nextSlide}>&#10095;</button>
            </div>
        </div>
    )
}
