import { Tag } from 'antd';
import React, { FC } from 'react';

interface Props {
    paidAt?: string;
}

const PaidLabelStatus: FC<Props> = ({ paidAt }) => {
    return (
        <Tag color={paidAt ? '#307dd2' : '#7ca1bb'}>
            {paidAt ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Tag>
    );
};

export default PaidLabelStatus;
