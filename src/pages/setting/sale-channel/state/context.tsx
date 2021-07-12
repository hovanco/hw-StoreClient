import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { useSelector } from 'react-redux';
import { Loading } from '../../../../components';
import { SALE_CHANNEL_DATA } from '../../../../constants/sale-channels';
import { IStoreState } from '../../../../reducers/storeState/reducer';
import { IState } from '../../../../store/rootReducer';
import * as types from './types';
import { IContext } from './interface';
import { initialState, reducer } from './reducer';

const initialContext = {
    state: initialState,
    dispatch: () => {},
};

const Context = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
}

const ProviderSaleChannel: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const store = useSelector((state: IState) => state.store.data);
    const loading = useSelector((state: IState) => state.store.loadingStore);
    const enableSaleChannels = useSelector(
        ({ store }: { store: IStoreState }) => store.enableSaleChannels
    );

    useEffect(() => {
        if (store._id) {
            dispatch({
                type: types.LOADING,
            });

            const saleChannels = SALE_CHANNEL_DATA.filter((item) =>
                enableSaleChannels.includes(item.id)
            ).map((item) => {
                const existChannel = (store?.saleChannels || []).includes(item.id);
                if (existChannel) {
                    return {
                        ...item,
                        used: true,
                    };
                }

                return item;
            });

            dispatch({
                type: types.LOAD_DONE,
                payload: saleChannels,
            });
        }
    }, [store._id, store.saleChannels, enableSaleChannels]);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    if (state.loading || loading) {
        return <Loading full />;
    }

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useSaleChannel = () => {
    const { state } = useContext(Context);

    return { ...state };
};

export { ProviderSaleChannel, useSaleChannel };
