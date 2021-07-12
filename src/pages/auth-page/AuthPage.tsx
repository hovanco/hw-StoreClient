import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../layout';

import Login from '../login/Login';
import NotFound from '../not-found';
import SaveToken from '../save-token/SaveToken';
import SignUp from '../signup/SignUp';

interface Props {}

const AuthPage = (props: Props) => {
    const location = useLocation();

    const renderRedirectLogin = () => (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: location },
            }}
        />
    );
    return (
        <AuthLayout>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route component={Login} path="/login" />
                <Route component={SignUp} path="/signup" />
                <Route component={SaveToken} path="/save-token" />

                <Route render={renderRedirectLogin} path="/orders" />
                <Route render={renderRedirectLogin} path="/delivery" />
                <Route render={renderRedirectLogin} path="/customers" />
                <Route render={renderRedirectLogin} path="/products" />
                <Route render={renderRedirectLogin} path="/inventory" />
                <Route render={renderRedirectLogin} path="/supplier" />
                <Route render={renderRedirectLogin} path="/warehouse" />
                <Route render={renderRedirectLogin} path="/reports" />
                <Route render={renderRedirectLogin} path="/create-store" />
                <Route render={renderRedirectLogin} path="/setting" />
                <Route render={renderRedirectLogin} path="/sale-channel" />

                <Route component={NotFound} />
            </Switch>
        </AuthLayout>
    );
};

export default AuthPage;
