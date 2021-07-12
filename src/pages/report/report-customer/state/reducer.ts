import { getStartTime, getEndTime } from '../../../../helper/get-time';
import { IAction, IState, EFilter } from './interface';
import types from './types';

const initalState = {
    loading: false,
    filter: EFilter.Period,
    startTime: getStartTime({
        type: 'month',
        date: Date.now(),
    }),
    endTime: getEndTime({
        type: 'month',
        date: Date.now(),
    }),
    data: [],
};

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
                data: [],
            };

        case types.SELECT_TYPE:
            return {
                ...state,
                filter: action.payload,
            };

        case types.LOAD_DATA_REPORT_CUSTOMER:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };

        case types.CHANGE_TIME:
            return {
                ...state,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
            };

        default:
            return state;
    }
};

export { initalState, reducer };
