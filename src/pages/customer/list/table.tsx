import { Checkbox, Col, Row, Space } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';
import { compact } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { InsaTable, SaleChannelLabel } from '../../../components';
import { ICustomer } from '../../../models';
import { IStoreState } from '../../../reducers/storeState/reducer';
import { IState } from '../../../store/rootReducer';
import AdvanceFilter from './advance-filter';
import { useCustomerTable } from './context';
import InputSearch from './input-search';
import ListFiltered from './list-filtered';
import SourceFilter from './source-filter';
import TableAction from './table-action';
import './table.less';

const CustomerTable: FC = () => {
    const history = useHistory();
    const customers = useSelector(({ store }: { store: IStoreState }) => store.customers);
    const isCollapsed = useSelector((state: IState) => state.global.isCollapsed);
    const { data: dataSource, loading, pagination: storePagination } = customers;
    const { pagination, changePagination } = useCustomerTable();
    const { page, limit } = pagination;
    const [path, setPatth] = useState(history.location.search);

    useEffect(() => {
        setPatth(history.location.search);
    }, [history.location.search]);

    const columns: ColumnType<ICustomer>[] = [
        {
            title: 'Mã khách hàng',
            align: 'center',
            render: (record: any) => <span style={{ color: "#0199fc" }}>{record.code}</span>,
        },
        {
            title: 'Họ tên',
            align: 'center',
            dataIndex: 'name',
        },
        {
            title: 'Số điện thoại',
            align: 'center',
            dataIndex: 'phoneNo',
        },
        {
            title: 'Email',
            align: 'center',
            dataIndex: 'email',
        },
        {
            title: 'Ngày sinh',
            align: 'center',
            dataIndex: 'dateOfBirth',
        },
        {
            title: 'Địa chỉ',
            align: 'center',
            render: (record) =>
                compact([record.wardName, record.districtName, record.provinceName]).join(', '),
        },
        {
            title: 'Nguồn',
            align: 'center',
            dataIndex: 'source',
            key: 'source',
            render: (source) => <SaleChannelLabel channelId={source} />,
        },
        {
            title: 'Ngày tạo',
            align: 'center',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{createdAt ? moment(createdAt).format('DD/MM/YYYY') : '---'}</span>
            ),
        },
    ];

    const [widthTable, setWidthTable] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    const onSelectChange = (selectedRowKeysInCurrentPage: any) => {
        let selectedRowKeysBeforeInCurrentPage: string[] = [];
        dataSource.forEach(customer => {
            if (selectedRowKeys.includes(customer._id)) {
                selectedRowKeysBeforeInCurrentPage.push(customer._id);
            }
        });

        const selectedRowInOtherPage = selectedRowKeys
            .filter((key: string) => !selectedRowKeysBeforeInCurrentPage.includes(key));

        setSelectedRowKeys([...selectedRowInOtherPage, ...selectedRowKeysInCurrentPage]);
    };

    const selectAll = () => {
        const customerKeys = dataSource.map((customer: ICustomer) => customer._id);
        setSelectedRowKeys(customerKeys);
    };

    const resetCustomerSelected = () => {
        setSelectedRowKeys([]);
    };

    const renderColumnTitle = () => {
        if (selectedRowKeys.length === 0) {
            return <Checkbox onClick={selectAll} />;
        }

        return (
            <TableAction
                customers={selectedRowKeys}
                resetCustomerSelected={resetCustomerSelected}
                widthTable={widthTable}
            />
        );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        columnTitle: <div style={{ width: 30 }}>{renderColumnTitle()}</div>,
    };

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

    const onChange = async (pagination: TablePaginationConfig, filters: any, sorter: any) => {
        let sort = sorter.columnKey || 'createdAt';
        let direction = sorter.order ? sorter.order.replce('end', '') : 'desc';
        let { current, pageSize } = pagination;

        changePagination({ sort, direction, page: current, limit: pageSize });
    };

    return (
        <InsaTable
            loading={loading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource.map((e) => ({
                ...e,
                key: e._id,
            }))}
            bordered
            isShowTotal
            onChange={onChange}
            pagination={{
                showSizeChanger: false,
                pageSize: Number(limit),
                current: Number(page),
                total: storePagination.total,
            }}
            name="Thông tin khách hàng"
            className="order-tbl hover"
            hasDefaultColumn={false}
            rowKey="_id"
            headerExtend={
                <>
                    <Row
                        className="order-tbl-header customer-tbl-header"
                        justify="space-between"
                        align="top"
                    >
                        <Col>
                            <Row>
                                <Space size="middle">
                                    <InputSearch />
                                    <AdvanceFilter />
                                </Space>
                            </Row>
                        </Col>
                        <Col>
                            <Row justify="end" align="middle">
                                <SourceFilter />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <ListFiltered />
                    </Row>
                </>
            }
            onRow={(record: ICustomer) => {
                return {
                    onClick: (event) => history.push(`/customers/${record._id}`, path)
                };
            }}
        />
    );
};

export default CustomerTable;
