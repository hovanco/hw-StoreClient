import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Loading } from '../../components';
import DashboardLayout from '../../layout/dashboard-layout';
import { IState } from '../../store/rootReducer';
import CreateStore from '../create-store';
import NotFound from '../not-found';
import ProviderBillingContext from '../setting/create-billing/state/context';

const CustomerPage = lazy(() => import('../customer'));
const DeliveryPage = lazy(() => import('../delivery'));
const InventoryPage = lazy(() => import('../inventory'));
const OrderPage = lazy(() => import('../order'));
const ProductPage = lazy(() => import('../product'));
const ReportPage = lazy(() => import('../report'));
const SupplierPage = lazy(() => import('../suppiler'));
const WarehousePage = lazy(() => import('../warehouse'));
const Homepage = lazy(() => import('../homepage'));
const SaleChannelPage = lazy(() => import('../sale-channel'));
const SettingProfilePage = lazy(() => import('../setting-profile'));
const SettingPage = lazy(() => import('../setting'));

interface Props {}

const Dashboard = (props: Props) => {
    const store = useSelector((state: IState) => state.store.data);
    const loading = useSelector((state: IState) => state.store.loadingStore);

    if (loading) return <Loading full />;

    if (!store._id) {
        return <CreateStore />;
    }

    return (
        <ProviderBillingContext>
            <DashboardLayout>
                <Suspense fallback={<Loading full />}>
                    <Switch>
                        <Route component={Homepage} path="/" exact />
                        <Route path="/orders">
                            <OrderPage />
                        </Route>
                        <Route path="/delivery">
                            <DeliveryPage />
                        </Route>
                        <Route path="/customers">
                            <CustomerPage />
                        </Route>
                        <Route path="/products">
                            <ProductPage />
                        </Route>
                        <Route path="/inventory">
                            <InventoryPage />
                        </Route>
                        <Route path="/supplier">
                            <SupplierPage />
                        </Route>
                        <Route path="/warehouse">
                            <WarehousePage />
                        </Route>
                        <Route path="/reports">
                            <ReportPage />
                        </Route>
                        <Route path="/sale-channel">
                            <SaleChannelPage />
                        </Route>
                        <Route path="/setting-profile">
                            <SettingProfilePage />
                        </Route>
                        <Route path="/setting">
                            <SettingPage />
                        </Route>

                        <Redirect from="/create-store" to="/" />

                        <Route render={() => <Redirect to="/" />} path="/login" />
                        <Route render={() => <Redirect to="/" />} path="/signup" />
                        <Route render={() => <Redirect to="/" />} path="/forgot-password" />
                        <Route render={() => <Redirect to="/" />} path="/save-token" />

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </DashboardLayout>
        </ProviderBillingContext>
    );
};

export default Dashboard;
