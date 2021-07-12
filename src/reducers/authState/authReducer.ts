import types from './authTypes';

interface IAction {
    type: string;
    payload: any;
}

interface Token {}

export interface User {
    _id?: string;
    name?: string;
    picture?: string;
    phoneNo?: string;
    permissions?: string[];
}

export interface IStorageState {
    loading: boolean;
    isAuth: boolean;
    isLogout: boolean;
    token: Token;
    user: User;
}

const initialState = {
    loading: true,
    isAuth: false,
    isLogout: false,
    token: {},
    user: {},
};

const authReducer = (state = initialState, action: IAction): IStorageState => {
    switch (action.type) {
        case types.LOADING:
            return { ...state, loading: true };

        case types.LOGIN_SUCCESSS:
            return {
                ...state,
                token: action.payload,
                loading: false,
                isAuth: true,
                isLogout: false,
            };

        case types.UPDATE_TOKEN:
            const { accessToken, type } = action.payload;
            return {
                ...state,
                token: { ...state.token, accessToken, type },
            };

        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuth: true,
                user: action.payload,
            };

        case types.LOAD_USER_FAILED:
            return {
                ...initialState,
                loading: false,
            };

        case types.LOGIN_FAILED:
            return {
                ...initialState,
                loading: false,
                isLogout: true,
            };

        case types.LOGOUT:
            return {
                ...initialState,
                loading: false,
                isLogout: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
