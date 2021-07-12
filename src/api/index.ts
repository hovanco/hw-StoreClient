import axios from './axios-client';
import { AxiosPromise } from 'axios';

export interface Payload {
    email?: string;
    password?: string;
    accessToken?: string;
}

export const loginApi = (payload: Payload, service?: string): AxiosPromise => {
    const url = service ? `/authentication/v1/signin/${service}` : '/authentication/v1/signin';
    return axios({
        url,
        method: 'POST',
        data: payload,
    });
};
