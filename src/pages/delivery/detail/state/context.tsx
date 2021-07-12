import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import orderApi from '../../../../api/order-api';
import { Loading } from '../../../../components';
import { IOrder } from '../../../../models';
import { IState } from '../../../../store/rootReducer';

interface IContext {
    loading: boolean;
    order?: IOrder;
    setOrder: React.Dispatch<any>;
}

const Context = createContext<IContext>({
    loading: true,
    order: undefined,
    setOrder: () => {},
});

interface Props {
    children: ReactNode;
}
interface IParams {
    id?: string;
}

const ProviderDeliveryDetail: FC<Props> = ({ children }) => {
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<IOrder>();
    const params = useParams<IParams>();

    const loadOrder = useCallback(
        async (orderId: string) => {
            try {
                setLoading(true);
                const response = await orderApi.getOrderDetail({
                    storeId: store._id as string,
                    orderId,
                });

                setOrder(response);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        },
        [store._id]
    );

    useEffect(() => {
        if (params.id) {
            loadOrder(params.id);
        }
    }, []);

    const value = useMemo(() => ({ order, loading, setOrder }), [order, loading, setOrder]);

    if (loading) {
        return <Loading full />;
    }

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useDeliveryDetail = () => {
    const value = useContext(Context);
    return {
        ...value,
    };
};

export { ProviderDeliveryDetail, useDeliveryDetail };
