import { CRUDReducer, ICRUDReducer } from '../helper';
import types from './type';
import { IStore, IStoreCategory, IWarehouse } from '../../models';

interface IAction {
    type: string;
    payload: any;
}

export interface IStoreState {
    order: ICRUDReducer<any>;
    data: IStore;
    product: ICRUDReducer<any>;
    categories: IStoreCategory[];
    attributes: ICRUDReducer<any>;
    loadingStore: boolean;
    warehouses: IWarehouse[];
    stocks: ICRUDReducer<any>;
    customers: ICRUDReducer<any>;
    enableSaleChannels: string[];
}

const initState: IStoreState = {
    data: {},
    product: CRUDReducer(),
    order: CRUDReducer(),
    categories: [],
    attributes: CRUDReducer(),
    loadingStore: true,
    warehouses: [],
    stocks: CRUDReducer(),
    customers: CRUDReducer(),
    enableSaleChannels: [],
};

const storeReducer = (state = initState, action: IAction): IStoreState => {
    switch (action.type) {
        case types.SET_LOADING_STORE:
            return {
                ...state,
                loadingStore: true,
            };

        case types.SET_STORE:
            return {
                ...state,
                data: { ...state.data, ...action.payload },
                loadingStore: false,
            };
        case types.SET_PRODUCTS:
            return {
                ...state,
                product: {
                    ...state.product,
                    ...action.payload,
                    loading: false,
                },
            };
        case types.SET_PRODUCT_LOADING:
            return {
                ...state,
                product: {
                    ...state.product,
                    loading: action.payload,
                },
            };
        case types.SET_STORE_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case types.SET_ORDERS:
            return {
                ...state,
                order: {
                    ...state.order,
                    ...action.payload,
                    loading: false,
                },
            };
        case types.SET_ORDER_LOADING:
            return {
                ...state,
                order: {
                    ...state.order,
                    loading: action.payload,
                },
            };

        case types.SET_ATTRIBUTES:
            return {
                ...state,
                attributes: {
                    ...state.attributes,
                    ...action.payload,
                    loading: false,
                },
            };
        case types.SET_ATTRIBUTE_LOADING:
            return {
                ...state,
                attributes: {
                    ...state.attributes,
                    loading: action.payload,
                },
            };

        case types.RESET_STORE:
            return initState;

        case types.SET_WAREHOUSES:
            return {
                ...state,
                warehouses: action.payload,
            };

        case types.SET_STOCK_LOADING:
            return {
                ...state,
                stocks: {
                    ...state.stocks,
                    pagination: {
                        ...state.stocks.pagination,
                        ...action.payload,
                    },
                    loading: true,
                },
            };

        case types.SET_STOCKS:
            return {
                ...state,
                stocks: {
                    ...state.stocks,
                    ...action.payload,
                    loading: false,
                },
            };

        case types.SET_CUSTOMERS:
            return {
                ...state,
                customers: {
                    ...state.order,
                    ...action.payload,
                    loading: false,
                },
            };
        case types.SET_CUSTOMERS_LOADING:
            return {
                ...state,
                customers: {
                    ...state.customers,
                    pagination: {
                        ...state.customers.pagination,
                        ...action.payload,
                    },
                    loading: true,
                },
            };

        case types.SET_ENABLE_SALE_CHANNELS:
            return {
                ...state,
                enableSaleChannels: action.payload,
            };

        default:
            return state;
    }
};
export default storeReducer;
