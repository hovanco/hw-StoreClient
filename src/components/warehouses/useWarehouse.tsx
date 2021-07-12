import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import warehouseApi from '../../api/warehouse-api';
import { IWarehouse } from '../../models';
import { IState } from '../../store/rootReducer';

function useWarehouses(warehouseId?: string) {
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(true);
    const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);

    useEffect(() => {
        async function loadWarehouses(storeId: string) {
            setLoading(true);
            try {
                const response = await warehouseApi.getWarehouses(storeId);

                setWarehouses(response.data);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        if (store._id) {
            loadWarehouses(store._id);
        }
    }, [store._id]);

    const warehouse = warehouseId ? warehouses.find((w) => w._id === warehouseId) : undefined;

    return { loading, warehouse, warehouses };
}

export { useWarehouses };
