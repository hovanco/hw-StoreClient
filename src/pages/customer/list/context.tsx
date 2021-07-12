import { compact, get } from 'lodash';
import * as queryString from 'query-string';
import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Gender } from '../../../constants/gender';
import { SaleChannelId } from '../../../models';
import { storeAction } from '../../../reducers/storeState/action';
import { IStoreState } from '../../../reducers/storeState/reducer';

export interface IPagination {
    page: number;
    limit: number;
    total: number;
    sort: string;
    direction: string;
}

export interface IFilter {
    search?: string;
    source?: SaleChannelId;
    dateOfBirth?: {
        value: string;
        filterDateBy: string;
    };
    createdAt?: number[];
    fromAt?: number;
    toAt?: number;
    gender?: Gender;
}

const KEYS_FILTER: string[] = ['search', 'source', 'dateOfBirth', 'gender', 'fromAt', 'toAt'];
const INITIAL_FILTER: IFilter = {};

const initialPagination: IPagination = {
    page: 1,
    limit: 20,
    total: 0,
    sort: 'createdAt',
    direction: 'desc',
};

const CustomerTableContext = createContext({
    filter: INITIAL_FILTER,
    pagination: initialPagination,
    setFilter: (filter: any) => filter,
    setPagination: (pagination: any) => pagination,
    getCustomers: () => {},
});

export const CustomerTableProvider: FC<{ children: JSX.Element }> = ({ children }) => {
    const location = useLocation();
    const [progress, setProgress] = useState<boolean>(true);
    const [filter, setFilter] = useState<IFilter>(INITIAL_FILTER);
    const [pagination, setPagination] = useState<IPagination>(initialPagination);

    const { data: storeObj } = useSelector(({ store }: { store: IStoreState }) => store);

    const dispatch = useDispatch();

    const getCustomers = useCallback(() => {
        if (storeObj._id) {
            dispatch(
                storeAction.getCustomers({
                    storeId: storeObj._id,
                    // pagination
                    limit: pagination.limit,
                    page: Number(pagination.page),
                    sort: pagination.sort,
                    direction: pagination.direction,
                    // filter
                    source: filter.source,
                    search: filter.search,
                    dateOfBirth: filter.dateOfBirth?.value,
                    filterDateBy: filter.dateOfBirth?.filterDateBy,
                    fromAt: filter.fromAt,
                    toAt: filter.toAt,
                    gender: filter.gender,
                })
            );
        }

        // eslint-disable-next-line
    }, [storeObj._id, pagination, filter]);

    useEffect(() => {
        const searchObj = queryString.parse(location.search);

        let searchObjFilter = {};

        Object.keys(searchObj).forEach((key: string) => {
            if (KEYS_FILTER.includes(key)) {
                searchObjFilter = {
                    ...searchObjFilter,
                    [key]: searchObj[key],
                };
            }

            if (key === 'page') {
                setPagination({ ...pagination, page: Number(searchObj[key]) || 1 });
            }
        });

        const startDate = get(searchObj, 'fromAt');
        const endDate = get(searchObj, 'toAt');

        const dateOfBirth = get(searchObj, 'dateOfBirth');
        const filterDateBy = get(searchObj, 'filterDateBy');

        searchObjFilter = {
            ...searchObjFilter,
            createdAt:
                compact([startDate, endDate]).length === 2
                    ? compact([startDate, endDate])
                    : undefined,
            dateOfBirth: dateOfBirth ? {
                value: dateOfBirth,
                filterDateBy
            } : undefined,
        };

        setFilter(searchObjFilter);
        setProgress(false);
    }, [location]);

    useEffect(() => {
        if (storeObj._id && !progress) {
            getCustomers();
        }
        // eslint-disable-next-line
    }, [
        storeObj._id,
        pagination.page,
        pagination.limit,
        pagination.sort,
        pagination.direction,
        filter,
        progress,
    ]);

    const value = useMemo(
        () => ({
            filter,
            pagination,
            setFilter,
            setPagination,
            getCustomers,
        }),
        [filter, pagination, setFilter, setPagination, getCustomers]
    );

    return <CustomerTableContext.Provider value={value}>{children}</CustomerTableContext.Provider>;
};

export const useCustomerTable = () => {
    const location = useLocation();
    const history = useHistory();
    const { filter, pagination, setFilter, setPagination, getCustomers } = useContext(
        CustomerTableContext
    );

    const selectFilterSource = (source: string | undefined) => {
        const paramsObj = {
            page: 1,
            ...filter,
            dateOfBirth: filter.dateOfBirth?.value,
            filterDateBy: filter.dateOfBirth?.filterDateBy,
            source,
        };

        const searchString = queryString.stringify(paramsObj);

        history.push({
            pathname: location.pathname,
            search: searchString,
        });

        setFilter({ ...filter, source });
        setPagination({ ...pagination, page: 1 });
    };

    const changePagination = (newPagination: any) => {
        const paramsObj = {
            page: newPagination.page,
            ...filter,
            dateOfBirth: filter.dateOfBirth?.value,
            filterDateBy: filter.dateOfBirth?.filterDateBy,
        };

        const searchString = queryString.stringify(paramsObj);

        history.push({
            pathname: location.pathname,
            search: searchString,
        });

        setPagination({ ...pagination, ...newPagination } as IPagination);
    };

    const changeFilterSearch = (search: string) => {
        setFilter({ ...filter, search });
        setPagination({ ...pagination, page: 1 });
    };

    const advanceFilterChange = (advanceFilterProperties: any) => {
        setFilter({ ...filter, ...advanceFilterProperties });
        setPagination({ ...pagination, page: 1 });
    };

    const removeFilterByKey = (filterKey: string) => {
        const searchObj = queryString.parse(location.search);

        let searchObjFilter = {};

        Object.keys(searchObj).forEach((key: string) => {
            if (filterKey !== key) {
                searchObjFilter = {
                    ...searchObjFilter,
                    [key]: searchObj[key],
                };
            }
        });

        if (filterKey === 'createdAt') {
            searchObjFilter = {
                ...searchObjFilter,
                fromAt: undefined,
                toAt: undefined,
            };
        }

        if (filterKey === 'dateOfBirth') {
            searchObjFilter = {
                ...searchObjFilter,
                dateOfBirth: undefined,
                filterDateBy: undefined,
            };
        }

        const searchString = queryString.stringify({ ...searchObjFilter, page: 1 });

        history.push({
            pathname: location.pathname,
            search: searchString,
        });
    };

    return {
        filter,
        pagination,
        selectFilterSource,
        changePagination,
        changeFilterSearch,
        advanceFilterChange,
        removeFilterByKey,
        getCustomers,
    };
};
