import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { loginApi, Payload } from '../../api';
import authApi from '../../api/auth-api';
import { getToken, removeToken } from '../../api/token';
import { getUserApi } from '../../api/user';
import types from './authTypes';

// load user
const loadingUser = () => ({ type: types.LOADING });

export const loadUserSuccess = (payload: any) => ({
    type: types.LOAD_USER_SUCCESS,
    payload,
});

export const getUserAction = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(loadingUser());

        const res = await getUserApi();

        dispatch(loadUserSuccess(res.data));
    } catch (error) {
        dispatch({
            type: types.LOAD_USER_FAILED,
        });
    }
};

//login with email
export const loginActionWithEmail = (payload: any) => async (dispatch: any) => {
    dispatch({
        type: types.LOGIN_SUCCESSS,
        payload,
    });

    dispatch(push('/'));
    dispatch(getUserAction());
};

// login with service
export const loginActionWithService = (data: Payload, service?: any) => async (dispatch: any) => {
    try {
        dispatch(loadingUser());
        const res = await loginApi(data, service);

        dispatch({
            type: types.LOGIN_SUCCESSS,
            payload: res.data,
        });

        // load user
        const res_user = await getUserApi();
        dispatch(push('/'));
        await dispatch(loadUserSuccess(res_user.data));
    } catch (e) {
        dispatch({
            type: types.LOGIN_FAILED,
        });
    }
};

//logout
export const logout = (value?: boolean) => async (dispatch: any) => {
    try {
        const refreshToken = getToken('refreshToken');

        if (refreshToken) {
            await authApi.logout(refreshToken);
        }
    } catch (error) {
    } finally {
        removeToken();

        dispatch({
            type: types.LOGOUT,
            payload: typeof value === 'boolean' ? value : true,
        });
    }
};
