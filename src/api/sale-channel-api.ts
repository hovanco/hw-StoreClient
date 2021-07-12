import axios from './axios-client';

export async function getEnableSaleChannels(): Promise<string[]> {
    const response = await axios({
        method: 'GET',
        url: '/store/v1/sale-channels',
    });

    return response.data.saleChannels;
}
