import { useCallback, useContext } from 'react';

import { IStock } from '../../../models';

import { ProductContext } from './context';
import types from './type';

const useStock = () => {
    const { state, dispatch } = useContext(ProductContext);

    const setStocks = useCallback((stocks: IStock[]) => {
        dispatch({
            type: types.SET_STOCKS,
            payload: stocks,
        });

        // eslint-disable-next-line
    }, []);

    return {
        stocks: state.stocks,
        setStocks,
    };
};

export default useStock;
