import React, { FC } from 'react';

import formatMoney from '../../../helper/format-money';
import { IEditRow } from './table';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';

interface Props {
    text: string;
    editingRow?: IEditRow;
    record: any;
}

const InventoryQuantity: FC<Props> = ({ text, editingRow, record }) => {
    if (editingRow?._id !== record._id || editingRow?.editValue === 0) return <>{text}</>;

    return (
        <Space>
            <span>{formatMoney(text)}</span>
            <ArrowRightOutlined />
            <Typography.Text type={editingRow && editingRow.editValue > 0 ? 'success' : 'danger'}>
                {formatMoney(record.quantity + (editingRow?.editValue || 0))}
            </Typography.Text>
        </Space>
    );
};

export default InventoryQuantity;
