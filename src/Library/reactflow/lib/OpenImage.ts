/**Open up a file explorer similar to OpenFile but more specific in Image reading 
 * 
 * @example
 *  OpenFileImage( (file, content, width, height) => {
        const nodes      = getNodes();
        const targetNode = nodes.find( (edge) => edge.id == contextTriggeringData.id ) as any;
        showContextMenu( 'none', undefined, contextTriggeringData );

        console.log( width, height  );

        updateNode( contextTriggeringData.id, 
            { 
                ...targetNode,
                data: {
                    ...targetNode.data,
                    image: content,
                }
        });
    })
  
*/
export default function OpenFileImage(cb: (file: File | boolean, content: string | ArrayBuffer | null, width: any, height: any) => void) {
    const input = document.createElement('input');
    input.type = 'file';
  

    input.onchange = (e: any) => {
      const file = e.target.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent: any) => {
          if (readerEvent && readerEvent.target) {
            const content = readerEvent.target.result;
            const imageUrl = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
              const width = img.width;
              const height = img.height;
              URL.revokeObjectURL(imageUrl);
              cb(file, content, width, height);
            };
            img.src = imageUrl;
          }
        };
      } 

      else if (file.type.startsWith("application/json")) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (readerEvent: any) => {
          if (readerEvent && readerEvent.target) {
            const content = JSON.parse(readerEvent.target.result);
            cb(file, content, 0, 0);
          }
        };
      }
      
      else {
        cb(false, '', null, null);
      }
    };
  
    input.click();
  }