import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Checkbox, Menu, Space, Modal, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { pick } from 'lodash';
import moment from 'moment';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import orderApi from '../../../api/order-api';
import { InsaTable, SaleChannelLabel } from '../../../components';
import { guest } from '../../../constants/guest';
import { getAddress } from '../../../helper';
import formatMoney from '../../../helper/format-money';
import { ICustomer } from '../../../models';
import { IOrder, ORDER_STATUS } from '../../../models/order';
import { IStoreState } from '../../../reducers/storeState/reducer';
import OrderLabelStatus from '../components/order-label-status';
import PaidLabelStatus from '../components/paid-label-status';
import { getFeeForCustomer } from '../create/ultil';
import { useOrdersContext } from './state/context';

const OrdersTable: FC = () => {
    const [widthTable, setWidthTable] = useState<number>(0);
    const [loadingRemoveOrders, setLoadingRemoveOrders] = useState<boolean>(false);
    const history = useHistory();

    const [path, setPath] = useState(history.location.search);

    const loading = useSelector(({ store }: { store: IStoreState }) => store.order.loading);
    const store = useSelector(({ store }: { store: IStoreState }) => store.data);
    const data = useSelector(({ store }: { store: IStoreState }) => store.order.data);
    const pagination = useSelector(({ store }: { store: IStoreState }) => store.order.pagination);

    const {
        progress,
        page,
        changePagination,
        limit,
        fetchDataCallback,
        search,
        source,
        serviceId,
        status,
        soft,
        deliveryDate,
    } = useOrdersContext();

    const onChangePagination = (pageNumber: number, pageSize?: number) => {
        changePagination({
            page: pageNumber,
            limit: pageSize || 20,
        });
    };

    const gotoOrder = (orderId: string) => {
        history.push(`/orders/order/${orderId}`, path);
    };

    useEffect(() => {
        if (!progress) {
            fetchDataCallback({ status, search, page, source, serviceId, deliveryDate });
        }

        const antTableHeadEle: HTMLTableHeaderCellElement | null = document?.querySelector(
            '.order-tbl .ant-table-thead'
        );
        const customerActionsWidth: number = antTableHeadEle ? antTableHeadEle.clientWidth : 0;
        setWidthTable(customerActionsWidth);
        // eslint-disable-next-line
    }, [status, search, page, source, serviceId, deliveryDate, progress]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [loading]);

    useEffect(() => {
        setPath(history.location.search);
    }, [history.location.search]);

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
            render: (customer: ICustomer) => (
                customer._id === guest._id ?
                    <span>{customer?.name}</span> :
                    <>
                        <Link to={`/customers/${customer._id}`} target="_blank">{customer?.phoneNo} </Link>- {customer?.name}
                    </>
            ),
        },
        {
            title: 'Địa chỉ',
            align: 'center',
            dataIndex: 'customer',
            width: 200,
            render: (customer) =>
                getAddress(pick(customer, ['address', 'provinceName', 'wardName', 'districtName'])),
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
            title: 'Ngày giao hàng',
            align: 'center',
            dataIndex: 'deliveredAt',
            key: 'deliveredAt',
            render: (deliveredAt) => (
                <span>{deliveredAt ? moment(deliveredAt).format('DD/MM/YYYY') : '---'}</span>
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
            title: 'Nguồn',
            align: 'center',
            dataIndex: 'source',
            key: 'source',
            render: (source) => <SaleChannelLabel channelId={source} />,
        },

        {
            title: 'Khách phải trả',
            align: 'center',
            render: (order: IOrder) => <span>{formatMoney(getFeeForCustomer(order))} VND</span>,
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    const onSelectChange = (selectedRowKeysInCurrentPage: any) => {
        let selectedRowKeysBeforeInCurrentPage: string[] = [];  
        data.forEach(order => {
            if (selectedRowKeys.includes(order._id)) {
                selectedRowKeysBeforeInCurrentPage.push(order._id);
            }
        });

        const selectedRowInOtherPage = selectedRowKeys
            .filter((key: string) => !selectedRowKeysBeforeInCurrentPage.includes(key));

        setSelectedRowKeys([...selectedRowInOtherPage, ...selectedRowKeysInCurrentPage]);
    };

    const selectAll = () => {
        const orderKeys = data.map((order: IOrder) => order._id);
        setSelectedRowKeys(orderKeys);
    };

    const removeAllSelect = () => {
        setSelectedRowKeys([]);
    };

    const removeOrderSelect = () => {
        Modal.confirm({
            title: 'Xóa Đơn Hàng?',
            content: `Bạn chắc chắn muốn xóa đơn hàng?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',

            onOk() {
                if (store._id) {
                    setLoadingRemoveOrders(true);
                    Promise.all(
                        selectedRowKeys.map(async (orderId: string) => {
                            await orderApi.removeOrder({
                                storeId: store._id as string,
                                orderId,
                            });

                            return true;
                        })
                    )
                        .then(() => {
                            message.success(`Đã xóa ${selectedRowKeys.length} đơn hàng`);
                            setSelectedRowKeys([]);

                            fetchDataCallback({
                                page,
                                limit,
                                status,
                                search,
                                source,
                                serviceId,
                                soft,
                            });
                        })
                        .catch((error) => {
                            message.error('Lỗi xóa đơn hàng');
                        })
                        .finally(() => {
                            setLoadingRemoveOrders(false);
                        });
                }
            },
        });
    };

    function handleMenuClick(e: any) {
        switch (e.key) {
            case 'remove':
                removeOrderSelect();
                break;
            case 'unselect':
                setSelectedRowKeys([]);
                break;
            default:
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">Xóa đơn hàng</Menu.Item>
            <Menu.Item key="unselect">Bỏ chọn</Menu.Item>
        </Menu>
    );

    const renderColumnTitle = () => {
        if (selectedRowKeys.length === 0) {
            return <Checkbox onClick={selectAll} />;
        }

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                    zIndex: 100,
                    width: widthTable,
                }}
            >
                <Dropdown.Button
                    overlay={menu}
                    buttonsRender={([leftButton, rightButton]) => [
                        leftButton,
                        React.cloneElement(rightButton as ReactElement, {
                            children: (
                                <>
                                    Chọn thao tác <CaretDownOutlined />
                                </>
                            ),
                            loading: loadingRemoveOrders,
                            icon: undefined,
                        }),
                    ]}
                >
                    <Space>
                        <Checkbox onClick={removeAllSelect} checked />
                        <span>Đã chọn {selectedRowKeys.length} đơn hàng</span>
                    </Space>
                </Dropdown.Button>
            </div>
        );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        columnTitle: <div style={{ width: 30 }}>{renderColumnTitle()}</div>,
    };

    return (
        <InsaTable
            loading={loading}
            rowSelection={rowSelection}
            columns={columns}
            isShowTotal
            dataSource={data}
            rowKey="_id"
            bordered
            pagination={{
                pageSize: limit,
                current: Number(page),
                total: pagination.total,
                onChange: onChangePagination,
            }}
            scroll={{ x: 1400 }}
            name="Danh sách đơn hàng"
            className="order-tbl hover"
            hasDefaultColumn={false}
            onRow={(record) => {
                return {
                    onClick: (event) => {
                        if (
                            (event.target as any).className &&
                            (event.target as any).className === 'ant-table-cell'
                        ) {
                            history.push(`/orders/order/${(record as IOrder)._id}`, path);
                        }
                    },
                };
            }}
        />
    );
};

export default OrdersTable;
