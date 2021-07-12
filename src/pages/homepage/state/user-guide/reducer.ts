import types from './types';

interface IUserGuide {
    _id: string;
    storeId: string;
    userId: string;
    hideNewUserGuide: boolean;
}

interface IState {
    loading: boolean;
    userGuide?: IUserGuide;
}

interface IAction {
    type: string;
    payload?: any;
}

const initialStateGuide: IState = {
    loading: false,
    userGuide: undefined,
};

const reducerUserGuide = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_DONE:
            return {
                ...state,
                userGuide: action.payload,
                loading: false,
            };

        case types.UPDATE_USER_GUIDE:
            return {
                ...state,
                userGuide: action.payload,
            };

        default:
            return state;
    }
};

export { initialStateGuide, reducerUserGuide };
