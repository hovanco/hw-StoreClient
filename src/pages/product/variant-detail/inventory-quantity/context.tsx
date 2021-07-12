import React, { FC, useState, useEffect, createContext, useMemo } from 'react';
import { IWarehouse } from '../../../../models';
import { FormInstance } from 'antd/lib/form/Form';

import { find } from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IState } from '../../../../store/rootReducer';
import { storeAction } from '../../../../reducers/storeState/action';
import { IEditStock } from '../../interface';

interface IFilter {
    search?: string;
}

interface IParam {
    variantId: string;
    productId: string;
}

const inititalStocks: IEditStock[] = [];
const inititalFilter: IFilter = {};
const initialPage: number = 1;
const initialWarehouses: IWarehouse[] = [];

export const InventoryContext = createContext({
    stocks: inititalStocks,
    filter: inititalFilter,
    page: initialPage,
    warehouses: initialWarehouses,
    setStocks: (stocks: any) => stocks,
    setFilter: (filter: any) => filter,
    setPage: (page: any) => page,
    setWarehouses: (warehouses: any) => warehouses,
});

interface Props {
    children: React.ReactNode;
    form: FormInstance;
}

export const IventoryContextProvider: FC<Props> = ({ children, form }) => {
    const [stocks, setStocks] = useState<IEditStock[]>(inititalStocks);
    const [filter, setFilter] = useState<IFilter>(inititalFilter);
    const [page, setPage] = useState<number>(initialPage);
    const [warehouses, setWarehouses] = useState<IWarehouse[]>(initialWarehouses);

    const storeObj = useSelector((state: IState) => state.store.data);
    const warehousesArr = useSelector((state: IState) => state.store.warehouses);
    const stocksObj = useSelector((state: IState) => state.store.stocks);
    const dispatch = useDispatch();

    const params = useParams<IParam>();

    useEffect(() => {
        dispatch(
            storeAction.getStocks({
                storeId: storeObj._id as string,
                productId: params?.variantId,
            })
        );
        // eslint-disable-next-line
    }, [params?.variantId, storeObj._id]);

    useEffect(() => {
        setWarehouses(warehousesArr);
    }, [warehousesArr]);

    useEffect(() => {
        let warehousesIds: string[] = warehouses.map((item: IWarehouse) => item._id as string);

        let newStocks = warehousesIds.map((warehouseId: string) => {
            let stock = find(stocksObj.data, ['warehouseId', warehouseId]);

            if (stock) return stock;

            return {
                productId: params?.variantId,
                warehouseId: warehouseId,
                quantity: 0,
                _id: warehouseId,
            };
        });

        setStocks(newStocks);
        // eslint-disable-next-line
    }, [warehouses, stocksObj.data]);

    useEffect(() => {
        let updatedStocks = stocks.filter((item: IEditStock) => {
            if (item._id === item.warehouseId && item.quantity === 0) return false;

            if (find(stocksObj.data, ['_id', item._id])?.quantity === item.quantity) return false;

            return true;
        });

        form.setFieldsValue({ stocks: updatedStocks });
        // eslint-disable-next-line
    }, [stocks]);

    const value = useMemo(
        () => ({
            stocks,
            filter,
            page,
            warehouses,
            setStocks,
            setFilter,
            setPage,
            setWarehouses,
        }),
        [stocks, filter, page, warehouses, setStocks, setFilter, setPage, setWarehouses]
    );

    return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};
