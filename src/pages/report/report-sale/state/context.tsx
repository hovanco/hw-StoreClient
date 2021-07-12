import React, { createContext, FC, ReactNode, useContext, useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import reportApi from '../../../../api/report-api';
import { IState } from '../../../../store/rootReducer';
import { EFilter, ETab, IContext } from './interface';
import { initialState, reducer } from './reducer';
import types from './types';

const intialContext = {
    state: initialState,
    dispatch: () => {},
};

const ContextReportSale = createContext<IContext>(intialContext);

interface Props {
    children: ReactNode;
}

const ProviderReportSale: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <ContextReportSale.Provider value={value}>{children}</ContextReportSale.Provider>;
};

const useReportSale = () => {
    const store = useSelector((state: IState) => state.store.data);
    const value = useContext(ContextReportSale);

    const { state, dispatch } = value;

    const selectTab = (tab: ETab) => {
        dispatch({
            type: types.SELECT_TAB,
            payload: tab,
        });
    };

    const selectType = (type: string) => {
        dispatch({
            type: types.SELECT_FILTER,
            payload: type,
        });
    };

    const selectTimes = (times: { startTime: number; endTime: number }) => {
        dispatch({
            type: types.SELECT_TIMES,
            payload: times,
        });
    };

    const loadData = async ({
        tab,
        filter,
        startTime,
        endTime,
    }: {
        tab: ETab;
        filter: EFilter;
        startTime: number;
        endTime: number;
    }) => {
        let isLoadDatta = false;

        dispatch({
            type: types.LOADING,
        });

        isLoadDatta = isLoadDatta ? false : true;

        if (isLoadDatta) {
            try {
                const response = await reportApi.reportDetail({
                    type: tab,
                    storeId: store._id as string,
                    // startTime: 1601485200000,
                    // endTime: 1604163599999,
                    startTime,
                    endTime,
                    filter,
                });

                dispatch({
                    type: types.LOAD_DATA,
                    payload: response,
                });
            } catch {
                dispatch({
                    type: types.LOAD_DATA,
                    payload: [],
                });
            } finally {
                isLoadDatta = false;
            }
        }
    };

    return { ...state, selectTab, selectType, selectTimes, loadData };
};

export { ProviderReportSale, useReportSale };
