import React, { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../not-found';
import ProviderBillingContext from '../create-billing/state/context';

const BillingsList = lazy(() => import('../list-billings'));
const BillingCreate = lazy(() => import('../create-billing'));

const BillingPage = () => {
    const { path } = useRouteMatch();

    return (
        <ProviderBillingContext>
            <Switch>
                <Redirect exact from={path} to={`${path}/list`} />
                <Route path={`${path}/list`} component={BillingsList} />
                <Route path={`${path}/create`} component={BillingCreate} />
                <Route component={NotFound} />
            </Switch>
        </ProviderBillingContext>
    );
};
export default BillingPage;
