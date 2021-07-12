import { get, pick } from 'lodash';
import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { EDeliveryServiceIds, ICustomer, IOrder } from '../../../../models';
import { IContext, IInfoDelivery, IProductState, EShipTypes, EStatusPage } from './interface';
import reducer, { initialReducer } from './reducer';
import types from './types';

const initialContext = {
    order: undefined,
    statusPage: undefined,
    state: initialReducer,
    dispatch: () => {},
};

const OrderNewContext = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
    order?: IOrder;
    statusPage?: EStatusPage;
}

const ProviderOrderNewContext: FC<Props> = ({ children, order, statusPage = EStatusPage.NEW }) => {
    const [state, dispatch] = useReducer(reducer, initialReducer);

    const value = useMemo(() => ({ state, dispatch, order, statusPage }), [
        state,
        order,
        statusPage,
    ]);

    useEffect(() => {
        if (order) {
            const products = (order.products || []).map((product: any) => ({
                ...product.productId,
                price: product.price,
                count: product.count,
            }));

            const infoDelivery = pick(order.customer, [
                'name',
                'phoneNo',
                'address',
                'ward',
                'wardName',
                'district',
                'districtName',
                'province',
                'provinceName',
            ]);

            const shipType = [EDeliveryServiceIds.GHN, EDeliveryServiceIds.GHTK].includes(
                get(order, 'deliveryOptions.serviceId')
            )
                ? EShipTypes.SendShipping
                : EShipTypes.SelfTransport;

            const shipmentFee = get(order, 'deliveryOptions.shipmentFee');
            const shipmentFeeForCustomer = get(order, 'deliveryOptions.shipmentFeeForCustomer');

            const discountBy = get(order, 'deliveryOptions.discountBy');
            const discount = get(order, 'deliveryOptions.discount');
            const noteForDelivery = get(order, 'deliveryOptions.noteForDelivery');
            const customerNote = get(order, 'deliveryOptions.customerNote');
            const source = get(order, 'source');

            const initialState = {
                products,
                customer: order.customer,
                infoDelivery,
                shipType,
                warehouseId: get(order, 'warehouseId._id'),
                shipmentFee,
                shipmentFeeForCustomer,
                discountBy,
                discount,
                noteForDelivery,
                customerNote,
                ship: undefined,
                source,
                paymentType: order.paymentType,
                paymentMethod: order.paymentMethod,
            };

            dispatch({
                type: types.INIT_STATE,
                payload: initialState,
            });
        }

        // eslint-disable-next-line
    }, []);

    return <OrderNewContext.Provider value={value}>{children}</OrderNewContext.Provider>;
};

const useOrderNew = () => {
    const value = useContext(OrderNewContext);

    const { state, dispatch, order, statusPage } = value;

    const updateOrder = (order: IOrder) => {
        dispatch({
            types: types.UPDATE_ORDER,
            payload: order,
        });
    };

    const addProducts = (products: IProductState[]) => {
        dispatch({
            type: types.ADD_PRODUCTS,
            payload: products,
        });
    };

    const selectProduct = (product: IProductState) => {
        dispatch({
            type: types.ADD_PRODUCT,
            payload: { ...product, count: 1 },
        });
    };

    const removeProduct = (productId: string) => {
        dispatch({
            type: types.REMOVE_PRODUCT,
            payload: productId,
        });
    };

    const updateCount = (product: IProductState) => {
        dispatch({
            type: types.UPDATE_COUNT_PRODUCT,
            payload: product,
        });
    };

    const selectCustomer = (customer: ICustomer) => {
        dispatch({
            type: types.ADD_CUSTOMER,
            payload: customer,
        });
    };

    const removeCustomer = () => {
        dispatch({
            type: types.REMOVE_CUSTOMER,
        });
    };

    const updateInfoDelivery = (infoDelivery: IInfoDelivery) => {
        dispatch({
            type: types.UPDATE_INFO_DELIVERY,
            payload: infoDelivery,
        });
    };

    const changeShipType = (shipType: EShipTypes) => {
        dispatch({
            type: types.CHANGE_SHIP_TYPE,
            payload: shipType,
        });
    };

    const selectWarehouse = (warehouseId: string) => {
        dispatch({
            type: types.CHANGE_WAREHOUSE,
            payload: warehouseId,
        });
    };

    const changeValueField = (data: { field: string; value: any }) => {
        dispatch({
            type: types.CHANGE_VALUE_FIELD,
            payload: data,
        });
    };

    const selectShip = (ship: any) => {
        dispatch({
            type: types.CHANGE_SHIP,
            payload: ship,
        });
    };

    const resetOrder = () => {
        dispatch({
            type: types.RESET_NEW_ORDER,
        });
    };

    const changeDelivery = () => {
        dispatch({
            type: types.CHANGE_DELIVERY,
        });
    };

    const initOrderState = (data: any) => {
        dispatch({
            type: types.INIT_STATE,
            payload: data,
        });
    };

    return {
        ...state,
        order,
        statusPage,
        selectProduct,
        addProducts,
        removeProduct,
        updateCount,
        selectCustomer,
        removeCustomer,
        updateInfoDelivery,
        changeShipType,
        selectShip,
        selectWarehouse,
        changeValueField,
        resetOrder,
        updateOrder,
        changeDelivery,
        initOrderState,
    };
};

export { ProviderOrderNewContext as default, useOrderNew };
