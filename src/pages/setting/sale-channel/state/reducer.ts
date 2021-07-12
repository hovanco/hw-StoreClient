import { IState, IAction } from './interface';
import * as types from './types';
import { SALE_CHANNEL_DATA } from '../../../../constants/sale-channels';

export const initialState = {
    loading: true,
    saleChannels: SALE_CHANNEL_DATA,
};

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_DONE:
            return {
                ...state,
                saleChannels: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
