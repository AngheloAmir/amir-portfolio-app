/**
    @TYPE
        Fragment - A fragment of HomeLayout.tsx

    @DESCRIPTION
        

    @VISIBLE
        It appears in the top of the screen
*/
import React from 'react';
import { DescriptiveCard } from '../../UIElements';

export default function IntroductionContents() {
    return (
        <React.Fragment>
            <DescriptiveCard 
                     title='asdasdasdasdasd'
                     alias='asdasdasdasdasd'
                     text='asdasdasdasd'
                     imagepath='logo192.png'
            />
        </React.Fragment>
    );
}