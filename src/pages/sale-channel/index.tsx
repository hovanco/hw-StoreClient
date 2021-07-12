import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import notFound from '../not-found';

const SaleChannelPagePos = lazy(() => import('./pos'));
const SaleChannelPageFacebook = lazy(() => import('./facebook'));
const SaleChannelPageShoppe = lazy(() => import('./shoppe'));

const SaleChannelPage: FC = () => {
    const { path } = useRouteMatch();
    const renderRouter = () => (
        <Switch>
            <Redirect path={`${path}`} to={`${path}/pos`} exact />
            <Route path={`${path}/pos`} component={SaleChannelPagePos} />
            <Route path={`${path}/shoppe`} component={SaleChannelPageShoppe} />
            <Route path={`${path}/facebook`} component={SaleChannelPageFacebook} />
            <Route component={notFound} />
        </Switch>
    );

    return <Suspense fallback={<Loading full />}>{renderRouter()}</Suspense>;
};
export default SaleChannelPage;
