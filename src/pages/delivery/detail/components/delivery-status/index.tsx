import React, { FC } from 'react';
import { IOrder } from '../../../../../models';
import OrderLabelStatus from '../../../../order/components/order-label-status';

interface Props {
    order: IOrder;
}

const DeliveryStatus: FC<Props> = ({ order }) => {
    return <OrderLabelStatus status={order.status} />;
};

export default DeliveryStatus;
