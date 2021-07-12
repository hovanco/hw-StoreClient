import React, {
    createContext,
    useEffect,
    FC,
    ReactNode,
    useMemo,
    useReducer,
    useContext,
    useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productApi from '../../../../api/product-api';
import { IContext } from './inteface';
import { initialState, reducer } from './reducer';
import * as types from './types';
import { get } from 'lodash';
import { storeAction } from '../../../../reducers/storeState/action';
import { IState } from '../../../../store/rootReducer';
import { useParams } from 'react-router-dom';
import { IProductDetailParams } from '../../interface';
import { IProduct } from '../../../../models';

interface Props {
    children: ReactNode;
}

const initialContext = {
    state: initialState,
    dispatch: () => {},
    loadProduct: () => {},
};
const Context = createContext<IContext>(initialContext);

const ProviderProductDetail: FC<Props> = ({ children }) => {
    const params = useParams<IProductDetailParams>();
    const [state, dispatch] = useReducer(reducer, initialState);

    const storeObj = useSelector((state: IState) => state.store.data);

    const dispatchRedux = useDispatch();

    const loadProduct = useCallback(
        async ({ storeId, productId }: { storeId: string; productId: string }) => {
            try {
                dispatch({ type: types.LOADING });

                const productResponse = await productApi.getProduct({
                    storeId,
                    productId,
                });

                await dispatch({
                    type: types.LOAD_PRODUCT_SUCCESS,
                    payload: productResponse,
                });

                await dispatchRedux(storeAction.getAttributes(storeId));

                const attributes = get(productResponse, 'attributes');
                const hasAttributes = !!attributes && attributes.length > 0;

                const paramsGetStocks = hasAttributes
                    ? { storeId, parentId: productId }
                    : { storeId, productId };

                await dispatchRedux(storeAction.getStocks(paramsGetStocks));
            } catch (error) {
                dispatch({
                    type: types.LOAD_PRODUCT_ERROR,
                });
            }
        },
        []
    );

    useEffect(() => {
        if (storeObj._id) {
            loadProduct({
                storeId: storeObj._id,
                productId: params.productId,
            });
            dispatchRedux(storeAction.getAttributes(storeObj._id));
            dispatchRedux(
                storeAction.getStocks({
                    storeId: storeObj._id,
                    parentId: params.productId,
                })
            );
        }
        // eslint-disable-next-line
    }, [storeObj._id]);

    const value = useMemo(() => ({ state, loadProduct, dispatch }), [state, loadProduct, dispatch]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useProductDetail = () => {
    const { state, loadProduct, dispatch } = useContext(Context);

    const updateProduct = (product: IProduct) => {
        dispatch({
            type: types.UPDATE_PRODUCT,
            payload: product,
        });
    };

    const setLoading = (value: boolean) => {
        dispatch({
            type: types.SET_LOADING,
            payload: value,
        });
    };

    return {
        ...state,
        loadProduct,
        updateProduct,
        setLoading,
    };
};

export { ProviderProductDetail, useProductDetail };
