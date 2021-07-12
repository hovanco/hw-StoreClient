import Axios from 'axios';
import constants from '../constants';
import axios from './axios-client';

interface FormAuthDate {
    email?: string;
    password?: string;
}

export async function loginWithEmail(data: FormAuthDate): Promise<void> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/signin',
        data,
    });

    return response.data;
}
export async function signupWithEmail(data: FormAuthDate): Promise<void> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/signup',
        data,
    });

    return response.data;
}

export async function refreshAccessToken(refreshToken: string): Promise<any> {
    const response = await Axios({
        method: 'POST',
        url: `${constants.URL_API}/authentication/v1/auth/refresh-token`,
        data: {
            refreshToken,
        },
    });

    return response.data;
}

export async function logout(refreshToken: string): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/auth/logout',
        data: {
            refreshToken,
        },
    });

    return response.data;
}

export async function existingRefreshToken(refreshToken: string): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/auth/existing-refresh-token',
        data: {
            refreshToken,
        },
    });

    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    loginWithEmail,
    signupWithEmail,
    refreshAccessToken,
    logout,
    existingRefreshToken
};
