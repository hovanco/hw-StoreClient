import { InputNumber, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { get, pick } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatterInput, parserInput } from '../../../../../helper/format-money';
import { IStock, IWarehouse } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useProductDetail } from '../../../product-detail/state/context';
import { IStockUpdate } from '../update-quantity-product';

interface Props {
    quantity: IStockUpdate[];
    isEdit: boolean;
    changeStockUpdate?: (stocksUpdate: any) => void;
}

const TableQuantityProduct: FC<Props> = ({ quantity, isEdit, changeStockUpdate }) => {
    const { product } = useProductDetail();
    const warehouses = useSelector((state: IState) => state.store.warehouses);

    const [quantityLocal, setQuantityLocal] = useState<any[]>([]);

    useEffect(() => {
        if (quantity) {
            setQuantityLocal(quantity);
        }
    }, [quantity]);

    const columns: ColumnsType<any> = warehouses.map((item: IWarehouse) => {
        const handleStockChange = (value: any) => {
            const existStock = quantityLocal.find((i: IStock) => i.warehouseId === item._id);

            let newValue: any[] = [];

            const newItem = {
                ...pick(item, ['storeId']),
                warehouseId: item._id,
                productId: get(product, '_id'),
                quantity: value,
            };

            if (!existStock) {
                if (changeStockUpdate) {
                    changeStockUpdate(newItem);
                }

                newValue = [...quantityLocal, newItem];
            } else {
                newValue = quantityLocal.map((i: IStock) => {
                    if (i.warehouseId === item._id) {
                        if (changeStockUpdate) {
                            changeStockUpdate(newItem);
                        }

                        return newItem;
                    }

                    return i;
                });
            }

            setQuantityLocal(newValue);
        };

        return {
            title: item.name,
            dataIndex: item._id,
            align: 'left',
            key: item._id,

            render: (text: string, record: any) => {
                const warehousesExist = quantityLocal.find((i: IStock) => {
                    return i.warehouseId === item._id;
                });

                const productQuantity = get(warehousesExist, 'quantity') || 0;

                if (isEdit) {
                    return (
                        <InputNumber
                            formatter={formatterInput}
                            parser={parserInput}
                            value={productQuantity}
                            onChange={handleStockChange}
                            min={0}
                        />
                    );
                }

                return <span>{productQuantity}</span>;
            },
        };
    });

    return (
        <Table
            columns={columns}
            bordered
            dataSource={[{ key: 1 }]}
            pagination={false}
            scroll={{
                x: 600,
            }}
        />
    );
};

export default TableQuantityProduct;
