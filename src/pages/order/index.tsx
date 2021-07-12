import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import { storeAction } from '../../reducers/storeState/action';
import NotFound from '../not-found';
import './style.less';

const OrderList = lazy(() => import('./list'));
const OrderForm = lazy(() => import('./create'));
const OrderDetail = lazy(() => import('./detail'));
const OrderEdit = lazy(() => import('./edit'));
const OrderReturn = lazy(() => import('./return'));

const OrderPage = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(storeAction.getStore());

        // eslint-disable-next-line
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Redirect path={`${path}`} to={`${path}/list`} exact />
                <Route path={`${path}/list`} component={OrderList} />
                <Route path={`${path}/new`} exact component={OrderForm} />
                <Route path={`${path}/new/:id`} component={OrderForm} />
                <Route path={`${path}/order/:id`} exact component={OrderDetail} />
                <Route path={`${path}/order/edit/:id`} component={OrderEdit} />
                <Route path={`${path}/returned`} component={OrderReturn} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
};
export default OrderPage;
