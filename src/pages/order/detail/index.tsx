import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import orderApi from '../../../api/order-api';
import { Loading } from '../../../components';
import { IOrder } from '../../../models';
import { IState } from '../../../store/rootReducer';
import NoOrder from '../components/no-order';
import ProviderNewOrderContext from '../create/state/context';
import { EStatusPage } from '../create/state/interface';
import OrderDetailContent from './order-detail-content';
import { ProviderDetailOrder } from './state/context';

const { getOrderDetail } = orderApi;

interface IParams {
    id: string;
}

export const useOrder = () => {
    const params = useParams<IParams>();
    const store = useSelector((state: IState) => state.store.data);

    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<IOrder>();

    const loadOrder = useCallback(async (orderId: string): Promise<any> => {
        try {
            setLoading(true);
            const response = await getOrderDetail({
                storeId: store._id as string,
                orderId,
            });

            setOrder(response);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (params.id) {
            loadOrder(params.id);
        } else {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, []);

    const value = useMemo(() => ({ loading, loadOrder, order }), [loading, loadOrder, order]);

    return value;
};

const OrderDetail = () => {
    const { loading, order, loadOrder } = useOrder();

    if (loading) return <Loading full />;

    if (!order) return <NoOrder />;

    return (
        <ProviderNewOrderContext order={order} statusPage={EStatusPage.DETAIL}>
            <ProviderDetailOrder loadOrder={loadOrder}>
                <OrderDetailContent />;
            </ProviderDetailOrder>
        </ProviderNewOrderContext>
    );
};

export default OrderDetail;
