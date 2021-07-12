import React, { FC } from 'react';
import { IOrder } from '../../../../../models';
import OrderLabelStatus from '../../../components/order-label-status';

interface Props {
    order: IOrder;
}

const StatusPaymentOrder: FC<Props> = ({ order }) => {
    return (
        <div className="order-detail-status">
            <div className="title">Trạng thái vận chuyển</div>
            <OrderLabelStatus status={order.status} />
        </div>
    );
};

export default StatusPaymentOrder;
