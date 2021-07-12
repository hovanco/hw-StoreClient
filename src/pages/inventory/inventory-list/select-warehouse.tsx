import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from '../../../reducers/storeState/reducer';
import { IWarehouse } from '../../../models';
import { useInventoryTable } from './context';

import { Select } from 'antd';

const SelectWarehouse: FC = () => {
    const { filter, warehouseChange } = useInventoryTable();

    const storeObj = useSelector(({ store }: { store: IStoreState }) => store.data);

    const warehouses = useSelector(({ store }: { store: IStoreState }) => store.warehouses);

    const getWarehouseOptions = useMemo(() => {
        if (warehouses.length === 0) return [];

        return warehouses.map((warehouse: IWarehouse) => {
            if (storeObj.warehouseId === warehouse._id)
                return {
                    name: 'Kho mặc định',
                    value: storeObj.warehouseId as string,
                };

            return {
                name: warehouse.name as string,
                value: warehouse._id as string,
            };
        });
    }, [storeObj.warehouseId, warehouses]);

    const handleChangeWarehouse = (value: string) => {
        warehouseChange(value);
    };

    return (
        <Select
            style={{ minWidth: 200 }}
            value={filter.warehouseId}
            onChange={handleChangeWarehouse}
        >
            {getWarehouseOptions.map((item: any) => (
                <Select.Option value={item.value} key={item.value}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectWarehouse;
