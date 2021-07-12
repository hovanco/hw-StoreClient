import { CaretDownOutlined } from '@ant-design/icons';
import { Checkbox, Col, Dropdown, Menu, message, Modal, Row, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../api/order-api';
import { InsaTable, PageTopWrapper } from '../../../components';
import constants from '../../../constants';
import formatMoney from '../../../helper/format-money';
import { DefaultLayout } from '../../../layout';
import { IOrder, ORDER_STATUS } from '../../../models';
import { IState } from '../../../store/rootReducer';
import theme from '../../../theme';

const columns: ColumnsType<IOrder> = [
    {
        title: 'Mã đơn hàng',
        align: 'center',
        dataIndex: 'code',
        render: (code: string) => <span className="blue-text">{code}</span>,
    },
    {
        title: 'Khách hàng',
        align: 'center',
        render: (order) => (
            <>
                <span className="blue-text">{order.customer?.phoneNo} </span>
                {order.customer?.name} {order.customer?.address}
            </>
        ),
    },
    {
        title: 'Ngày tạo đơn',
        align: 'center',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => (
            <>
                {moment(text).format('HH:mm')} {moment(text).format('DD/MM/YYYY')}
            </>
        ),
    },
    {
        title: 'Kho hàng',
        align: 'center',
        dataIndex: 'warehouseId',
        key: 'warehouseId',
        render: (warehouseId) => warehouseId.name,
    },

    {
        title: 'Người tạo',
        align: 'center',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (createdBy) => (
            <Space size={5}>
                <Avatar src={`${constants.URL_IMG}${createdBy.picture}`} />
                {createdBy.name}
            </Space>
        ),
    },

    {
        title: 'Tổng tiền',
        align: 'center',
        dataIndex: 'totalPrice',
        render: (totalPrice) => <span>{formatMoney(totalPrice)} VND</span>,
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

            return <span>{text}</span>;
        },
    },
];

interface IOrderReturn {
    data: IOrder[];
    total: number;
}

const PAGE_NUMBER_DEFAULT = 1;
const LIMIT_NUMBER_DEFAULT = 15;

const useOrdersReturn = () => {
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(PAGE_NUMBER_DEFAULT);
    const [limit, setLImit] = useState<number>(LIMIT_NUMBER_DEFAULT);

    const [orders, setOrders] = useState<IOrderReturn>({
        data: [],
        total: 0,
    });

    const onChangePagination = (pageNumber: number, pageSize?: number) => {
        setPage(pageNumber);
        setLImit(pageSize || LIMIT_NUMBER_DEFAULT);
    };

    const loadOrderReturn = useCallback(
        async (arg) => {
            try {
                const response = await orderApi.getOrder({
                    id: store._id as string,
                    status: ORDER_STATUS.CANCELED,
                    page,
                    limit,
                });

                setOrders(response);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        },
        [limit, page, store._id]
    );

    useEffect(() => {
        loadOrderReturn({
            page,
            limit,
            storeId: store._id,
        });
    }, [page, limit, store._id, loadOrderReturn]);

    return {
        ...orders,
        loading,
        page,
        limit,
        loadOrderReturn,
        onChangePagination,
    };
};

const OrderReturnPage: FC = () => {
    const store = useSelector((state: IState) => state.store.data);
    const {
        loading,
        data,
        total,
        page,
        limit,
        loadOrderReturn,
        onChangePagination,
    } = useOrdersReturn();

    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [widthTable, setWidthTable] = useState<number>(0);
    const [loadingRemoveOrders, setLoadingRemoveOrders] = useState<boolean>(false);

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
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

                            loadOrderReturn({ page, limit });
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

    const handleMenuClick = (e: any) => {
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
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">Xóa đơn hàng</Menu.Item>
            <Menu.Item key="unselect">Bỏ chọn</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        const antTableHeadEle: HTMLTableHeaderCellElement | null = document?.querySelector(
            '.order-tbl .ant-table-thead'
        );
        const customerActionsWidth: number = antTableHeadEle ? antTableHeadEle.clientWidth : 0;
        setWidthTable(customerActionsWidth);
        // eslint-disable-next-line
    }, []);

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
                    zIndex: 100,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
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
        columnTitle: <div style={{ width: 45 }}>{renderColumnTitle()}</div>,
    };

    return (
        <DefaultLayout title="Orders">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>KHÁCH TRẢ HÀNG</Typography.Title>}
            />
            {/* TODO: Show after add feature */}
            {/* <Row justify="end" align="middle" style={{ height: 74, paddingRight: theme.spacing.m }}>
                <Space>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconDownload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Nhập file</Typography.Text>
                    </InsaButton>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Xuất file</Typography.Text>
                    </InsaButton>
                </Space>
            </Row> */}

            <Row
                style={{
                    padding: theme.spacing.m,
                }}
            >
                <Col span={24}>
                    <InsaTable
                        rowSelection={rowSelection}
                        rowKey="_id"
                        columns={columns}
                        dataSource={data}
                        bordered
                        name="Danh sách đơn hàng"
                        className="order-tbl"
                        hasDefaultColumn={false}
                        loading={loading}
                        pagination={{
                            pageSize: limit,
                            current: page,
                            total,
                            onChange: onChangePagination,
                        }}
                        onRow={(record) => {
                            return {
                                onClick: (event) => {
                                    if (selectedRowKeys.includes(record._id)) {
                                        const newSelectedRowKeys = selectedRowKeys.filter(
                                            (key) => key !== record._id
                                        );
                                        setSelectedRowKeys(newSelectedRowKeys);
                                    } else {
                                        setSelectedRowKeys([...selectedRowKeys, record._id]);
                                    }
                                },
                            };
                        }}
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default OrderReturnPage;
