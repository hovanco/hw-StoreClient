import { Col, Input, Row, Select, Space, Typography } from 'antd';
import React, { FC, memo, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { InsaButton, InsaTable, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import iconPlus from '../../../assets/images/ic-plus.svg';
import iconHelp from '../../../assets/images/ic-help.svg';
import theme from '../../../theme';
import iconSettingSub from '../../../assets/images/ic-setting-secondary.svg';
import { ColumnType } from 'antd/lib/table';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../../reducers/storeState/reducer';
import { storeAction } from '../../../reducers/storeState/action';
import { debounce, isNil } from 'lodash';
import iconDownload from '../../../assets/images/ic-download.svg';
import iconUpload from '../../../assets/images/ic-upload.svg';
import * as queryString from 'query-string';
import './style.less';

const WarehousingApplicationList: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data: storeObj, product } = useSelector(({ store }: { store: IStoreState }) => store);
    const { data: productList, loading, pagination } = product;
    const [page, setPage] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const filterState: {
        categoryId?: string;
        search?: string;
    } = queryString.parse(history.location.search);

    const columns: ColumnType<any>[] = [
        {
            title: 'Mã đơn',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, record: any) => <Typography.Link>DN0215455</Typography.Link>,
        },
        {
            title: 'Tên nhà cung cấp',
            className: 'column-money',
            dataIndex: 'supplierName',
            key: 'supplierName',
            align: 'center',
            render: () => 'Kho áo sĩ Mỹ Đình 2',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text: string) => 'Hoàn thành',
        },
        {
            title: 'Nhập kho',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            align: 'center',
            render: (text: string) => 'Đã nhập kho',
        },
        {
            title: 'Thanh toán',
            dataIndex: 'orderCount',
            key: 'orderCount',
            align: 'center',
            render: () => 'Đã thanh toán',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'wholesalePrice',
            key: 'wholesalePrice',
            align: 'center',
            render: () => '10.000.000',
        },
        {
            title: 'Ngày hẹn giao',
            dataIndex: 'trading',
            key: 'trading',
            align: 'center',
            render: () => '20/10/2020',
        },
        {
            title: 'Nhân viên tạo',
            dataIndex: 'staff',
            key: 'staff',
            align: 'center',
            render: () => 'Trần Anh',
        },
    ];

    const onChangPagination = (page: number) => {
        setPage(page);
    };
    const onSelectChange = (models: any) => {
        setSelectedRowKeys(models);
    };

    const fetchData = (currentFilterState?: { categoryId?: string; search?: string }) => {
        const _filterState = isNil(currentFilterState) ? filterState : currentFilterState;
        if (storeObj._id) {
            dispatch(
                storeAction.getProduct({
                    id: storeObj._id,
                    limit: 20,
                    page: page,
                    categoryId: _filterState.categoryId as string,
                    search: _filterState.search as string,
                })
            );
        }
    };
    const fetchDataDebounce = debounce(fetchData, 500);

    useEffect(() => {
        if (storeObj._id) {
            fetchDataDebounce();
            dispatch(storeAction.getCategoriesByStore(storeObj._id));
        }
        // eslint-disable-next-line
    }, [storeObj._id, page]);

    useEffect(() => {
        dispatch(storeAction.getStore());
    }, [dispatch]);

    return (
        <DefaultLayout title="ĐƠN NHẬP KHO">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>ĐƠN NHẬP KHO</Typography.Title>}
                rightContent={
                    <Space>
                        <Link to="/inventory/new">
                            <InsaButton
                                type="primary"
                                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                            >
                                Nhập hàng
                            </InsaButton>
                        </Link>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton
                            // shape="circle"
                            icon={<img style={{ marginRight: 10 }} src={iconHelp} alt="icon" />}
                        >
                            Trợ giúp
                        </InsaButton> */}
                    </Space>
                }
            />

            <Row
                justify="space-between"
                align="middle"
                style={{
                    height: 74,
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                }}
            >
                <Col span={12}>
                    <Space size="middle">
                        <Input.Search
                            key="search"
                            placeholder="Tìm kiếm sản phẩm"
                            onChange={
                                (e) => {}
                                // handleSearch(e.target.value)
                            }
                            onSearch={() => {}}
                            style={{ width: 330 }}
                            // value={filterState.search || ''}
                        />
                        <Select placeholder="Lọc đơn"></Select>
                    </Space>
                </Col>
                <Col span={12}>
                    <Row justify="end">
                        <Space size="middle">
                            <Select
                                style={{ minWidth: 200 }}
                                value={'root'}
                                onChange={(value) => {}}
                            >
                                <Select.Option value="root">Thao tác khác</Select.Option>
                                <Select.Option value="1">Kiểm tra tồn kho</Select.Option>
                                <Select.Option value="2">In mã vạch</Select.Option>
                                <Select.Option value="3">Áp dụng thuế</Select.Option>
                                <Select.Option value="4">Xóa phiên bản</Select.Option>
                            </Select>
                            <InsaButton
                                icon={
                                    <img
                                        style={{ marginRight: 10 }}
                                        src={iconSettingSub}
                                        alt="icon"
                                    />
                                }
                            >
                                <Typography.Text type="secondary">
                                    Điều chỉnh cột hiển thị
                                </Typography.Text>
                            </InsaButton>
                            <InsaButton
                                icon={
                                    <img
                                        style={{ marginRight: 10 }}
                                        src={iconDownload}
                                        alt="icon"
                                    />
                                }
                            >
                                <Typography.Text type="secondary">Nhập file</Typography.Text>
                            </InsaButton>
                            <InsaButton
                                icon={
                                    <img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />
                                }
                            >
                                <Typography.Text type="secondary">Xuất file</Typography.Text>
                            </InsaButton>
                        </Space>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                }}
            >
                <Col span={24}>
                    <InsaTable
                        loading={loading}
                        columns={columns}
                        dataSource={productList.map((e) => ({
                            ...e,
                            key: e._id,
                        }))}
                        pagination={{
                            pageSize: pagination.limit,
                            current: page,
                            total: pagination.total,
                            onChange: onChangPagination,
                        }}
                        bordered
                        hasDefaultColumn={false}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: onSelectChange,
                        }}
                        name="Danh sách phiên bản sản phẩm"
                        className="inventory-tbl"
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default memo(WarehousingApplicationList);
