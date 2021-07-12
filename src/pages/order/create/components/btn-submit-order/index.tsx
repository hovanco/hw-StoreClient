import { Button, message } from 'antd';
import { get, omit, pick } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import orderApi from '../../../../../api/order-api';
import shippingApi from '../../../../../api/shipping-api';
import {
    EPaymentType,
    ICustomer,
    IOrder,
    IWarehouse,
    ORDER_STATUS,
    SaleChannelId,
} from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../state/context';
import { EShipTypes, EStatusPage } from '../../state/interface';
import { getFeeForReceiver } from '../../ultil';

const { createOrder, updateOrder } = orderApi;

interface Props {}

const BtnSubmitOrder: FC<Props> = () => {
    const history = useHistory();
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        order,
        statusPage,
        discount,
        discountBy,
        products,
        shipmentFee,
        customer,
        warehouseId,
        infoDelivery,
        source,
        shipmentFeeForCustomer,
        customerNote,
        noteForDelivery,
        ship,
        resetOrder,
        paymentType,
        paymentMethod,
        shipType,
        delivered,
    } = useOrderNew();

    const getShipmentFee = () => {
        return shipmentFee || 0;
    };

    const createNewOrder = async () => {
        try {
            setLoading(true);

            const order = await createOrder({
                storeId: store._id as string,
                data: {
                    products: products.map((product) => ({
                        ...pick(product, ['count', 'price']),
                        productId: product._id,
                    })),

                    customer: {
                        ...pick(customer as ICustomer, ['_id', 'name']),

                        phoneNo: infoDelivery?.phoneNo || customer?.phoneNo,
                        address: infoDelivery?.address || (customer?.address as string),
                        province: infoDelivery?.province || (customer?.province as string),
                        district: infoDelivery?.district || (customer?.district as string),
                        ward: infoDelivery?.ward || (customer?.ward as string),
                    } as ICustomer,

                    warehouseId,
                    source,

                    deliveryOptions: {
                        shipmentFee: getShipmentFee(),
                        discount,
                        discountBy,
                        noteForDelivery,
                        shipmentFeeForCustomer: shipmentFeeForCustomer || shipmentFee || 0,
                        serviceId: ship?.serviceId || 0,
                        transportType: ship?.transportType || 0,
                        customerNote,
                        feeForReceiver: getFeeForReceiver({
                            products,
                            discount,
                            discountBy,
                            shipmentFee,
                            shipmentFeeForCustomer,
                        }),
                        shipmentFeeByTotal: true,
                    },
                    paymentType,
                    paymentMethod,
                },
            });

            if (source === SaleChannelId.POS && shipType === EShipTypes.SelfTransport) {
                await updateOrder({
                    storeId: store._id as string,
                    orderId: order._id,
                    data: {
                        status: delivered ? ORDER_STATUS.DELIVERED : ORDER_STATUS.DELIVERING,
                    },
                });
            }

            message.success('Tạo đơn hàng thành công');
            resetOrder();
        } catch (error) {
            message.error('Lỗi tạo đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = (): Promise<any> =>
        new Promise(async (resolver, reject) => {
            const serviceId = get(order, 'deliveryOptions.shipmentOrderId');

            if (serviceId && order) {
                try {
                    setLoading(true);
                    const orderNew = await shippingApi.toggleCreateOrderShip({
                        storeId: store._id as string,
                        orderId: order._id,
                        cancel: true,
                        warehouseId: (order.warehouseId as IWarehouse)._id,
                    });

                    return resolver(orderNew);
                } catch (error) {
                    return reject('Failed');
                }
            } else {
                return resolver(order);
            }
        });

    const saveOrder = async (orderNew: IOrder) => {
        try {
            const deliveryOptions = {
                discount,
                discountBy,
                serviceId: ship?.serviceId,
                shipmentFee: getShipmentFee(),
                shipmentFeeForCustomer,
                shipmentFeeByTotal: true,
                transportType: ship?.transportType,
                customerNote,
                noteForDelivery,

                feeForReceiver: getFeeForReceiver({
                    products,
                    discount,
                    discountBy,
                    shipmentFee,
                    shipmentFeeForCustomer,
                }),

                shipmentOrderId: (orderNew as IOrder).deliveryOptions?.shipmentOrderId
                    ? (orderNew as IOrder).deliveryOptions?.shipmentOrderId
                    : undefined,
            };

            const getStatus = () => {
                if (source === SaleChannelId.POS && EShipTypes.SelfTransport) {
                    return delivered ? ORDER_STATUS.DELIVERED : ORDER_STATUS.DELIVERING;
                }

                return;
            };

            const data = {
                customer: {
                    ...omit((order as IOrder).customer, [
                        'fbUserId',
                        'provinceName',
                        'districtName',
                        'wardName',
                    ]),

                    ...pick(infoDelivery, [
                        'name',
                        'phoneNo',
                        'address',
                        'province',
                        'district',
                        'ward',
                    ]),
                },
                deliveryOptions,
                products: products.map((product) => ({
                    ...pick(product, ['count', 'price']),
                    productId: product._id,
                })),
                warehouseId: get(order, 'warehouseId._id'), // (order as IOrder).(warehouseId as IWarehouse)._id,
                paymentType,
                paymentMethod,
                status: getStatus(),
                source,
            };

            await updateOrder({
                storeId: store._id as string,
                orderId: (order as IOrder)._id as string,
                data,
            });

            message.success('Đã lưu đơn hàng thành công');
            history.push(`/orders/order/${(order as IOrder)._id}`);
        } catch (error) {
            message.error('Lỗi lưu đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitOrder = async () => {
        if (statusPage === EStatusPage.NEW) {
            createNewOrder();
        } else if (statusPage === EStatusPage.EDIT) {
            cancelOrder()
                .then((orderNew) => {
                    saveOrder(orderNew);
                })
                .catch(() => {
                    message.error('Lỗi lưu đơn hàng');
                });
        }
    };

    const validateField =
        products.length === 0 ||
        !customer ||
        (shipType === EShipTypes.SendShipping && !noteForDelivery) ||
        typeof paymentType === 'undefined' ||
        ([EPaymentType.PayFirst, EPaymentType.PayLater].includes(paymentType) &&
            typeof paymentMethod === 'undefined') ||
        (shipType === EShipTypes.SendShipping && !ship);

    const orderStatus = get(order, 'status');

    const ORDER_STATUS_ARRAY = [
        ORDER_STATUS.DELIVERING,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.RETURNED,
    ];

    const validateOrderStatus: boolean = !!orderStatus && ORDER_STATUS_ARRAY.includes(orderStatus);

    const checkDisabled = () => {
        if (statusPage === EStatusPage.NEW) {
            return validateField;
        }

        if (statusPage === EStatusPage.EDIT && validateOrderStatus) {
            return true;
        }

        if (statusPage === EStatusPage.EDIT && !validateOrderStatus) {
            return validateField;
        }

        return false;
    };

    const title_btn = 'Lưu';

    return (
        <Button
            style={{ minWidth: 100}}
            type='primary'
            onClick={handleSubmitOrder}
            loading={loading}
            disabled={checkDisabled()}
        >
            {title_btn}
        </Button>
    );
};

export default BtnSubmitOrder;
