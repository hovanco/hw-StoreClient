import { getEndTime, getStartTime } from '../../../../helper/get-time';
import { IState, IAction, ETab, EFilter } from './interface';
import types from './types';

const initialState = {
    loading: false,
    tab: ETab.Revenue,
    filter: EFilter.Period,
    startTime: getStartTime({ type: 'month', date: Date.now() }),
    endTime: getEndTime({ type: 'month', date: Date.now() }),
    data: [],
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                data: [],
            };

        case types.SELECT_TAB:
            return {
                ...state,
                tab: action.payload,
            };

        case types.SELECT_FILTER:
            return {
                ...state,
                filter: action.payload,
            };

        case types.SELECT_TIMES:
            return {
                ...state,
                ...action.payload,
            };

        case types.LOAD_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export { initialState, reducer };
