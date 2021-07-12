import React, { FC, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../../../../store/rootReducer';
import { IWarehouse, IAttribute } from '../../../../../models';
import { formatterInput, parserInput } from '../../../../../helper/format-money';

import { InsaTable } from '../../../../../components';
import { InputNumber } from 'antd';

interface Props {
    localStocks: any;
    setLocalStocks: any;
}

const TableUpdateVariantQuantity: FC<Props> = ({ localStocks, setLocalStocks }) => {
    const warehouses = useSelector((state: IState) => state.store.warehouses);

    const handleStockChange = useCallback(
        (stockId: string, warehouseId: string, quantity: number) => {
            let newLocalStocks = localStocks.map((item: any) => {
                if (item._id === stockId) item[warehouseId] = quantity;

                return item;
            });

            setLocalStocks(newLocalStocks);
        },
        // eslint-disable-next-line
        [localStocks]
    );

    const columns = useMemo(() => {
        let result: any = warehouses.map((item: IWarehouse, idx: number) => {
            return {
                title: item.name,
                dataIndex: item._id,
                align: 'center',
                key: item._id,
                width: 150,
                render: (text: string, record: any) => (
                    <InputNumber
                        formatter={formatterInput}
                        parser={parserInput}
                        value={record[item?._id as string]}
                        onChange={(value: string | number | undefined) =>
                            handleStockChange(record._id, item._id as string, Number(value) || 0)
                        }
                        min={0}
                    />
                ),
            };
        });

        result.unshift({
            title: '',
            dataIndex: 'name',
            width: 200,
            align: 'center',
            key: 'name',
            fixed: 'left',
            render: (text: string, record: any) => (
                <div>
                    <div className="variant-name">{record.productId.name}</div>
                    <div className="variant-attributes">
                        {record.productId.attributes
                            .map((item: IAttribute) => item.tags[0])
                            .join(' - ')}
                    </div>
                </div>
            ),
        });

        return result;
        // eslint-disable-next-line
    }, [warehouses, handleStockChange]);

    return (
        <InsaTable
            dataSource={localStocks}
            columns={columns}
            footer={undefined}
            rowKey="_id"
            pagination={false}
            title={undefined}
            bordered
            scroll={{ x: 600, y: 300 }}
        />
    );
};

export default TableUpdateVariantQuantity;
