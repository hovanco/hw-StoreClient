import { IAction, IState } from './interface';
import types from './types';

const initialReducer: IState = {
    packages: [],
    billingCycles: [],
    paymentMethods: [],
    packagesSelect: [],
    billingCycle: null,
    paymentMethod: null,
    coupon: '',
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.INIT_STATE:
            return {
                ...state,
                ...action.payload,
            };

        case types.UPDATE_PACKAGES:
            return {
                ...state,
                packagesSelect: action.payload,
            };

        case types.CHANGE_VALUE_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };

        default:
            return state;
    }
};

export { reducer as default, initialReducer };

