import * as queryString from 'query-string';
import React, {
    useEffect,
    createContext,
    FC,
    ReactNode,
    useContext,
    useMemo,
    useReducer,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Loading } from '../../../../components';
import { storeAction } from '../../../../reducers/storeState/action';
import { IState } from '../../../../store/rootReducer';
import { IContextOrders } from './interface';
import reducer, { initialState } from './reducer';
import types from './types';

const initalContext = {
    state: initialState,
    dispatch: () => null,
};

const OrdersContext = createContext<IContextOrders>(initalContext);

interface Props {
    children: ReactNode;
}

const FILTER_ARRAY = ['search', 'page', 'limit', 'status', 'source', 'serviceId', 'deliveryDate'];

const OrderContextProvider: FC<Props> = ({ children }) => {
    const location = useLocation();
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { status, search, page, source, serviceId, deliveryDate, limit, progress } = state;

    useEffect(() => {
        const searchQuery = queryString.parse(location.search);
        let filter = {};

        Object.keys(searchQuery).forEach((key: string) => {
            if (FILTER_ARRAY.includes(key)) {
                filter = {
                    ...filter,
                    [key]: searchQuery[key],
                };
            }
        });

        dispatch({
            type: types.RELOAD_FILTER,
            payload: filter,
        });
    }, []);

    useEffect(() => {
        if (!progress) {
            const searchString = queryString.stringify({
                status,
                search: search && search.length > 0 ? search : undefined,
                page,
                source,
                limit,
                serviceId,
                deliveryDate,
            });

            history.push({
                pathname: location.pathname,
                search: searchString,
            });
        }
    }, [status, search, page, source, serviceId, deliveryDate, limit, progress]);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    if (progress) {
        return <Loading full />;
    }

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

const statusFormat = (status?: string) => (status ? Number(status) : undefined);
const serviceIdFormat = (serviceId?: string) => (serviceId ? Number(serviceId) : undefined);

export const useOrdersContext = () => {
    const dispatchGlobal = useDispatch();
    const storeObj = useSelector((state: IState) => state.store.data);
    const value = useContext(OrdersContext);

    const { state, dispatch } = value;

    const changeTextSearch = (text: string) => {
        dispatch({
            type: types.CHANGE_TEXT_SEARCH,
            payload: text,
        });
    };

    const changeStatus = async (status?: string) => {
        await dispatch({
            type: types.CHANGE_STATUS,
            payload: status,
        });
    };

    const changeFilter = ({
        source,
        serviceId,
        deliveryDate,
    }: {
        source?: string;
        serviceId?: string;
        deliveryDate?: number;
    }) => {
        dispatch({
            type: types.CHANGE_FILTER,
            payload: {
                source,
                serviceId,
                deliveryDate,
            },
        });
    };

    const removeFilter = (value: string) => {
        dispatch({
            type: types.REMOVE_FILTER,
            payload: value,
        });
    };

    const changePagination = ({ page, limit }: { page: number; limit: number }) => {
        dispatch({
            type: types.CHANGE_PAGINATION,
            payload: { page, limit },
        });
    };

    const fetchDataCallback = ({
        limit,
        page,
        status,
        source,
        serviceId,
        search,
        soft = 'createdAt',
        direction = 'desc',
        deliveryDate,
    }: {
        limit?: number;
        page?: number;
        status?: string;
        source?: string;
        serviceId?: string;
        search?: string;
        soft?: string;
        direction?: 'desc' | 'asc';
        deliveryDate?: number;
    }) => {
        if (storeObj._id) {
            window.scrollTo(0, 0);
            return dispatchGlobal(
                storeAction.getOrders({
                    id: storeObj._id,
                    limit: limit || state.limit,
                    page: page || 1,
                    status: statusFormat(status),
                    source,
                    serviceId: serviceIdFormat(serviceId),
                    search: search !== undefined ? search : state.search,
                    soft,
                    direction,
                    deliveryDate,
                })
            );
        }

        return;
    };

    return {
        ...state,
        changeTextSearch,
        changeStatus,
        changePagination,
        fetchDataCallback,
        changeFilter,
        removeFilter,
    };
};

export default OrderContextProvider;
