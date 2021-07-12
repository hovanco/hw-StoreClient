import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { find } from 'lodash';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useWarehouses } from '../../../../components/warehouses/useWarehouse';
import formatMoney from '../../../../helper/format-money';
import { IStock, IWarehouse } from '../../../../models';
import { IState } from '../../../../store/rootReducer';

interface IColumnItem {
    _id: string;
    storeId: string;
    quantity: number;
    warehouseId?: IWarehouse;
}

const TableStock: FC = () => {
    const stocks = useSelector((state: IState) => state.store.stocks);
    const { warehouses } = useWarehouses();

    const columns: ColumnsType<IColumnItem> = [
        {
            title: 'Kho hàng',
            dataIndex: ['warehouseId', 'name'],
            key: 'warehouseId',
        },

        {
            title: 'Địa chỉ kho',
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
            title: 'Tồn kho',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (quantity: number) => `${formatMoney(quantity)}`,
            width: 120,
        },
    ];

    const dataSource = useMemo(() => {
        return stocks.data
            .map((item: IStock) => ({
                ...item,
                warehouseId: find(warehouses, ['_id', item.warehouseId]),
            }))
            .filter((item: any) => item.warehouseId);
    }, [stocks, warehouses]);

    return (
        <Card className="card-table-stock">
            <Typography.Title level={3}>Tình trạng tồn kho</Typography.Title>
            <Table
                sticky
                dataSource={dataSource}
                columns={columns}
                rowKey="_id"
                pagination={false}
                className="table-dark-odd table-stock"
                loading={stocks.loading}
            />
        </Card>
    );
};

export default TableStock;
