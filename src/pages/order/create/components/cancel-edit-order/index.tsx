import { get, pick } from 'lodash';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { InsaButton } from '../../../../../components';
import { EDeliveryServiceIds } from '../../../../../models';
import { useOrderNew } from '../../state/context';
import { EShipTypes } from '../../state/interface';

interface Props {}

const CancelEditOrder: FC<Props> = () => {
    const history = useHistory();
    const { initOrderState, order } = useOrderNew();

    const cancelEditOrder = () => {
        if (order) {
            const products = (order.products || []).map((product: any) => ({
                ...product.productId,
                price: product.price,
                count: product.count,
            }));

            const infoDelivery = pick(order.customer, [
                'name',
                'phoneNo',
                'address',
                'ward',
                'wardName',
                'district',
                'districtName',
                'province',
                'provinceName',
            ]);

            const orderServiceId = get(order, 'deliveryOptions.serviceId');

            const shipType =
                orderServiceId in EDeliveryServiceIds
                    ? EShipTypes.SendShipping
                    : EShipTypes.SelfTransport;

            const shipmentFee = get(order, 'deliveryOptions.shipmentFee');
            const shipmentFeeForCustomer = get(order, 'deliveryOptions.shipmentFeeForCustomer');

            const discountBy = get(order, 'deliveryOptions.discountBy');
            const discount = get(order, 'deliveryOptions.discount');
            const noteForDelivery = get(order, 'deliveryOptions.noteForDelivery');
            const customerNote = get(order, 'deliveryOptions.customerNote');
            const source = get(order, 'source');

            const initialState = {
                products,
                customer: order.customer,
                infoDelivery,
                shipType,
                warehouseId: get(order, 'warehouseId._id'),
                shipmentFee,
                shipmentFeeForCustomer,
                discountBy,
                discount,
                noteForDelivery,
                customerNote,
                ship: undefined,
                source,
                isEdit: false,
                // paymentType: get(order, 'paymentType'), // TODO check api support
            };

            initOrderState(initialState);
            history.push(`/orders/order/${order._id}`);
        }
    };

    return (
        <InsaButton style={{ minWidth: 100 }} onClick={cancelEditOrder}>
            Hủy
        </InsaButton>
    );
};

export default CancelEditOrder;
