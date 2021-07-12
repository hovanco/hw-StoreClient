import React, { FC } from 'react';
import {
    ENoteValueForDelivery,
    getTextNote,
} from '../../../../order/create/components/note-for-delivery';

interface Props {
    note: ENoteValueForDelivery;
}

const NoteForDelivery: FC<Props> = ({ note }) => {
    const text = getTextNote(note);

    return <>{text}</>;
};

export default NoteForDelivery;
