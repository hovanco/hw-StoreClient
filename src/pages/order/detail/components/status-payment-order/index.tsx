import React, { FC } from 'react';
import { IOrder } from '../../../../../models';
import PaidLabelStatus from '../../../components/paid-label-status';

interface Props {
    order: IOrder;
}

const StatusPaymentOrder: FC<Props> = ({ order }) => {
    return (
        <div className="order-detail-status">
            <div className="title">Trạng thái thanh toán</div>
            <PaidLabelStatus paidAt={order.paidAt} />
        </div>
    );
};

export default StatusPaymentOrder;
