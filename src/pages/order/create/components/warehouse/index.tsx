import { Select } from 'antd';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWarehouses } from '../../../../../components/warehouses/useWarehouse';
import { IWarehouse } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';

const Warehouse = () => {
    const store = useSelector((state: IState) => state.store.data);

    const { warehouseId, selectWarehouse, statusPage, order } = useOrderNew();
    const { warehouses } = useWarehouses();

    const onSelectWarehouse = (value: string) => {
        selectWarehouse(value);
    };

    useEffect(() => {
        if (!warehouseId) {
            selectWarehouse(store.warehouseId as string);
        }

        // eslint-disable-next-line
    }, []);

    if (statusPage === EStatusPage.DETAIL) {
        return <>{get(order, 'warehouseId.name')}</>;
    }

    return (
        <Select style={{ width: 200 }} value={warehouseId} onChange={onSelectWarehouse}>
            {warehouses.map((warehouse: IWarehouse) => (
                <Select.Option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                </Select.Option>
            ))}
        </Select>
    );
};

export default Warehouse;
