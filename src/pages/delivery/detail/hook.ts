import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import orderApi from '../../../api/order-api';
import { IOrder } from '../../../models';
import { IState } from '../../../store/rootReducer';

interface IParams {
    id?: string;
}

const useOrder = (): { loading: boolean; order?: IOrder; loadOrder: Function } => {
    const store = useSelector((state: IState) => state.store.data);
    const params = useParams<IParams>();
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<IOrder>();

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

    const value = useMemo(() => ({ loading, order, loadOrder }), [loading, order, loadOrder]);

    return value;
};

export { useOrder };
