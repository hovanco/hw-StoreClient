import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer, { IStorageState } from '../reducers/authState/authReducer';
import globalReducer, { IGlobalState } from '../reducers/globalState/globalReducer';
import storeReducer, { IStoreState } from '../reducers/storeState/reducer';

export interface IState {
    store: IStoreState;
    global: IGlobalState;
    auth: IStorageState;
}

const rootReducer = (history: any): Reducer =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        global: globalReducer,
        store: storeReducer,
    });

export default rootReducer;
