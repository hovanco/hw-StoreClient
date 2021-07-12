import * as queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../components';
import constants from '../../constants';
import { BaseLayout } from '../../layout';

function Login(): JSX.Element {
    const location = useLocation();
    const isLogout = useSelector(({ auth }: any) => auth.isLogout);

    useEffect(() => {
        const lastState: any = location.state;
        let lastLocation = lastState?.from;
        if (!lastLocation?.pathname) {
            lastLocation = {
                pathname: '/',
            };
        }
        const search = queryString.stringify({
            url: `${window.location.origin}/save-token`,
            location: JSON.stringify(lastLocation),
            isLogout,
        });
        window.location.href = `${constants.URL_AUTH}login?${search}`;
    }, []);

    return (
        <BaseLayout title="Login">
            <Loading full />
        </BaseLayout>
    );
}

export default Login;
