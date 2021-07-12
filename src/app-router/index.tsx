import { ConnectedRouter } from 'connected-react-router';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Loading } from '../components';
import CreateStore from '../pages/create-store';
import { history } from '../store';
import { IState } from '../store/rootReducer';
import { useProgressAuth } from './use-progress-auth';

const AuthPage = lazy(() => import('../pages/auth-page/AuthPage'));
const Dashboard = lazy(() => import('../pages/dashboard'));


function AppRouter() {
    const store = useSelector((state: IState) => state.store.data);
    const { loading, isAuth, progress } = useProgressAuth();

    if ((loading && isAuth) || progress) {
        return <Loading full />;
    }

    return (
        <Router forceRefresh={true}>
            <Suspense fallback={<Loading full />}>
                <ConnectedRouter history={history}>
                    <Route
                        render={() => {
                            if (isAuth) {
                                if (!store._id) return <CreateStore />;

                                return <Dashboard />;
                            }

                            return <AuthPage />;
                        }}
                        path='/'
                    />
                </ConnectedRouter>
            </Suspense>
        </Router>
    );
}

export default AppRouter;
