import React, { FC } from 'react';

import { ILocalFilter } from '../index';

import { InsaButton } from '../../../../../components';
import { Space } from 'antd';
import { ORDER_STATUS } from '../../../../../constants/order-status';

interface Props {
    filter: ILocalFilter;
    onChange?: Function;
}

const Status: FC<Props> = ({ filter, onChange }) => {
    const handleStatusChange = (status: number) => {
        onChange && onChange({ ...filter, value: status });
    };

    return (
        <Space>
            <InsaButton
                type={filter.value === ORDER_STATUS.DELIVERING ? 'primary' : 'default'}
                onClick={() => handleStatusChange(ORDER_STATUS.DELIVERING)}
            >
                Đang giao dịch
            </InsaButton>
            <InsaButton
                type={filter.value === ORDER_STATUS.RETURNED ? 'primary' : 'default'}
                onClick={() => handleStatusChange(ORDER_STATUS.RETURNED)}
            >
                Ngừng giao dịch
            </InsaButton>
        </Space>
    );
};

export default Status;
