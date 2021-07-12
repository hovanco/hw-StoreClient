import { Tag } from 'antd';
import React, { FC } from 'react';
import { ORDER_STATUS } from '../../../../models/order';

export const getOrderStatusName = (value: ORDER_STATUS) => {
    switch (value) {
        case ORDER_STATUS.NEW:
            return 'Mới';
        case ORDER_STATUS.CONFIRMED:
            return 'Đã xác nhận';
        case ORDER_STATUS.WAIT_FOR_DELIVERY:
            return 'Chờ lấy hàng';
        case ORDER_STATUS.DELIVERING:
            return 'Đang giao hàng';
        case ORDER_STATUS.CANCELED:
            return 'Đang hoàn trả';
        case ORDER_STATUS.DELIVERED:
            return 'Đã giao hàng';
        case ORDER_STATUS.RETURNED:
            return 'Đã hoàn trả';
        default:
            return '';
    }
};
export const getOrderStatusColor = (value: ORDER_STATUS) => {
    switch (value) {
        case ORDER_STATUS.NEW:
            return '#7ca1bb';
        case ORDER_STATUS.CONFIRMED:
            return '#6c6fbf';
        case ORDER_STATUS.WAIT_FOR_DELIVERY:
            return '#ffcd07';
        case ORDER_STATUS.DELIVERING:
            return '#23ad44';
        case ORDER_STATUS.CANCELED:
            return '#f05050';
        case ORDER_STATUS.DELIVERED:
            return '#307dd2';
        case ORDER_STATUS.RETURNED:
            return '#87d068';
        default:
            return '';
    }
};

interface Props {
    status: ORDER_STATUS;
}

const OrderLabelStatus: FC<Props> = ({ status }) => (
    <Tag color={getOrderStatusColor(status)}>{getOrderStatusName(status)}</Tag>
);

export default OrderLabelStatus;
