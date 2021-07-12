import { message } from 'antd';
import * as queryString from 'query-string';
import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setToken } from '../../api/token';
import { Loading } from '../../components';
import { BaseLayout } from '../../layout';
import { getUserAction } from '../../reducers/authState/authAction';
import types from '../../reducers/authState/authTypes';

interface Props {}

const SaveToken: FC<Props> = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const searchState: {
        token?: string;
        remember?: string;
        location?: string;
        isHasStore?: string;
        saleChannel?: string;
    } = queryString.parse(history.location.search);

    const saveAndLoadUser = async (): Promise<void> => {
        const { token, location, isHasStore, saleChannel } = searchState;

        if (!token || !location) {
            return;
        }
        const tokenValue = JSON.parse(token);

        await localStorage.removeItem('shortLiveToken');
        await setToken({
            token: tokenValue,
        });
        await dispatch({
            type: types.LOGIN_SUCCESSS,
            payload: tokenValue,
        });
        await dispatch(getUserAction());
        message.success('Đăng nhập thành công');

        if (isHasStore === 'false') {
            history.replace({
                pathname: '/create-store',
                search: queryString.stringify({ saleChannel }),
            });
        } else {
            history.push('/');
        }
    };

    useEffect(() => {
        saveAndLoadUser();
    }, []);

    return (
        <BaseLayout title="Login">
            <Loading full />
        </BaseLayout>
    );
};

export default SaveToken;
