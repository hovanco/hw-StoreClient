import React from 'react';
import '../style.less';
import Orders from './orders';
import OrderContextProvider from './state/context';

function OrderPage() {
    return (
        <OrderContextProvider>
            <Orders />
        </OrderContextProvider>
    );
}

export default OrderPage;
