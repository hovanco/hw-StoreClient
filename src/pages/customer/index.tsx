import './style.less';

import React, { FC, Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { Loading } from '../../components';
import notFound from '../not-found';

const CustomerList = lazy(() => import('./list'));
const CustomerDetail = lazy(() => import('./detail'));

type Props = {};
const CustomerPage: FC<Props> = () => {
    const { path } = useRouteMatch();

    const renderRouter = () => {
        return (
            <Switch>
                <Redirect path={`${path}`} to={`${path}/list`} exact />
                <Route path={`${path}/list`} component={CustomerList} />
                <Route path={`${path}/:customerId`} component={CustomerDetail} />
                <Route component={notFound} />
            </Switch>
        );
    };
    return <Suspense fallback={<Loading />}>{renderRouter()}</Suspense>;
};
export default CustomerPage;
