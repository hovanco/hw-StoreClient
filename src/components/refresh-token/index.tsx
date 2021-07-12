import { get } from 'lodash';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../../api/auth-api';
import { IStorageState } from '../../reducers/authState/authReducer';
import types from '../../reducers/authState/authTypes';
import Loading from '../loading';
import { checkToken } from './token';

interface Props {
    children: ReactNode;
}

interface AuthState {
    auth: IStorageState;
}

const RefreshToken: FC<Props> = ({ children }) => {
    const [loadingToken, setLoadingToken] = useState<boolean>(false);
    const dispatch = useDispatch();
    const token = useSelector(({ auth }: AuthState) => auth.token);

    const loadToken = async () => {
        try {
            setLoadingToken(true);
            const response = await refreshAccessToken(get(token, 'refreshToken'));

            dispatch({
                type: types.UPDATE_TOKEN,
                payload: response.accessToken,
            });
        } catch (error) {
        } finally {
            setLoadingToken(false);
        }
    };

    useEffect(() => {
        if (get(token, 'accessToken')) {
            const isValidAccessToken = checkToken('accessToken');

            if (!isValidAccessToken) {
                const isValidRefreshToken = checkToken('refreshToken');

                if (!isValidRefreshToken) {
                    loadToken();
                }
            }
        } else {
            setLoadingToken(false);
        }
    }, []);

    if (loadingToken) {
        return (
            <>
                <Loading full />
            </>
        );
    }

    return <>{children}</>;
};

export default RefreshToken;
