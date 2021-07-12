import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import orderApi from '../../../../../api/order-api';
import { InsaTable } from '../../../../../components';
import formatMoney from '../../../../../helper/format-money';
import { ICustomer, IOrder, ORDER_STATUS } from '../../../../../models';
import { IStoreState } from '../../../../../reducers/storeState/reducer';
import OrderLabelStatus from '../../../../order/components/order-label-status';
import PaidLabelStatus from '../../../../order/components/paid-label-status';
import { getFeeForCustomer } from '../../../../order/create/ultil';

interface Props {
    status: number;
    times: any[];
}

const LIMIT = 20;

const TableDeliveryList: FC<Props> = ({ status, times }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    const history = useHistory();

    const store = useSelector(({ store }: { store: IStoreState }) => store.data);

    const onChangePagination = (pageNumber: number, pageSize?: number) => {
        setPage(pageNumber);
        fetchData(pageNumber);
    };

    const gotoOrder = (orderId: string) => {
        history.push(`/orders/order/${orderId}`);
    };

    const fetchData = async (pageNumber?: number) => {
        try {
            setLoading(true);
            const res = await orderApi.getOrder({
                id: store._id as string,
                limit: LIMIT,
                page: pageNumber || page,
                status,
                startTime: times[0],
                endTime: times[1],
            });

            setData(res.data || []);
            setTotal(res.total || 0);
            
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setData([]);
        setTotal(0);
        fetchData(1);
        // eslint-disable-next-line
    }, [status]);

    const columns: ColumnsType<IOrder> = [
        {
            title: 'Mã đơn hàng',
            align: 'center',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, order) => (
                <span className="blue-text" onClick={() => gotoOrder(order._id)}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Khách hàng',
            align: 'center',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: ICustomer, order) => (
                <span onClick={() => gotoOrder(order._id)}>
                    <span className="blue-text">{customer?.phoneNo} </span>
                    {customer?.name} {customer?.address}
                </span>
            ),
        },
        {
            title: 'Trạng thái đơn hàng',
            align: 'center',
            dataIndex: 'status',
            key: 'status',
            render: (status: ORDER_STATUS, order) => (
                <span onClick={() => gotoOrder(order._id)}>
                    <OrderLabelStatus status={status} />
                </span>
            ),
        },
        {
            title: 'Trạng thái thanh toán',
            align: 'center',
            dataIndex: 'paidAt',
            key: 'paidAt',
            render: (paidAt: string) => <PaidLabelStatus paidAt={paidAt} />,
        },
        {
            title: 'Ngày tạo đơn',
            align: 'center',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string, order) => (
                <span onClick={() => gotoOrder(order._id)}>
                    {moment(text).format('HH:mm')} {moment(text).format('DD/MM/YYYY')}
                </span>
            ),
        },
        {
            title: 'Ghi chú',
            align: 'center',
            dataIndex: '',
            key: 'note',
            render: (order: IOrder) => {
                const text =
                    order.note && order.note.length > 0
                        ? order.note
                        : order.deliveryOptions && order.deliveryOptions.customerNote
                        ? order.deliveryOptions.customerNote
                        : '---';

                return <span onClick={() => gotoOrder(order._id)}>{text}</span>;
            },
        },

        {
            title: 'Khách phải trả',
            align: 'center',
            render: (order: IOrder) => (
                <span onClick={() => gotoOrder(order._id)}>{formatMoney(getFeeForCustomer(order))} VND</span>
            ),
        },
    ];

    return (
        <InsaTable
            loading={loading}
            columns={columns}
            isShowTotal
            dataSource={data}
            rowKey="_id"
            bordered
            pagination={{
                pageSize: LIMIT,
                current: page,
                total: total,
                onChange: onChangePagination,
            }}
            hasDefaultColumn={false}
        />
    );
};

export default TableDeliveryList;
