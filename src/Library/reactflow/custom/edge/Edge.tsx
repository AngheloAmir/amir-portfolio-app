import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSmoothStepPath, getStraightPath, useInternalNode } from '@xyflow/react';
import getEdgeParams            from './_floatingEdgeHelper';
import {getEdgeParamsFloating } from './_FloatingHelper';
import useFlowState, { EdgeParam }            from "../../core";
import {  useMemo }             from 'react';

export default function DefaultEdge( edgeData :EdgeParam ) {
    const theme      = useFlowState.use.theme();
    const sourceNode = useInternalNode( edgeData.source);
    const targetNode = useInternalNode( edgeData.target);
   
    if (!sourceNode || !targetNode) {
        return null;
    }

    const SourceTargetParams = useMemo(() => {
       const params = edgeData.data.type == 'floating' ?
            getEdgeParamsFloating( sourceNode, targetNode ) : 
            getEdgeParams( sourceNode, targetNode );

        let edgePath, labelX, labelY, values;
        switch( edgeData.data.pathtype ) {
            case 'smooth':
                values = getSmoothStepPath({
                    sourceX:        params.sx,
                    sourceY:        params.sy,
                    sourcePosition: params.sourcePos,
                    targetPosition: params.targetPos,
                    targetX:        params.tx,
                    targetY:        params.ty,
                });
                edgePath = values[0];
                labelX   = values[1];
                labelY   = values[2];
                break;
    
            case 'straight':
                values = getStraightPath({
                    sourceX: params.sx,
                    sourceY: params.sy,
                    targetX: params.tx,
                    targetY: params.ty,
                });
                edgePath = values[0];
                labelX   = values[1];
                labelY   = values[2];
                break;
    
            default:
                values = getBezierPath({
                    sourceX:            params.sx,
                    sourceY:            params.sy,
                    sourcePosition:     params.sourcePos,
                    targetPosition:     params.targetPos,
                    targetX:            params.tx,
                    targetY:            params.ty,
                });
                edgePath = values[0];
                labelX   = values[1];
                labelY   = values[2];
                break;
        }
        
        return {
            edgePath,
            labelX,
            labelY,
        }
    }, [ 
        sourceNode.position,
        sourceNode.width,
        sourceNode.height,
        targetNode.position,
        targetNode.width,
        targetNode.height,
        edgeData.data.type,
        edgeData.data.pathtype,
    ]);

    const EdgeLabelClassAndStyle = useMemo(() => {
        const edgeId    = `edge-label-${edgeData.id}`;
        const edgeStyle = { transform: `translate(-50%, -50%) translate(${ SourceTargetParams.labelX }px, ${ SourceTargetParams.labelY }px)` };
        const edgeClass = `text-center tracking-wider max-w-[260px] absolute  bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 leading-normal `;
        return { edgeId, edgeStyle, edgeClass };
    }, [ SourceTargetParams ]);

    return (
        <>
            <EdgeLabelRenderer>
                <div 
                    id={ EdgeLabelClassAndStyle.edgeId }
                    style={ EdgeLabelClassAndStyle.edgeStyle }
                    className={ EdgeLabelClassAndStyle.edgeClass }
                >
                    <div className={`${ !edgeData.data.label || edgeData.data.label.length == 0 ? 'h-[24px]' : ''} ${edgeData.data.showTextInput ? 'opacity-0' : ''}`}>
                        { edgeData.data.label }  
                    </div>
                </div>
            </EdgeLabelRenderer>

            <BaseEdge
                path={ SourceTargetParams.edgePath }
                markerEnd={ edgeData.markerEnd }
                markerStart={ edgeData.markerStart }
                style={
                    edgeData.selected ?
                    {
                        ...edgeData.style,
                        strokeDasharray: '15, 3',
                        strokeWidth:     4,
                    }
                    :
                    edgeData.style
                }
                interactionWidth={42}
                className="edgePath"
            /> 
        </>
    );
}
