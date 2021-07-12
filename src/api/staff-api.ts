import axios from './axios-client';
import { EUserRole, IStaff } from '../models';

const basePath = '/store/v1/stores';

const staffsApi = {
    getStaffs: async (storeId: string): Promise<IStaff[]> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/staffs`,
        });

        return response.data;
    },

    createStaff: async (
        storeId: string,
        data: {
            email: string;
            password: string;
            name: string;
            role: EUserRole;
        }
    ): Promise<IStaff> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/staffs`,
            data,
        });

        return response.data;
    },

    getStaff: async (storeId: string, staffId: string): Promise<any> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/staffs/${staffId}`,
        });

        return response.data;
    },

    updateStaff: async (
        storeId: string,
        staffId: string,
        data: { email?: string; password?: string; name?: string; role?: EUserRole }
    ): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/staffs/${staffId}`,
            data,
        });

        return response.data;
    },

    deleteStaff: async (storeId: string, staffId: string): Promise<any> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/staffs/${staffId}`,
        });

        return response.data;
    },
};

export default staffsApi;
