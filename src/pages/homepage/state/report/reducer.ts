import { IActionReport, IStateReport } from './interface';
import types from './types';

const initialStateReport: IStateReport = {
    loading: true,
    counts: {
        accessCount: 0,
        customersCount: 0,
        ordersCount: 0,
        returnedOrdersCount: 0,
        stocksCount: 0,
    },

    revenues: {
        all: undefined,
        shopee: undefined,
        facebook: undefined,
    },

    warehouseId: undefined,

    time: {
        type: 'month',
        value: Date.now(),
    },
};

const reducerReport = (state: IStateReport, action: IActionReport) => {
    switch (action.type) {
        case types.LOAD_REPORT:
            return { ...state, loading: true };

        case types.LOAD_REPORT_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            };

        case types.LOAD_REPORT_FAILED:
            return {
                ...initialStateReport,
                loading: false,
            };

        case types.SELECT_TYPE_TIME:
            return {
                ...state,
                time: {
                    ...state.time,
                    type: action.payload,
                },
            };

        case types.SELECT_WAREHOUSE:
            return {
                ...state,
                warehouseId: action.payload,
            };

        default:
            return state;
    }
};

export { reducerReport as default, initialStateReport };
