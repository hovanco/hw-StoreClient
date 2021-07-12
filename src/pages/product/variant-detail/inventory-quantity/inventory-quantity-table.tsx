import { ColumnType } from 'antd/lib/table';
import { find } from 'lodash';
import React, { FC, useMemo } from 'react';
import { InsaTable } from '../../../../components';
import { IProduct, IStock, IWarehouse } from '../../../../models';
import AdjustNumberInput from './adjust-number-input';
import { useStocks } from './hooks/stocks';
import { useWarehouses } from './hooks/warehouses';

interface IColumnItem {
    _is: string;
    storeId: string;
    parentId: string;
    quantity: number;
    productId: IProduct;
    warehouseId: IWarehouse;
    createdAt: string;
    updateAt: string;
}

const InventoryQuantityTable: FC = () => {
    const { stocks, quantityChange, filter } = useStocks();
    const { warehouses } = useWarehouses();

    const columns: ColumnType<IColumnItem>[] = [
        {
            title: 'Kho hàng',
            align: 'center',
            dataIndex: ['warehouseId', 'name'],
            key: 'warehouse.name',
            render: (text: string) => <span className="primary-text">{text}</span>,
        },
        {
            title: 'Địa chỉ kho hàng',
            align: 'center',
            dataIndex: '',
            key: 'address',
            render: (record: any) => {
                let { address, wardName, districtName, provinceName } = record.warehouseId;

                return (
                    <span className="secondary-text">
                        {[address, wardName, districtName, provinceName].join(' - ')}
                    </span>
                );
            },
        },
        {
            title: 'Số lượng',
            align: 'center',
            dataIndex: '',
            key: 'quantity',
            render: (record: any) => (
                <AdjustNumberInput
                    value={record.quantity}
                    onChange={(value: number) => changeInventoryQuantity(record._id, value)}
                />
            ),
        },
    ];

    const changeInventoryQuantity = (_id: string, quantity: number) => {
        quantityChange({ _id, quantity });
    };

    const dataSource = useMemo(() => {
        return stocks
            .map((item: IStock) => ({
                ...item,
                warehouseId: find(warehouses, ['_id', item.warehouseId]),
            }))
            .filter((item: any) => item.warehouseId)
            .filter((item: any) =>
                filter.search
                    ? item.warehouseId.name
                          .toLowerCase()
                          .trim()
                          .includes(filter.search.toLowerCase().trim())
                    : true
            );
    }, [stocks, filter.search, warehouses]);

    return (
        <InsaTable
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            pagination={false}
            footer={undefined}
            title={undefined}
            className="table-inventory-quantity"
            bordered
            sticky
        />
    );
};

export default InventoryQuantityTable;
