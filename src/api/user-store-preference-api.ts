import axios from './axios-client';

export const getUserStorePreference = async (storeId: string): Promise<any> => {
    const url = `/store/v1/stores/${storeId}/user-preferences`;

    const response = await axios({
        url,
        method: 'GET',
    });

    return response;
};

export const updateUserStorePreference = async ({
    storeId,
    hideNewUserGuide,
}: {
    storeId: string;
    hideNewUserGuide: boolean;
}): Promise<any> => {
    const url = `/store/v1/stores/${storeId}/user-preferences`;

    const response = await axios({
        url,
        method: 'POST',
        data: {
            hideNewUserGuide,
        },
    });

    return response;
};
