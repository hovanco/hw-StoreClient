import { message, Select } from 'antd';
import { get } from 'lodash';
import React, { FC, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/order-api';
import { IOrder, ORDER_STATUS } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import { statusSelfTransport, statusServiceTransport } from '../../constants';
interface Props {
    order: IOrder;
    updateOrder: Function;
}

const TransportStatus: FC<Props> = ({ order, updateOrder }) => {
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(false);

    const serviceId = get(order, 'deliveryOptions.serviceId');
    const transportStatus = get(order, 'deliveryOptions.transportStatus');

    const changeStatusTranspost = async (value: any) => {
        if (!serviceId) {
            setLoading(true);
            try {
                const response = await orderApi.updateOrder({
                    storeId: store._id as string,
                    orderId: order._id,
                    data: {
                        status: Number(value),
                    },
                });
                message.success('Cập nhật trạng thái vận chuyển thành công');
                updateOrder(response);
            } catch (error) {
                message.error('Đã xảy ra lỗi, vui lòng thử lại');
            } finally {
                setLoading(false);
            }
        }
    };

    const options = !!serviceId ? statusServiceTransport : statusSelfTransport;
    const value = !!serviceId ? transportStatus || 'root' : order.status || 0;

    return (
        <Select
            style={{ width: '100%' }}
            value={value}
            loading={loading}
            disabled={!!serviceId}
            onChange={changeStatusTranspost}
        >
            {!!serviceId && (
                <Select.Option value="root" disabled>
                    Chưa giao hàng
                </Select.Option>
            )}

            {options.map((item) => {
                const disabled =
                    !serviceId &&
                    !!order.paidAt &&
                    [ORDER_STATUS.CANCELED, ORDER_STATUS.RETURNED].includes(
                        item.value as ORDER_STATUS
                    );

                return (
                    <Select.Option value={item.value} key={item.value} disabled={disabled}>
                        {item.label}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export default memo(TransportStatus);
