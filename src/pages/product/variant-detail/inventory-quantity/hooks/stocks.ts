import { useContext } from 'react';
import { InventoryContext } from '../context';
import { IStock } from '../../../../../models';

export const useStocks = () => {
    const { stocks, page, filter, setStocks, setFilter, setPage } = useContext(InventoryContext);

    const quantityChange = ({ _id, quantity }: { _id: string; quantity: number }) => {
        let newStocks = stocks.map((item: IStock) => {
            if (item._id === _id) return { ...item, quantity };

            return item;
        });

        setStocks(newStocks);
    };

    return {
        stocks,
        page,
        filter,
        setStocks,
        setFilter,
        setPage,
        quantityChange,
    };
};
