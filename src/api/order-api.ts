import axios from './axios-client';
import { IOrder, IGetOrderParams, ICreateOrderData } from '../models';

const basePath = '/store/v1/stores';

export default {
    getOrder: async ({
        id,
        page,
        limit,
        status,
        search,
        source,
        serviceId,
        soft,
        direction,
        customerId,
        transportStatus,
        deliveryDate,
        startTime,
        endTime,
    }: IGetOrderParams): Promise<{
        data: IOrder[];
        total: number;
    }> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${id}/orders`,
            params: {
                page,
                limit,
                status,
                search,
                source,
                serviceId,
                soft,
                direction,
                transportStatus,
                customerId,
                deliveryDate,
                startTime,
                endTime,
            },
        });

        return response.data;
    },

    createOrder: async ({
        storeId,
        data,
    }: {
        storeId: string;
        data: ICreateOrderData;
    }): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/orders`,
            data,
        });

        return response.data;
    },

    getOrderDetail: async ({
        storeId,
        orderId,
    }: {
        storeId: string;
        orderId: string;
    }): Promise<any> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/orders/${orderId}`,
        });

        return response.data;
    },

    updateOrder: async ({
        storeId,
        orderId,
        data,
    }: {
        storeId: string;
        orderId: string;
        data: any;
    }): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/orders/${orderId}`,
            data,
        });

        return response.data;
    },

    removeOrder: async ({
        storeId,
        orderId,
    }: {
        storeId: string;
        orderId: string;
    }): Promise<any> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/orders/${orderId}`,
        });

        return response.data;
    },

    confirmPaymentOrder: async ({
        storeId,
        orderId,
    }: {
        storeId: string;
        orderId: string;
    }): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/orders/${orderId}/confirm-payment`,
            data: {},
        });

        return response.data;
    },

    getDeliveryStatus: async ({
        storeId,
        warehouseId,
        startTime,
        endTime,
    }: {
        storeId: string;
        warehouseId?: string;
        startTime: number;
        endTime: number;
    }): Promise<any> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/orders/delivery-status`,
            params: {
                startTime,
                endTime,
                warehouseId,
            },
        });

        return response.data;
    },
};
