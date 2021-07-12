import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../api/auth-api';
import { getToken } from '../api/token';
import { getUserAction, logout } from '../reducers/authState/authAction';
import { IStorageState } from '../reducers/authState/authReducer';

interface AuthState {
    auth: IStorageState;
}

export function useProgressAuth() {
    const [progress, setProgress] = useState<boolean>(true);
    const dispatch = useDispatch();
    const isAuth = useSelector(({ auth }: AuthState) => auth.isAuth);
    const loading = useSelector(({ auth }: AuthState) => auth.loading);

    useEffect(() => {
        async function processAuth() {
            const refreshToken = getToken('refreshToken');

            if (window.location.pathname === '/save-token' || !refreshToken) {
                return;
            }

            try {
                const response = await authApi.existingRefreshToken(refreshToken);

                if (!response.existingRefreshToken) {
                    dispatch(logout(false));
                    return;
                }

                dispatch(getUserAction());
            } catch (error) {
                dispatch(logout(false));
            } finally {
                setProgress(false);
            }
        }

        if (isAuth) {
            processAuth();
        } else {
            setProgress(false);
        }
    }, []);

    return useMemo(() => ({ loading, isAuth, progress }), [loading, isAuth, progress]);
}
