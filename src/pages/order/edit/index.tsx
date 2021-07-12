import React from 'react';
import { Loading } from '../../../components';
import NoOrder from '../components/no-order';
import ProviderOrderNewContext from '../create/state/context';
import { EStatusPage } from '../create/state/interface';
import { useOrder } from '../detail';
import EditOrderContent from './edit-order-content';

const EditOrder = () => {
    const { order, loading } = useOrder();

    if (loading) return <Loading full />;

    if (!order) return <NoOrder />;

    return (
        <ProviderOrderNewContext order={order} statusPage={EStatusPage.EDIT}>
            <EditOrderContent />
        </ProviderOrderNewContext>
    );
};

export default EditOrder;
