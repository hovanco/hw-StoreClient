import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Loading } from '../../components';
import { EUserRole } from '../../models';
import { storeAction } from '../../reducers/storeState/action';
import { IState } from '../../store/rootReducer';
import NotFound from '../not-found';

const BillingPage = lazy(() => import('./billing'));
const ListMenus = lazy(() => import('./list-menus'));
const GeneralInformation = lazy(() => import('./general-information'));
const Account = lazy(() => import('./account'));
const AccountDetail = lazy(() => import('./account-detail'));
const SaleChannel = lazy(() => import('./sale-channel'));
const Warehouse = lazy(() => import('./warehouse'));
const WarehouseDetail = lazy(() => import('./warehouse-detail'));

const SettingPage = () => {
    const store = useSelector((state: IState) => state.store.data);
    const loading = useSelector((state: IState) => state.store.loadingStore);

    const history = useHistory();
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(storeAction.getStore());

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (store) {
            const isValid =
                typeof store.role === 'number' &&
                [EUserRole.owner, EUserRole.manager].includes(store.role);

            if (!isValid) {
                history.push('/');
            }
        }
    }, [store]);

    if (loading) {
        return <Loading full />;
    }

    return (
        <Suspense fallback={<Loading full />}>
            <Switch>
                <Route exact path={path} component={ListMenus} />
                <Route path={`${path}/billings`} component={BillingPage} />
                <Route path={`${path}/general-information`} component={GeneralInformation} />
                <Route path={`${path}/account`} exact component={Account} />
                <Route path={`${path}/account/:staffId`} component={AccountDetail} />
                <Route path={`${path}/sale-channel`} component={SaleChannel} />
                <Route path={`${path}/warehouse`} exact component={Warehouse} />
                <Route path={`${path}/warehouse/:warehouseId`} component={WarehouseDetail} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
};
export default SettingPage;
