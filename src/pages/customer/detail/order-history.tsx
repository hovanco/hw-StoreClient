import React, { useState, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { IState } from '../../../store/rootReducer';
import { IOrder, ICustomer, EPaymentType, EPaymentTypeName, ORDER_STATUS } from '../../../models';
import formatMoney from '../../../helper/format-money';
import { compact } from 'lodash';
import { storeAction } from '../../../reducers/storeState/action';
import { ICustomerDetailParams } from './index';

import { Col, Row } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { DefaultLayout } from '../../../layout';
import { InsaTable, Loading } from '../../../components';
import OrderLabelStatus from '../../order/components/order-label-status';
import { getFeeForCustomer } from '../../order/create/ultil';

import './style.less';
import { IStoreState } from '../../../reducers/storeState/reducer';

const LIMIT = 20;

const OrderHistory: FC = () => {
    const orders = useSelector((state: IState) => state.store.order);
    const storeObj = useSelector((state: IState) => state.store.data);

    const [page, setPage] = useState<number>(1);
    const loading = useSelector(({ store }: { store: IStoreState }) => store.order.loading);

    const dispatch = useDispatch();
    const params = useParams<ICustomerDetailParams>();

    useEffect(() => {
        if (storeObj._id)
            dispatch(
                storeAction.getOrders({
                    id: storeObj._id,
                    customerId: params.customerId,
                    page: page,
                    limit: LIMIT,
                })
            );
        // eslint-disable-next-line
    }, [storeObj._id, page]);

    if (loading) return <Loading />;

    const columns: ColumnType<any>[] = [
        {
            title: 'Mã đơn hàng',
            align: 'center',
            render: (order: IOrder) =>
                <Link to={`/orders/order/${order._id}`} target="_blank">{order.code}</Link>,
        },
        {
            title: 'Trạng thái',
            align: 'center',
            dataIndex: 'status',
            key: 'status',
            render: (status: ORDER_STATUS) => <span><OrderLabelStatus status={status} /></span>,
        },
        {
            title: 'Tên khách hàng',
            align: 'center',
            key: 'customer_name',
            dataIndex: ['customer', 'name'],
        },
        {
            title: 'Số điện thoại',
            align: 'center',
            key: 'customer_phoneNo',
            dataIndex: ['customer', 'phoneNo'],
        },
        {
            title: 'Địa chỉ',
            align: 'center',
            key: 'customer_address',
            dataIndex: ['customer', 'address'],
            render: (text: string, record: IOrder) => <div>{getCustomerAddress(record)}</div>,
        },
        {
            title: 'Hình thức thanh toán',
            align: 'center',
            key: 'paymentType',
            dataIndex: 'paymentType',
            render: (paymentType: EPaymentType) => <span>{EPaymentTypeName[paymentType]}</span>,
        },
        {
            title: 'Tổng tiền',
            align: 'center',
            render: (order: IOrder) => <span>{formatMoney(getFeeForCustomer(order))} VND</span>,
        },
    ];

    const getCustomerAddress = (order: IOrder) => {
        const { address, districtName, wardName, provinceName } = order.customer as ICustomer;
        return compact([address, wardName, districtName, provinceName]).join(', ');
    };

    const onChangPagination = (page: number) => {
        setPage(page);
    };

    return (
        <DefaultLayout title="Customer">
            <Row>
                <Col span={24}>
                    <InsaTable
                        loading={false}
                        columns={columns}
                        dataSource={orders.data}
                        isShowTotal
                        bordered
                        rowKey="_id"
                        pagination={{
                            pageSize: LIMIT,
                            current: page,
                            total: orders.pagination.total,
                            onChange: onChangPagination,
                            showSizeChanger: false,
                        }}
                        name=""
                        className="order-tbl"
                        hasDefaultColumn={false}
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default OrderHistory;
