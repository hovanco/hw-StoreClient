import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import notFound from '../not-found';

const WarehousingApplicationList = lazy(() => import('./warehouse-list'));

const WarehousePage: FC = () => {
    const { path } = useRouteMatch();
    const renderRouter = () => (
        <Switch>
            <Redirect path={`${path}`} to={`${path}/list`} exact />
            <Route path={`${path}/list`} component={WarehousingApplicationList} />
            <Route component={notFound} />
        </Switch>
    );

    return <Suspense fallback={<Loading />}>{renderRouter()}</Suspense>;
};
export default WarehousePage;
