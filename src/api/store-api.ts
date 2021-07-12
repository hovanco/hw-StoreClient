import axios from './axios-client';
import { EBusinessType, IStore, IStoreCategory, SaleChannelId } from '../models';

export interface IDataCreateStore {
    name: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    phoneNo: string;
    saleChannels?: SaleChannelId[];
}

export interface IDataUpdateStore {
    name?: string;
    phoneNo?: string;
    address?: string;
    province?: string;
    district?: string;
    ward?: string;
    saleChannels?: SaleChannelId[];
    logoUrl?: string;
    email?: string;
    fax?: string;
    businessType?: typeof EBusinessType;
}

const basePath = '/store/v1/stores';

const storeApi = {
    getStores: async (): Promise<any> => {
        const response = await axios({
            method: 'GET',
            url: basePath,
        });

        return response.data;
    },

    createStore: async (data: {
        name: string;
        address: string;
        province: string;
        district: string;
        ward: string;
        phoneNo: string;
    }): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: basePath,
            data,
        });

        return response.data;
    },

    getCategoryByStore: async (
        storeId: string,
        limit?: number,
        page?: number,
        search?: string
    ): Promise<IStoreCategory[]> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/categories`,
            params: {
                limit,
                page,
                search,
            },
        });

        return response.data;
    },

    updateStore: async (storeId: string, data: IDataUpdateStore): Promise<IStore> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}`,
            data,
        });

        return response.data;
    },
};

export default storeApi;
