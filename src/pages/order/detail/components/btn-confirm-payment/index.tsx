import { Button, message, Modal } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../../api/order-api';
import { EPaymentType, IOrder, ORDER_STATUS, SaleChannelId } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../../create/state/context';
import { useOrderDetail } from '../../state';

const { confirmPaymentOrder } = orderApi;

interface Props {}

const BtnConfirmPayment: FC<Props> = () => {
    const store = useSelector((state: IState) => state.store.data);
    const { order } = useOrderNew();
    const { loadOrder } = useOrderDetail();

    if (order?.paidAt && order.paymentType === EPaymentType.PayCOD) return null;

    const confirmPayment = () => {
        Modal.confirm({
            title: 'Xác nhận thanh toán',
            content: 'Xác nhận đơn hàng đã thanh toán',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: () =>
                new Promise((resolve, reject) => {
                    confirmPaymentOrder({
                        storeId: store._id as string,
                        orderId: (order as IOrder)._id,
                    })
                        .then(() => {
                            loadOrder((order as IOrder)._id);
                            message.success('Đơn hàng đã thanh toán');
                            return resolve('success');
                        })
                        .catch(() => {
                            message.error('Đã có lỗi xảy ra, vui lòng thử lại');
                            return reject();
                        });
                }),
            onCancel: () => {},
        });
    };

    const disabled =
        order?.source !== SaleChannelId.POS &&
        (!!order?.paidAt ||
            order?.paymentType === EPaymentType.PayCOD ||
            order?.status === ORDER_STATUS.CANCELED);

    return (
        order?.paymentType !== EPaymentType.PayCOD ?
            <Button onClick={confirmPayment} disabled={disabled}>
                Xác nhận thanh toán
            </Button> :
            <></>
    );
};

export default BtnConfirmPayment;
