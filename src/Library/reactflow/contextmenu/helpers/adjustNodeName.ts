
/**A function that return a new node name if the node is still named "Node", in this way the node name is
 * will be same as the loaded svg or lottie icon.
 * Also, remove the node name if the loaded image is an image
 */
export default function AdjustNodeNameIfStillDefault( targetNode :any, fileType :string, file :any) {
    let nodename :string = targetNode.data.label;

    if( nodename == '' || nodename.length <= 0 ) {
        switch(fileType) {
            case 'svg':
            case 'json':
                nodename = file.name.slice(0, file.name.lastIndexOf('.'));
                break;

            default:
                nodename = "";
        }
    }

    return nodename;
}
