import axios from './axios-client';

export default {
    getProvinces: async (): Promise<any> => {
        const url = `/store/v1/locations`;
        const response = await axios({
            method: 'GET',
            url,
        });

        return response.data;
    },

    getDistricts: async (provinceId: string): Promise<any> => {
        const url = `/store/v1/locations/provinces/${provinceId}/districts`;

        const response = await axios({
            method: 'GET',
            url,
        });

        return response.data;
    },

    getWards: async ({
        provinceId,
        districtId,
    }: {
        provinceId?: string | null;
        districtId?: string | null;
    }): Promise<any> => {
        const url = `/store/v1/locations/provinces/${provinceId}/districts/${districtId}/wards`;

        const response = await axios({
            method: 'GET',
            url,
        });

        return response.data;
    },
};
