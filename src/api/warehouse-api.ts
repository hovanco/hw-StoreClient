import { IWarehouse } from '../models';
import axios from './axios-client';

const warehouseApi = {
    getWarehouses: async (storeId: string): Promise<any> => {
        const url = `/store/v1/stores/${storeId}/warehouses`;

        const response = await axios({
            method: 'GET',
            url,
        });

        return response.data;
    },

    getWarehouse: async (storeId: string, warehouseId: string): Promise<IWarehouse> => {
        const url = `/store/v1/stores/${storeId}/warehouses/${warehouseId}`;

        const response = await axios({
            method: 'GET',
            url,
        });

        return response.data;
    },

    createWarehouse: async (
        storeId: string,
        data: {
            name: string;
            phoneNo: string;
            province: string;
            district: string;
            ward: string;
            address: string;
        }
    ): Promise<IWarehouse> => {
        const url = `/store/v1/stores/${storeId}/warehouses`;

        const response = await axios({
            method: 'POST',
            url,
            data,
        });

        return response.data;
    },

    editWarehouse: async (
        storeId: string,
        warehouseId: string,
        data: {
            name?: string;
            phoneNo?: string;
            province?: string;
            district?: string;
            ward?: string;
            address?: string;
        }
    ): Promise<IWarehouse> => {
        const url = `/store/v1/stores/${storeId}/warehouses/${warehouseId}`;

        const response = await axios({
            method: 'PUT',
            url,
            data,
        });

        return response.data;
    },

    deleteWarehouse: async({
        storeId,
        warehouseId
    }: {
        storeId: string;
        warehouseId: string;
    }): Promise<any> => {
        const res = await axios({
            method: 'DELETE',
            url: `/store/v1/stores/${storeId}/warehouses/${warehouseId}`,
        });
    
        return res.data;
    },

};

export default warehouseApi;
