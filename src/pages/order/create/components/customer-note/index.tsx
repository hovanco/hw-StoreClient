import { Input } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';

const CustomerNote = () => {
    const { customerNote, changeValueField, order, statusPage } = useOrderNew();

    if (statusPage === EStatusPage.DETAIL) {
        const text = get(order, 'deliveryOptions.customerNote') || '---';
        return <>{text}</>;
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeValueField({
            field: 'customerNote',
            value: e.target.value,
        });
    };
    return (
        <Input.TextArea
            placeholder="Nhập ghi chú của khách"
            value={customerNote}
            rows={3}
            onChange={onChange}
        />
    );
};

export default CustomerNote;
