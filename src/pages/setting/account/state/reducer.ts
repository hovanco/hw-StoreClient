import { IState, IAction } from './interface';
import * as types from './types';

const initialState: IState = {
    loading: true,
    staffs: [],
};

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_DONE:
            return {
                ...state,
                staffs: action.payload,
                loading: false,
            };

        case types.REMOVE_STAFF: {
            const newStaffs = state.staffs.filter((staff) => staff._id !== action.payload._id);

            return {
                ...state,
                staffs: newStaffs,
            };
        }

        case types.ADD_STAFF: {
            const newStaffs = [action.payload, ...state.staffs];
            return {
                ...state,
                staffs: newStaffs,
            };
        }

        default:
            return state;
    }
};

export { reducer, initialState };
