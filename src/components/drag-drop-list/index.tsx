import React, { useEffect, useState } from 'react';
import Card from './card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Props = {
    dataSource: any[];
    renderItem?: Function;
    onDragEnd?: Function;
    dataKey?: string;
    renderContent?: Function;
    className?: string;
    accepts?: string[];
};

const DragDropList: React.FC<Props> = ({
    dataSource,
    dataKey,
    renderItem,
    onDragEnd,
    renderContent,
    className,
    accepts,
}) => {
    const [cards, setCards] = useState(dataSource);

    useEffect(() => {
        setCards(dataSource);
    }, [dataSource]);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];

        let localCard = [...cards];
        localCard.splice(dragIndex, 1);
        localCard.splice(hoverIndex, 0, dragCard);

        setCards([...localCard]);
    };

    const dragEnd = ({ id, index }: { id: any; index: number }) => {
        onDragEnd && onDragEnd(cards);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`drag-drop-list-wrapper ${className || ''}`}>
                {cards.map((card: any, i: number) => (
                    <div className="drag-drop-list-item" style={{ display: 'flex' }}>
                        <Card
                            accepts={accepts}
                            key={i}
                            index={i}
                            id={dataKey ? card[dataKey] : card}
                            text={card}
                            moveCard={moveCard}
                            onDragEnd={dragEnd}
                            renderItem={renderItem}
                        />
                        {renderContent ? renderContent(card, i) : <></>}
                    </div>
                ))}
            </div>
        </DndProvider>
    );
};

export default DragDropList;
