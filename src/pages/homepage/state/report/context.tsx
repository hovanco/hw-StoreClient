import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from 'react';
import { useSelector } from 'react-redux';
import { ITypeTime } from '../../../../helper/get-time';
import { IState } from '../../../../store/rootReducer';
import { IContextReport, ITimeReport } from './interface';
import reducerReport, { initialStateReport } from './reducer';
import types from './types';
import { getReportData } from './util';

const initialContext = {
    state: initialStateReport,
    dispatch: () => null,
};

const ContextReport = createContext<IContextReport>(initialContext);

interface Props {
    children: ReactNode;
}

const ProviderContextReport: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducerReport, initialStateReport);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <ContextReport.Provider value={value}>{children}</ContextReport.Provider>;
};

const useReport = () => {
    const store = useSelector((state: IState) => state.store.data);
    const value = useContext(ContextReport);
    const { state, dispatch } = value;

    const loadReport = useCallback(
        async ({ time }: { time: ITimeReport }) => {
            dispatch({ type: types.LOAD_REPORT });
            if (store._id) {
                try {
                    const { counts, revenues } = await getReportData({
                        storeId: store._id,
                        time,
                    });

                    return dispatch({
                        type: types.LOAD_REPORT_SUCCESS,
                        payload: {
                            counts,
                            revenues,
                        },
                    });
                } catch (error) {
                    return dispatch({
                        type: types.LOAD_REPORT_FAILED,
                    });
                }
            }

            return dispatch({
                type: types.LOAD_REPORT_FAILED,
            });
        },
        [dispatch, store._id]
    );

    const selectTypeTime = useCallback(
        (type: ITypeTime) => {
            dispatch({
                type: types.SELECT_TYPE_TIME,
                payload: type,
            });

            if (store._id) {
                loadReport({
                    time: {
                        value: state.time.value,
                        type,
                    },
                });
            }
        },
        [dispatch, loadReport, state.time.value, store._id]
    );

    const selectWareHouse = (warehouseId: string) => {
        dispatch({
            type: types.SELECT_WAREHOUSE,
            payload: warehouseId,
        });

        if (store._id) {
            loadReport({
                time: state.time,
            });
        }
    };

    return {
        ...state,
        loadReport,
        selectTypeTime,
        selectWareHouse,
    };
};

export { ProviderContextReport, useReport };
