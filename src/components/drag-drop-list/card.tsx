import React, { useImperativeHandle, useRef } from 'react';
import {
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DragSourceMonitor,
    DragSource,
    DropTarget,
    DropTargetConnector,
    DragSourceConnector,
} from 'react-dnd';

export interface CardProps {
    id: any;
    text: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    onDragEnd: ({ id, index }: { id: any; index: number }) => void;
    renderItem?: Function;
    accepts?: string[];

    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
}

interface CardInstance {
    getNode(): HTMLDivElement | null;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ text, index, connectDragSource, connectDropTarget, renderItem }, ref) => {
        const elementRef = useRef(null);
        connectDragSource(elementRef);
        connectDropTarget(elementRef);

        useImperativeHandle<any, CardInstance>(ref, () => ({
            getNode: () => elementRef.current,
        }));

        return (
            <div ref={elementRef} className="drag-item">
                {renderItem ? renderItem(text, index) : text}
            </div>
        );
    }
);

export default DropTarget(
    (props: CardProps) => props.accepts || [],
    {
        hover(props: CardProps, monitor: DropTargetMonitor, component: CardInstance) {
            if (!component) {
                return null;
            }
            // node = HTML Div element from imperative API
            const node = component.getNode();
            if (!node) {
                return null;
            }

            const dragIndex = monitor.getItem().index;
            const hoverIndex = props.index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Time to actually perform the action
            props.moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
        },
    },
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
    })
)(
    DragSource(
        (props: CardProps) => props?.accepts?.[0] || '',
        {
            beginDrag: (props: CardProps) => ({
                id: props.id,
                index: props.index,
            }),
            endDrag: (props: CardProps) => {
                props.onDragEnd({ id: props.id, index: props.index });
            },
        },
        (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        })
    )(Card)
);
