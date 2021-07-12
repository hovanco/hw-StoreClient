import React, { createContext, FC, ReactNode, useContext, useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import reportApi from '../../../../api/report-api';
import { IState } from '../../../../store/rootReducer';
import { EFilter, IContext } from './interface';
import { initalState, reducer } from './reducer';
import types from './types';

const intialContext = {
    state: initalState,
    dispatch: () => {},
};
const ContextReportCustomer = createContext<IContext>(intialContext);

interface Props {
    children: ReactNode;
}

const ProviderReportCustomer: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <ContextReportCustomer.Provider value={value}>{children}</ContextReportCustomer.Provider>
    );
};

const useCustomerReport = () => {
    const store = useSelector((state: IState) => state.store.data);
    const value = useContext(ContextReportCustomer);

    const { state, dispatch } = value;

    const loadData = async ({
        filter,
        startTime,
        endTime,
    }: {
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
                    type: 'customer',
                    storeId: store._id as string,
                    // startTime: 1601485200000,
                    // endTime: 1604163599999,
                    startTime,
                    endTime,
                    filter,
                });

                dispatch({
                    type: types.LOAD_DATA_REPORT_CUSTOMER,
                    payload: response,
                });
            } catch {
                dispatch({
                    type: types.LOAD_DATA_REPORT_CUSTOMER,
                    payload: [],
                });
            } finally {
                isLoadDatta = false;
            }
        }
    };

    const changeTime = (times: { startTime: number; endTime: number }) => {
        dispatch({
            type: types.CHANGE_TIME,
            payload: times,
        });
    };

    const selectFilter = (filter: EFilter) => {
        dispatch({
            type: types.SELECT_TYPE,
            payload: filter,
        });
    };

    return {
        ...state,
        selectFilter,
        loadData,
        changeTime,
    };
};

export { ProviderReportCustomer, useCustomerReport };
