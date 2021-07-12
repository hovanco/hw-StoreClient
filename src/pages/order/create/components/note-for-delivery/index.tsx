import { Select } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';

interface Props {}

export enum ENoteValueForDelivery {
    CHOTHUHANG = 'CHOTHUHANG',
    CHOXEMHANGKHONGTHU = 'CHOXEMHANGKHONGTHU',
    KHONGCHOXEMHANG = 'KHONGCHOXEMHANG',
}
export interface Note {
    value: ENoteValueForDelivery;
    title: string;
}

export const notes: Note[] = [
    {
        value: ENoteValueForDelivery.CHOTHUHANG,
        title: 'Cho thử hàng',
    },
    {
        value: ENoteValueForDelivery.CHOXEMHANGKHONGTHU,
        title: 'Cho xem hàng, không cho thử',
    },
    {
        value: ENoteValueForDelivery.KHONGCHOXEMHANG,
        title: 'Không cho xem hàng',
    },
];

export const getTextNote = (value?: ENoteValueForDelivery) => {
    const note = notes.find((n: Note) => n.value === value);
    if (!note) return '---';
    return note.title;
};

const NoteForDelivery = (props: Props) => {
    const { noteForDelivery, changeValueField, statusPage, order } = useOrderNew();

    if (statusPage === EStatusPage.DETAIL) {
        const text = getTextNote(get(order, 'deliveryOptions.noteForDelivery'));

        return <>{text}</>;
    }

    const changeNoteForDelivery = (value?: string) => {
        changeValueField({
            field: 'noteForDelivery',
            value,
        });
    };

    return (
        <Select
            placeholder="Chọn ghi chú vận chuyển"
            value={noteForDelivery}
            onChange={changeNoteForDelivery}
        >
            {notes.map((note: Note) => (
                <Select.Option value={note.value} key={note.value}>
                    {note.title}
                </Select.Option>
            ))}
        </Select>
    );
};

export default NoteForDelivery;
