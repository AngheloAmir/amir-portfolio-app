
/**Adjust the size of the node based on the loaded image */
export default function AdjustNodeSize(fileType :string, loadedImageWidth :number, loadedImageHeight :number, targetNode? :any) {
    let newNodeWidth, newNodeHeight;

    switch(fileType) {
        case 'svg':
            if( (loadedImageWidth *0.9)  < 100)  newNodeWidth  = 100;
            else                        newNodeWidth  = loadedImageWidth * 0.9;   
            if( (loadedImageHeight * 0.9) < 100) newNodeHeight = 100;
            else                        newNodeHeight = loadedImageHeight * 0.9;
            
            break;

        case 'json':
            newNodeWidth  = 150;
            newNodeHeight = 150;
            break;

        default:
            const scale = 0.7;
            newNodeWidth  = loadedImageWidth  * scale;
            newNodeHeight = loadedImageHeight * scale;

        //if the node size has been adjusted
            if( targetNode != undefined && targetNode.height != undefined ) {
        //if the image can fit inside the node, then  do not adjust the node size, it will remain the same
                if( targetNode.height > ( newNodeHeight + 42) ) 
                    newNodeHeight = targetNode.height;
        //since the image can fit inside then, increase the node size plus the height of the label area.
                else
                    newNodeHeight = newNodeHeight + targetNode.height;
            }
            
        //the node size is never been adjusted. So the image height + label size
            else
                newNodeHeight = newNodeHeight + 42;
    }

    return {
        width:  newNodeWidth,
        height: newNodeHeight
    }
}
