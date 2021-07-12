import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { get, isNull } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import shippingApi from '../../../../../api/shipping-api';
import { IWarehouse } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../../create/state/context';
import { useOrderDetail } from '../../state';

const BtnSendShipping = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const store = useSelector((state: IState) => state.store.data);
    const { order, updateOrder } = useOrderNew();
    const { isCancel, loadOrder, toggleUpdateSendShip } = useOrderDetail();

    useEffect(() => {
        if (order) {
            toggleUpdateSendShip(!!order.deliveryOptions.shipmentOrderId);
        }
    }, [order]);

    if (!order) return null;

    const serviceId = get(order, 'deliveryOptions.serviceId');

    if (isNull(serviceId) || typeof serviceId === 'undefined' || serviceId === 0) return null;

    if (order.status === 4) return null;

    const title = isCancel ? 'Hủy vận chuyển' : 'Gửi vận chuyển';

    const content = isCancel ? 'Hủy đơn hàng vận chuyển' : 'Gửi đơn hàng cho vận chuyển';

    const message_text = {
        success: `Đã ${isCancel ? 'hủy' : 'gửi'} cho vận chuyển`,
        error: `Lỗi  ${isCancel ? 'hủy' : 'gửi'} cho vận chuyển`,
    };

    const handleToggleOrderShip = async () => {
        // toggleUpdateSendShip(!isCancel);
        try {
            setLoading(true);
            const orderNew = await shippingApi.toggleCreateOrderShip({
                storeId: store._id as string,
                orderId: order._id,
                cancel: isCancel,
                warehouseId: (order.warehouseId as IWarehouse)._id,
            });

            message.success(message_text.success);
            toggleUpdateSendShip(!isCancel);
            updateOrder(orderNew);
            loadOrder(order._id);
        } catch (error) {
            message.error(message_text.error);
        } finally {
            setLoading(false);
        }
    };

    const sendShipping = () => {
        const totalWeight = order.products.reduce(
            (value: number, o: any) => o.productId.weight * o.count + value,
            0,
        );

        let minWeight = order.deliveryOptions.serviceId === 1 ? 10 : 1;
        let maxWeight = order.deliveryOptions.serviceId === 1 ? 20000 : 1600000;

        if (totalWeight < minWeight) {
            message.error(`Tổng khối lượng của sản phẩm chưa đạt mức tối thiểu ${minWeight}g`);
            return;
        } else if (totalWeight > maxWeight) {
            message.error(`Tổng khối lượng của sản phẩm vượt mức tối đa ${maxWeight / 1000}kg`);
            return;
        }

        Modal.confirm({
            title,
            icon: <ExclamationCircleOutlined />,
            content,
            okText: isCancel ? 'Hủy đơn vận chuyển' : 'Gửi vận chuyển',
            cancelText: 'Thoát',
            onOk: () => {
                handleToggleOrderShip();
            },
            onCancel: () => {},
        });
    };

    const disabled =
        order &&
        (!order.customer?.name ||
            !order.customer.phoneNo ||
            !order.customer.address ||
            !order.customer.province ||
            !order.customer.district ||
            !order.customer.ward ||
            order.products?.length === 0);

    return (
        <Button
            disabled={disabled}
            onClick={sendShipping}
            type='primary'
            danger={isCancel}
            loading={loading}
        >
            {title}
        </Button>
    );
};

export default BtnSendShipping;
