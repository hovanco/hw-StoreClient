import axios from './axios-client';
import { ICustomer, ICustomersParams, ICreateCustomerParams } from '../models';

const basePath = '/store/v1/stores';

export default {
    getCustomers: async ({
        storeId,
        page,
        limit,
        source,
        search,
        sort,
        direction,
        dateOfBirth,
        filterDateBy,
        fromAt,
        toAt,
        gender,
    }: ICustomersParams): Promise<{
        data: ICustomer[];
        total: number;
    }> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/customers`,
            params: {
                page,
                limit,
                source,
                search,
                sort,
                direction,
                dateOfBirth,
                filterDateBy,
                fromAt,
                toAt,
                gender,
            },
        });

        return response.data;
    },

    getCustomer: async ({
        storeId,
        customerId,
    }: {
        storeId: string;
        customerId: string;
    }): Promise<ICustomer> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/customers/${customerId}`,
        });

        return response.data;
    },

    createCustomer: async ({
        storeId,
        formData,
    }: {
        storeId: string;
        formData: ICreateCustomerParams;
    }): Promise<ICustomer> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/customers`,
            data: formData,
        });

        return response.data;
    },

    updateCustomer: async ({
        storeId,
        customerId,
        formData,
    }: {
        storeId: string;
        customerId: string;
        formData: ICreateCustomerParams;
    }): Promise<ICustomer> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/customers/${customerId}`,
            data: formData,
        });

        return response.data;
    },

    deleteCustomer: async ({
        storeId,
        customerId,
    }: {
        storeId: string;
        customerId: string;
    }): Promise<ICustomer> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/customers/${customerId}`,
        });

        return response.data;
    },
};
