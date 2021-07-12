import React, { FC, useEffect, useState, useContext, createContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../../reducers/storeState/reducer';
import { storeAction } from '../../../reducers/storeState/action';

interface IFilter {
    search?: string;
    categoryId?: string;
    warehouseId: string;
    isVariant: boolean;
    brandId?: string;
    status?: string;
}

interface IPagination {
    page: number;
    limit: number;
    total?: number;
}

const initialFilter: IFilter = {
    search: undefined,
    categoryId: undefined,
    warehouseId: '',
    isVariant: true,
};

const initialPagination: IPagination = {
    page: 1,
    limit: 20,
    total: undefined,
};

const InventoryTableContext = createContext({
    filter: initialFilter,
    pagination: initialPagination,
    setFilter: (filter: any) => filter,
    setPagination: (pagination: any) => pagination,
    toggleRefeshData: false,
    setToggleRefreshData: (toggleRefeshData: any) => toggleRefeshData,
});

interface Props {
    children: JSX.Element;
}

export const InventoryTableProvider: FC<Props> = ({ children }) => {
    const [filter, setFilter] = useState<IFilter>(initialFilter);
    const [pagination, setPagination] = useState<IPagination>(initialPagination);
    const [toggleRefeshData, setToggleRefreshData] = useState<boolean>(false);

    const dispatch = useDispatch();

    const storeObj = useSelector(({ store }: { store: IStoreState }) => store.data);

    const product = useSelector(({ store }: { store: IStoreState }) => store.product);

    const getStocks = (storeId: string) => {
        dispatch(
            storeAction.getStocks({
                storeId: storeId,
                limit: pagination.limit,
                page: pagination.page,
                categoryId: filter.categoryId as string,
                search: filter.search as string,
                warehouseId: filter.warehouseId,
            })
        );
    };

    useEffect(() => {
        setFilter({ ...filter, warehouseId: storeObj.warehouseId as string });
        // eslint-disable-next-line
    }, [storeObj._id]);

    useEffect(() => {
        if (storeObj._id && filter.warehouseId) getStocks(storeObj._id as string);
        // eslint-disable-next-line
    }, [storeObj._id, pagination.page, pagination.limit, filter, toggleRefeshData]);

    useEffect(() => {
        if (pagination.total !== product.pagination.total)
            setPagination({ ...pagination, total: product.pagination.total });
        // eslint-disable-next-line
    }, [product.pagination]);

    const value = useMemo(
        () => ({
            filter,
            pagination,
            setFilter,
            setPagination,
            toggleRefeshData,
            setToggleRefreshData,
        }),
        [filter, pagination, setFilter, setPagination, toggleRefeshData, setToggleRefreshData]
    );

    return (
        <InventoryTableContext.Provider value={value}>{children}</InventoryTableContext.Provider>
    );
};

export const useInventoryTable = () => {
    const {
        filter,
        pagination,
        setFilter,
        setPagination,
        setToggleRefreshData,
        toggleRefeshData,
    } = useContext(InventoryTableContext);

    const pageChange = (page: number) => setPagination({ ...pagination, page });

    const searchChange = (search: string) => setFilter({ ...filter, search });

    const warehouseChange = (warehouseId: string) => setFilter({ ...filter, warehouseId });

    const refreshData = () => setToggleRefreshData(!toggleRefeshData);

    const advanceFilterChange = ({
        status,
        categoryId,
        brandId,
    }: {
        status?: string;
        categoryId?: string;
        brandId?: string;
    }) => {
        setFilter({ ...filter, status, categoryId, brandId });
    };

    return {
        filter,
        pagination,
        pageChange,
        searchChange,
        warehouseChange,
        advanceFilterChange,
        refreshData,
    };
};
