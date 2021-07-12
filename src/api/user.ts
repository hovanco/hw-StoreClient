import axios from './axios-client';
import { AxiosPromise } from 'axios';

export const getUserApi = (): AxiosPromise => {
    const url = '/authentication/v1/users/info';

    return axios({
        url,
        method: 'GET',
    });
};

export const updateUserInfo = async (data: { name?: string; picture?: string; phoneNo?: string }): Promise<any> => {
    const response = await axios({
        method: 'PUT',
        url: `/authentication/v1/users/info`,
        data,
    });

    return response;
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<any> => {
    const response = await axios({
        method: 'PUT',
        url: `/authentication/v1/users/changePassword`,
        data,
    });

    return response;
};
