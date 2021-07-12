import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { onApiUnauthenticated } from '../middleware/auth';
import rootReducer from './rootReducer';

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [routerMiddleware(history), thunk, onApiUnauthenticated];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    stateReconciler: autoMergeLevel2,
    transforms: [createWhitelistFilter('auth', ['isAuth', 'token', 'user'])],
};

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension =
        (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(persistedReducer, composedEnhancers);

export const persistor = persistStore(store);

export default store;
