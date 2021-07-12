import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { useSelector } from 'react-redux';
import staffsApi from '../../../../api/staff-api';
import { Loading } from '../../../../components';
import { IStaff } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import { IContext } from './interface';
import { initialState, reducer } from './reducer';
import * as types from './types';

const initialContext = {
    state: initialState,
    dispatch: () => {},
    loadStaffs: () => {},
};

const Context = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
}

const ProviderAccount: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const store = useSelector((state: IState) => state.store.data);

    const loadStaffs = useCallback(async (storeId: string) => {
        try {
            dispatch({
                type: types.LOADING,
            });
            const response = await staffsApi.getStaffs(storeId);

            dispatch({
                type: types.LOAD_DONE,
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: types.LOADING,
            });
        }
    }, []);

    useEffect(() => {
        if (store._id) {
            loadStaffs(store._id);
        }
    }, [store]);

    const value = useMemo(() => ({ state, dispatch, loadStaffs }), [state, dispatch, loadStaffs]);

    if (state.loading) {
        return <Loading full />;
    }

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useStaffs = () => {
    const { state, dispatch, loadStaffs } = useContext(Context);

    const setListStaffs = (staffs: IStaff[]) => {
        dispatch({
            type: types.LOAD_DONE,
            payload: staffs,
        });
    };

    const addStaff = (staff: IStaff) => {
        dispatch({
            type: types.ADD_STAFF,
            payload: staff,
        });
    };

    const removeStaff = (staff: IStaff) => {
        dispatch({
            type: types.REMOVE_STAFF,
            payload: staff,
        });
    };

    return { ...state, setListStaffs, addStaff, removeStaff, loadStaffs };
};

export { ProviderAccount, useStaffs };
