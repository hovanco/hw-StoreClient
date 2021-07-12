import React, { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import { storeAction } from '../../reducers/storeState/action';
import NotFound from '../not-found';
import './style.less';

const DeliveryList = lazy(() => import('./list'));
const DeliveryForm = lazy(() => import('./detail'));
const DeliveryOverView = lazy(() => import('./overview'));

type Props = {};

const DeliveryPage: FC<Props> = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(storeAction.getStore());
    }, [dispatch]);

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Redirect path={`${path}`} to={`${path}/list`} exact />
                <Route path={`${path}/overview`} component={DeliveryOverView} />
                <Route path={`${path}/list`} component={DeliveryList} />
                <Route path={`${path}/detail/:id`} component={DeliveryForm} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
};
export default DeliveryPage;
