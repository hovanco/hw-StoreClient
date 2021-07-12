import { Button, message, Modal } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../../api/order-api';
import { IOrder, ORDER_STATUS } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderDetail } from '../../state';

interface Props {
    order: IOrder;
}

const BtnConfirmFinish: FC<Props> = ({ order }) => {
    const { loadOrder } = useOrderDetail();
    const store = useSelector((state: IState) => state.store.data);

    const finishOrder = async () => {
        Modal.confirm({
            title: 'Hoàn thành đơn hàng',
            content: 'Xác nhận hoàn thành đơn hàng',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: () =>
                new Promise<void>(async (resolve, reject) => {
                    try {
                        const orderResponse = await orderApi.updateOrder({
                            storeId: store._id as string,
                            orderId: (order as IOrder)._id,
                            data: {
                                status: ORDER_STATUS.DELIVERED,
                            },
                        });

                        loadOrder(orderResponse._id);
                        message.success('Đơn hàng đã hoàn thành');
                        return resolve();
                    } catch (error) {
                        message.error('Đã xảy ra lỗi, vui lòng thử lại');
                        return reject();
                    }
                }),

            onCancel: () => {},
        });
    };

    const disabled = order.status === ORDER_STATUS.DELIVERED;

    return (
        <Button type="primary" onClick={finishOrder} disabled={disabled}>
            Hoàn thành đơn hàng
        </Button>
    );
};

export default BtnConfirmFinish;
