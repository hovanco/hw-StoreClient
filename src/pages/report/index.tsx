import React, { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import { getWarehouses } from '../../reducers/storeState/action';
import { IState } from '../../store/rootReducer';
import notFound from '../not-found';

const ReportCustomer = lazy(() => import('./report-customer/screen'));
const ReportSale = lazy(() => import('./report-sale/screen'));

const ReportPage: FC = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    const store = useSelector((state: IState) => state.store.data);

    useEffect(() => {
        if (store._id) {
            dispatch(getWarehouses(store._id));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Suspense fallback={<Loading full />}>
            <Switch>
                <Redirect path={`${path}`} to={`${path}/sale`} exact />

                <Route path={`${path}/sale`} component={ReportSale} />

                <Route path={`${path}/customer`} component={ReportCustomer} />

                <Route component={notFound} />
            </Switch>
        </Suspense>
    );
};
export default ReportPage;
