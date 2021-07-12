import React, { FC, memo, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from '../../../reducers/storeState/reducer';
import { ColumnType } from 'antd/lib/table';
import { useInventoryTable } from './context';
import { find } from 'lodash';
import { updateStock } from '../../../api/stock-api';
import { IStock } from '../../../models';

import { Row, Space, Typography, message } from 'antd';
import { InsaButton, InsaTable } from '../../../components';
import iconLocation from '../../../assets/images/ic-location.svg';
import InventoryColumnName from '../inventory-column-name';
import InventoryUpdateInput from './inventory-update-input';
import InventoryQuantity from './inventory-quantity';
import FilteredTags from './filtered-tags';

import './style.less';

export interface IEditRow extends IStock {
    editValue: number;
}

const InventoryTable: FC = () => {
    const { pagination, pageChange, filter, refreshData } = useInventoryTable();

    const stocks = useSelector(({ store }: { store: IStoreState }) => store.stocks);

    const warehouses = useSelector(({ store }: { store: IStoreState }) => store.warehouses);

    const { data: productList, loading, pagination: storePagination } = stocks;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.ReactText[]>();
    const [editingRow, setEditingRow] = useState<IEditRow>();
    const [localLoading, setLocalLoading] = useState<boolean>(false);

    const columns: ColumnType<any>[] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: ['productId', 'name'],
            key: 'name',
            render: (text: string, record: IStock) => <InventoryColumnName stock={record} />,
        },
        {
            title: 'Mã sản phẩm',
            className: 'column-money',
            dataIndex: ['productId', 'code'],
            key: 'code',
            align: 'center',
        },
        {
            title: 'Tồn kho',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (text: string, record: IStock) => (
                <InventoryQuantity text={text} record={record} editingRow={editingRow} />
            ),
        },
        {
            title: 'Thêm bớt',
            align: 'center',
            render: (text: string, record: IStock) => (
                <InventoryUpdateInput
                    onFocus={() => handleFocusUpdateInventoryInput(record)}
                    editRow={editingRow}
                    stock={record}
                    onChange={handleLocalChangeQuantity}
                    onSave={handleSaveRow}
                />
            ),
        },
        {
            title: '',
            align: 'center',
            render: (text: string, record: IStock) => (
                <InsaButton
                    type={editingRow?._id === record._id ? 'primary' : 'default'}
                    onClick={handleSaveRow}
                    disabled={editingRow?._id !== record._id || editingRow?.editValue === 0}
                >
                    Lưu
                </InsaButton>
            ),
        },
    ];

    const onChangPagination = (page: number) => {
        pageChange(page);
    };

    const handleFocusUpdateInventoryInput = (record: IStock) => {
        selectEditingRow(record);
    };

    const selectEditingRow = (record: IStock) => {
        setEditingRow({ ...record, editValue: 0 });
    };

    const onSelectChange = (models: React.ReactText[]) => {
        setSelectedRowKeys(models);
    };

    const handleLocalChangeQuantity = (value: number) => {
        setEditingRow({ ...editingRow, editValue: value } as IEditRow);
    };

    const currentWarehouseAddress = useMemo(() => {
        let currentWarehouse = find(warehouses, ['_id', filter.warehouseId]);

        if (!currentWarehouse) return '';

        let { address, wardName, districtName, provinceName } = currentWarehouse;

        return [address, wardName, districtName, provinceName].join(', ');
    }, [warehouses, filter.warehouseId]);

    const handleSaveRow = async () => {
        if (!editingRow) return;

        let { editValue, storeId, _id, quantity } = editingRow;

        if (quantity + editValue < 0) {
            message.error('Số lượng sản phẩm phải lớn hơn hoặc bằng 0');

            return;
        }

        try {
            setLocalLoading(true);
            await updateStock({ storeId, stockId: _id, quantity: quantity + editValue });

            message.success('Cập nhật số lượng sản phẩm tồn kho thành công');
            refreshData();
            setEditingRow(undefined);
        } catch {
            message.error('Cập nhật sản phẩm tồn khi thất bại');
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <InsaTable
            loading={loading || localLoading}
            columns={columns}
            dataSource={productList.map((e) => ({
                ...e,
                key: e._id,
            }))}
            pagination={{
                pageSize: pagination.limit,
                current: pagination.page,
                total: storePagination.total,
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
            headerExtend={
                <Row justify="space-between" style={{ width: '100%' }}>
                    <FilteredTags />
                    <Space>
                        <img src={iconLocation} alt="icon" />
                        <Typography.Text type="secondary">
                            {currentWarehouseAddress}
                        </Typography.Text>
                    </Space>
                </Row>
            }
        />
    );
};
export default memo(InventoryTable);
