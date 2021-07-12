import { useContext } from 'react';
import { InventoryContext } from '../context';
import { useSelector } from 'react-redux';

import { IState } from '../../../../../store/rootReducer';
import { IWarehouse } from '../../../../../models';

export const useWarehouses = () => {
    const { warehouses: warehousesArr } = useSelector((state: IState) => state.store);
    const { warehouses, setWarehouses } = useContext(InventoryContext);

    const selectWarehouses = (selectedIds: string[]) => {
        let newWarehouses = warehousesArr.filter((item: IWarehouse) =>
            selectedIds.includes(item._id as string)
        );

        setWarehouses(newWarehouses);
    };

    return {
        warehouses,
        setWarehouses,
        selectWarehouses,
    };
};
