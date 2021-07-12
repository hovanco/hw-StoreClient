import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import notFound from '../not-found';

const InventoryList = lazy(() => import('./inventory-list'));
const InventoryNew = lazy(() => import('./inventory-new'));

const InventoryPage: FC = () => {
    const { path } = useRouteMatch();
    const renderRouter = () => (
        <Switch>
            <Redirect path={`${path}`} to={`${path}/list`} exact />
            <Route path={`${path}/list`} component={InventoryList} />
            <Route path={`${path}/new`} component={InventoryNew} />
            <Route component={notFound} />
        </Switch>
    );

    return <Suspense fallback={<Loading />}>{renderRouter()}</Suspense>;
};
export default InventoryPage;
