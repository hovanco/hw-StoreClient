import { uniqBy } from 'lodash';
import { IState, IAction } from './interface';
import types from './type';

export const initialReducer: IState = {
    attributes: [],
    attributeOptions: [],
    variants: [],
    stocks: [],
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.SET_ATTRIBUTES:
            return {
                ...state,
                attributes: action.payload,
            };

        case types.ADD_ATTRIBUTES:
            return {
                ...state,
                attributes: uniqBy([...state.attributes, action.payload], '_id'),
            };

        case types.SET_ATTRIBUTE_OPTIONS:
            return {
                ...state,
                attributeOptions: action.payload,
            };

        case types.SET_VARIANTS: {
            return {
                ...state,
                variants: action.payload,
            };
        }

        case types.SET_STOCKS: {
            return {
                ...state,
                stocks: action.payload,
            };
        }

        default:
            return state;
    }
};

export default reducer;
