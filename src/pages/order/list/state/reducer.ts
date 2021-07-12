import { IStateOrders, IActionOrders } from './interface';
import types from './types';

export const initialState = {
    progress: true,
    page: 1,
    limit: 20,
    status: undefined,
    search: undefined,
    source: undefined,
    serviceId: undefined,
    soft: 'createdAt',
    direction: 'desc',
    deliveryDate: undefined,
    total: 1,
};

const reducer = (state: IStateOrders, action: IActionOrders) => {
    switch (action.type) {
        case types.RELOAD_FILTER:
            return {
                ...state,
                ...action.payload,
                progress: false,
            };

        case types.CHANGE_TEXT_SEARCH:
            return { ...state, page: 1, search: action.payload };

        case types.CHANGE_STATUS:
            return { ...state, page: 1, status: action.payload };

        case types.CHANGE_FILTER:
            return {
                ...state,
                page: 1,
                source: action.payload.source,
                serviceId: action.payload.serviceId,
                deliveryDate: action.payload.deliveryDate,
            };

        case types.REMOVE_FILTER:
            return { ...state, page: 1, [action.payload]: undefined };

        case types.CHANGE_PAGINATION:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};

export default reducer;
