import axios from './axios-client';

const baseUrl = (storeId: string) => `/store/v1/stores/${storeId}/reports`;

export default {
    countReport: async ({
        storeId,
        startTime,
        endTime,
    }: {
        storeId: string;
        startTime: number;
        endTime: number;
    }): Promise<any> => {
        const url = `${baseUrl(storeId)}/dashboard/count`;

        const response = await axios({
            method: 'GET',
            url,
            params: {
                startTime,
                endTime,
            },
        });

        return response.data;
    },

    revenueReport: async ({
        storeId,
        startTime,
        endTime,
    }: {
        storeId: string;
        startTime: number;
        endTime: number;
    }): Promise<any> => {
        const url = `${baseUrl(storeId)}/dashboard/revenue`;

        const response = await axios({
            method: 'GET',
            url,
            params: {
                startTime,
                endTime,
            },
        });

        return response.data;
    },

    reportDetail: async ({
        type,
        storeId,
        filter,
        startTime,
        endTime,
    }: {
        type: 'customer' | 'revenue' | 'delivery';
        storeId: string;
        filter: string;
        startTime: number;
        endTime: number;
    }): Promise<any> => {
        const url = `${baseUrl(storeId)}/${type}`;

        const response = await axios({
            method: 'GET',
            url,
            params: {
                startTime,
                endTime,
                filter,
            },
        });

        return response.data;
    },

    // reportCustomer: async ({
    //     storeId,
    //     filter,
    //     startTime,
    //     endTime,
    // }: {
    //     storeId: string;
    //     filter: string;
    //     startTime: number;
    //     endTime: number;
    // }): Promise<any> => {
    //     const url = `${baseUrl(storeId)}/customer`;

    //     const response = await axios({
    //         method: 'GET',
    //         url,
    //         params: {
    //             startTime,
    //             endTime,
    //             filter,
    //         },
    //     });

    //     return response.data;
    // },

    // reportRevenue: async ({
    //     storeId,
    //     filter,
    //     startTime,
    //     endTime,
    // }: {
    //     storeId: string;
    //     filter: string;
    //     startTime: number;
    //     endTime: number;
    // }): Promise<any> => {
    //     const url = `${baseUrl(storeId)}/revenue`;

    //     const response = await axios({
    //         method: 'GET',
    //         url,
    //         params: {
    //             startTime,
    //             endTime,
    //             filter,
    //         },
    //     });

    //     return response.data;
    // },

    // reportDelivery: async ({
    //     storeId,
    //     filter,
    //     startTime,
    //     endTime,
    // }: {
    //     storeId: string;
    //     filter: string;
    //     startTime: number;
    //     endTime: number;
    // }): Promise<any> => {
    //     const url = `${baseUrl(storeId)}/revenue`;

    //     const response = await axios({
    //         method: 'GET',
    //         url,
    //         params: {
    //             startTime,
    //             endTime,
    //             filter,
    //         },
    //     });

    //     return response.data;
    // },
};
