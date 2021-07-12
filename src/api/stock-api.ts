import axios from './axios-client';

export async function getStocks({
    storeId,
    warehouseId,
    productId,
    categoryId,
    brandId,
    search,
    page,
    limit,
    parentId,
}: {
    storeId: string;
    warehouseId?: string;
    productId?: string;
    categoryId?: string;
    brandId?: string;
    search?: string;
    page?: number;
    limit?: number;
    parentId?: string;
}): Promise<any> {
    const response = await axios({
        method: 'GET',
        url: `/store/v1/stores/${storeId}/stocks`,
        params: {
            page,
            limit,
            warehouseId,
            productId,
            categoryId,
            brandId,
            search,
            parentId,
        },
    });

    return response.data;
}

export async function updateStock({
    storeId,
    stockId,
    quantity,
}: {
    storeId: string;
    stockId: string;
    quantity: number;
}): Promise<any> {
    const response = await axios({
        method: 'PUT',
        url: `/store/v1/stores/${storeId}/stocks/${stockId}`,
        data: { quantity },
    });

    return response.data;
}

export async function createStock({
    storeId,
    productId,
    quantity,
    warehouseId,
}: {
    storeId: string;
    productId: string;
    warehouseId: string;
    quantity: number;
}): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: `/store/v1/stores/${storeId}/stocks`,
        data: { quantity, productId, warehouseId },
    });

    return response.data;
}

export async function delStock({
    storeId,
    stockId,
}: {
    storeId: string;
    stockId: string;
}): Promise<any> {
    const response = await axios({
        method: 'DELETE',
        url: `/store/v1/stores/${storeId}/stocks/${stockId}`,
    });

    return response.data;
}
