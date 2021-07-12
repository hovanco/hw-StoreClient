import { get } from 'lodash';
import React, { FC, memo } from 'react';
import { IOrder, ORDER_STATUS, SaleChannelId } from '../../../../models';
import { statusSelfTransport, statusServiceTransport } from '../../constants';
interface Props {
    order: IOrder;
}

const getOrderStatusLabel = (orderStatus: ORDER_STATUS): string => {
    const status = statusSelfTransport.find((item) => item.value === orderStatus);

    if (!status) {
        return statusSelfTransport[0].label;
    }

    return status.label;
};

const TransportStatus: FC<Props> = ({ order }) => {
    const labelTitle = () => {
        const serviceId = get(order, 'deliveryOptions.serviceId');

        if (order.source === SaleChannelId.POS && !serviceId) {
            return order.status === ORDER_STATUS.DELIVERED ? 'Đã giao hàng' : 'Đang giao hàng';
        }

        if (!serviceId) {
            if (order.source === SaleChannelId.POS) {
                return order.status === ORDER_STATUS.DELIVERED ? 'Đã giao hàng' : 'Đang giao hàng';
            }

            return getOrderStatusLabel(order.status);
        }

        const transportStatus = get(order, 'deliveryOptions.transportStatus');
        const shipmentOrderId = get(order, 'deliveryOptions.shipmentOrderId');

        if (!transportStatus) {
            if (shipmentOrderId) {
                return getOrderStatusLabel(order.status);
            }

            return 'Chưa giao hàng';
        }

        const status = statusServiceTransport.find((item) => item.value === transportStatus);

        if (!status) {
            return 'Chưa giao hàng';
        }

        return status.label;
    };

    return <>{labelTitle()}</>;
};

export default memo(TransportStatus);
