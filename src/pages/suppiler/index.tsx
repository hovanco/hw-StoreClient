import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import notFound from '../not-found';

const SupplierList = lazy(() => import('./supplier-list'));
const SupplierNew = lazy(() => import('./supplier-new'));

const SupplierPage: FC = () => {
    const { path } = useRouteMatch();
    const renderRouter = () => (
        <Switch>
            <Redirect path={`${path}`} to={`${path}/list`} exact />
            <Route path={`${path}/list`} component={SupplierList} />
            <Route path={`${path}/new`} component={SupplierNew} />
            <Route component={notFound} />
        </Switch>
    );

    return <Suspense fallback={<Loading />}>{renderRouter()}</Suspense>;
};
export default SupplierPage;
