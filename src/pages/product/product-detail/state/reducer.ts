import { IReducer, IAction } from './inteface';
import * as types from './types';

export const initialState = {
    loading: true,
    product: undefined,
};

export const reducer = (state: IReducer, action: IAction) => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
            };

        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case types.LOAD_PRODUCT_ERROR:
            return {
                ...initialState,
                loading: false,
            };

        case types.UPDATE_PRODUCT:
            return {
                ...initialState,
                product: action.payload,
                loading: false,
            };

        case types.LOAD_PRODUCT_SUCCESS:
            return {
                ...initialState,
                product: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};
