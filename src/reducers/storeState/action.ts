import types from './type';
import { Dispatch } from 'redux';
import storeApi from '../../api/store-api';
import productApi from '../../api/product-api';
import orderApi from '../../api/order-api';
import warehouseApi from '../../api/warehouse-api';
import customerApi from '../../api/customer-api';
import * as stockApi from '../../api/stock-api';
import * as saleChannelApi from '../../api/sale-channel-api';
import { ICustomersParams } from '../../models';

const { getStores, getCategoryByStore } = storeApi;
const { getProducts, getAttributes: getAttributesApi } = productApi;
const { getOrder } = orderApi;
const { getWarehouses: getWarehousesApi } = warehouseApi;
const { getCustomers: getCustomersApi } = customerApi;

export const getStore = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await getStores();
        return dispatch({
            type: types.SET_STORE,
            payload: result,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getProduct = ({
    id,
    page,
    limit,
    search,
    categoryId,
    withQuantity,
}: {
    id: string;
    page: number;
    limit: number;
    categoryId?: string;
    search?: string;
    withQuantity?: boolean;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: types.SET_PRODUCT_LOADING,
        payload: true,
    });
    try {
        const result = await getProducts({
            storeId: id,
            page,
            limit,
            search,
            categoryId,
            withQuantity,
        });
        dispatch({
            type: types.SET_PRODUCTS,
            payload: {
                ...result,
                pagination: {
                    limit,
                    page,
                    total: result.total,
                },
            },
        });
    } catch (error) {
        console.error(error);
    } finally {
        dispatch({
            type: types.SET_PRODUCT_LOADING,
            payload: false,
        });
    }
};

export const getCategoriesByStore = (storeId: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await getCategoryByStore(storeId);
        dispatch({
            type: types.SET_STORE_CATEGORIES,
            payload: result,
        });
    } catch (error) {
        console.error(error);
    }
};
export const getOrders = ({
    id,
    page = 1,
    limit = 15,
    status,
    search,
    source,
    serviceId,
    soft,
    direction,
    transportStatus,
    customerId,
    deliveryDate,
}: {
    id: string;
    page?: number;
    limit?: number;
    status?: number;
    search?: string;
    source?: string;
    serviceId?: number;
    soft?: string;
    direction?: string;
    transportStatus?: string;
    customerId?: string;
    deliveryDate?: number;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: types.SET_ORDER_LOADING,
        payload: true,
    });
    try {
        const result = await getOrder({
            id,
            page,
            limit,
            status,
            source,
            serviceId,
            search,
            soft,
            direction,
            deliveryDate,
            customerId,
        });

        dispatch({
            type: types.SET_ORDERS,
            payload: {
                ...result,
                pagination: {
                    limit,
                    page,
                    total: result.total,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getAttributes = (storeId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: types.SET_ATTRIBUTE_LOADING,
        payload: true,
    });
    try {
        const result = await getAttributesApi(storeId);
        dispatch({
            type: types.SET_ATTRIBUTES,
            payload: {
                data: [...result],
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getWarehouses = (storeId: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await getWarehousesApi(storeId);

        dispatch({
            type: types.SET_WAREHOUSES,
            payload: result.data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getStocks = ({
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
}) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: types.SET_STOCK_LOADING,
            payload: { limit, page },
        });

        const result = await stockApi.getStocks({
            storeId,
            warehouseId,
            productId,
            categoryId,
            brandId,
            search,
            page,
            limit,
            parentId,
        });
        dispatch({
            type: types.SET_STOCKS,
            payload: {
                data: result.data,
                pagination: {
                    limit,
                    page,
                    total: result.total,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getCustomers = ({
    storeId,
    page,
    limit,
    sort,
    direction,
    source,
    search,
    dateOfBirth,
    filterDateBy,
    fromAt,
    toAt,
    gender,
}: ICustomersParams) => async (dispatch: any) => {
    dispatch({
        type: types.SET_CUSTOMERS_LOADING,
        payload: { page, limit },
    });

    try {
        const result = await getCustomersApi({
            storeId,
            limit,
            page,
            source,
            search,
            sort,
            direction,
            dateOfBirth,
            filterDateBy,
            fromAt,
            toAt,
            gender,
        });
        dispatch({
            type: types.SET_CUSTOMERS,
            payload: {
                ...result,
                pagination: {
                    limit,
                    page,
                    total: result.total,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getEnableSaleChannels = () => async (dispatch: any) => {
    try {
        const result = await saleChannelApi.getEnableSaleChannels();

        dispatch({
            type: types.SET_ENABLE_SALE_CHANNELS,
            payload: result,
        });
    } catch (error) {
        console.error(error);
    }
};

export const storeAction = {
    getStore,
    getProduct,
    getCategoriesByStore,
    getOrders,
    getAttributes,
    getWarehouses,
    getStocks,
    getCustomers,
    getEnableSaleChannels,
};
