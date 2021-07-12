import { Checkbox, message, Modal } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { pick } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InsaTable, SaleChannelLabel } from '../../../../../components';
import orderApi from '../../../../../api/order-api';
import { getAddress } from '../../../../../helper';
import { IOrder } from '../../../../../models';
import { IStoreState } from '../../../../../reducers/storeState/reducer';
import { IState } from '../../../../../store/rootReducer';
import OrderLabelStatus from '../../../../order/components/order-label-status';
import { useOrdersContext } from '../../../../order/list/state/context';
import ShipService from '../ship-service';
import DeliveriesAction from './deliveries-action';

import './deliveries-table.less';

interface Props {}

const DeliveriesTable: FC<Props> = () => {
    const [widthTable, setWidthTable] = useState<number>(0);
    const [loadingRemoveOrders, setLoadingRemoveOrders] = useState<boolean>(false);
    const history = useHistory();

    const isCollapsed = useSelector((state: IState) => state.global.isCollapsed);
    const store = useSelector(({ store }: { store: IStoreState }) => store.data);
    const loading = useSelector(({ store }: { store: IStoreState }) => store.order.loading);
    const orders = useSelector(({ store }: { store: IStoreState }) => store.order.data);
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
    const pagination = useSelector(({ store }: { store: IStoreState }) => store.order.pagination);

    const onChangePagination = (pageNumber: number, pageSize?: number) => {
        changePagination({
            page: pageNumber,
            limit: pageSize || 20,
        });
    };

    const handleRowClick = (record: IOrder) => {
        history.push(`/delivery/detail/${record._id}`);
    };

    const columns: ColumnType<IOrder>[] = [
        {
            title: 'Ngày đóng gói',
            align: 'center',
            dataIndex: 'createdAt',
            render: (text: string) => <span>{moment(text).format('DD/MM/YYYY')}</span>,
        },
        {
            title: 'Mã đơn hàng',
            align: 'center',
            dataIndex: 'code',
            key: 'code',
            render: (code: string) => <span className="blue-text">{code}</span>,
        },
        {
            title: 'Tên người nhận',
            align: 'center',
            dataIndex: 'customer',
            key: 'name',
            render: (customer) => <span>{customer?.name}</span>,
        },
        {
            title: 'Địa chỉ người nhận',
            align: 'center',
            dataIndex: 'customer',
            key: 'address',
            render: (customer) => {
                if (!customer.provinceName) return '---';
                return getAddress({
                    ...pick(customer, ['address', 'wardName', 'districtName', 'provinceName']),
                });
            },
        },
        {
            title: 'SĐT người nhận',
            align: 'center',
            dataIndex: 'customer',
            key: 'phoneNo',
            render: (customer) => <span>{customer?.phoneNo}</span>,
        },
        {
            title: 'Đơn vị giao hàng',
            align: 'center',
            dataIndex: 'deliveryOptions',
            render: (deliveryOptions) => <ShipService deliveryOptions={deliveryOptions} />,
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
            title: 'Nguồn',
            align: 'center',
            dataIndex: 'source',
            key: 'source',
            render: (source) => <SaleChannelLabel channelId={source} />,
        },
        {
            title: 'Trạng Thái',
            align: 'center',
            dataIndex: 'status',
            render: (status) => {
                return <OrderLabelStatus status={status} />;
            },
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    const onSelectChange = (selectedRowKeysInCurrentPage: any) => {
        let selectedRowKeysBeforeInCurrentPage: string[] = [];

        orders.forEach((order) => {
            if (selectedRowKeys.includes(order._id)) {
                selectedRowKeysBeforeInCurrentPage.push(order._id);
            }
        });

        const selectedRowInOtherPage = selectedRowKeys.filter(
            (key: string) => !selectedRowKeysBeforeInCurrentPage.includes(key)
        );

        setSelectedRowKeys([...selectedRowInOtherPage, ...selectedRowKeysInCurrentPage]);
    };

    const selectAll = () => {
        const orderKeys = orders.map((order: IOrder) => order._id);
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

    const renderColumnTitle = () => {
        if (selectedRowKeys.length === 0) {
            return <Checkbox onClick={selectAll} />;
        }

        return (
            <DeliveriesAction
                widthTable={widthTable}
                loadingRemoveOrders={loadingRemoveOrders}
                selectedRowKeys={selectedRowKeys}
                handleMenuClick={handleMenuClick}
                removeAllSelect={removeAllSelect}
            />
        );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        columnTitle: <div style={{ width: 30 }}>{renderColumnTitle()}</div>,
    };

    useEffect(() => {
        if (!progress) {
            fetchDataCallback({ status, search, page, source, serviceId, deliveryDate });
        }
    }, [status, search, page, source, serviceId, deliveryDate, progress]);

    useEffect(() => {
        const antTableHeadEle: HTMLTableHeaderCellElement | null = document?.querySelector(
            '.order-tbl .ant-table-thead'
        );
        let orderActionsWidth: number = antTableHeadEle ? antTableHeadEle.clientWidth : 0;

        setWidthTable(orderActionsWidth);
    }, [selectedRowKeys]);

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            setWidthTable(isCollapsed ? widthTable + 120 : widthTable - 120);
        }
    }, [isCollapsed]);

    return (
        <InsaTable
            loading={loading}
            rowSelection={rowSelection}
            columns={columns}
            isShowTotal
            scroll={{ x: 1200 }}
            dataSource={orders.map((e) => ({
                ...e,
                key: e._id,
            }))}
            bordered
            pagination={{
                pageSize: limit,
                current: Number(page),
                total: pagination.total,
                onChange: onChangePagination,
            }}
            onRow={(record, rownIndex) => {
                return {
                    onClick: (event) => {
                        handleRowClick(record);
                    },
                };
            }}
            name="Danh sách đơn hàng"
            className="order-tbl hover"
            hasDefaultColumn={false}
        />
    );
};

export default DeliveriesTable;
