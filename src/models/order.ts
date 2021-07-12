import { IProduct, IStore, IWarehouse } from './store';
import { ICustomer } from './customer';

export enum EDeliveryServiceIds {
    GHTK = 1,
    GHN = 2,
}

export enum ETransportType {
    Fast = 1,
    Medium,
}

export enum ETransportStatus {
    Picking,
    Picked,
    Storing,
    Delivering,
    Delivered,
    Return,
    Returned,
}

export enum EDeliveryDiscountBy {
    Money,
    Percent,
}

export interface TransportLog {
    status: ETransportStatus;
    updatedAt: Date;
}

export interface IDeliveryOptions {
    serviceId: EDeliveryServiceIds; // id of delivery service
    transportType: ETransportType; // transport type, it should be convert to valid value before sending to delivery service
    shipmentOrderId: string; // id of transport service: ghn: order_code, ghtk: label_id
    shipmentFee: number; // Real shipment fee
    shipmentFeeForCustomer: number; // Shipment fee that will be informed to customer
    shipmentFeeByTotal: boolean; // Shipment fee should be included in total fee
    discount: number; // Discount for customer, will be set by user
    discountBy: EDeliveryDiscountBy; // Discount by money or percent
    feeForReceiver: number; // Total amount that receiver need to pay (Total product amount + shipment fee - discount)
    moneyForSender: number; // Total amount that sender will receive (Total product amount + shipment fee for customer - discount - real shipment fee)
    customerNote: string;
    noteForCustomerCare: string;
    transportStatus: ETransportStatus;
    transportLogs: TransportLog[]; // Log all changes of transport status
    noteForDelivery: string;
}

export enum ORDER_STATUS {
    NEW = 0,
    CONFIRMED = 1,
    WAIT_FOR_DELIVERY = 2, // WRAPPED
    DELIVERING = 3,
    CANCELED = 4,
    DELIVERED = 5,
    RETURNED = 6,
}

export enum EPaymentType {
    PayFirst,
    PayLater,
    PayCOD,
}

export const EPaymentTypeName = {
    [EPaymentType.PayFirst]: 'Thanh toán trước',
    [EPaymentType.PayLater]: 'Thanh toán sau',
    [EPaymentType.PayCOD]: 'Thanh toán COD',
}

export enum EPaymentMethod {
    Transfer,
    Cash,
}

export interface IOrderProduct {
    productId: string | IProduct;
    count: Number;
    price: Number;
}

export interface IOrderCustomer {
    _id: string;
    fbUserId: string;
    name: string;
    phoneNo: string;
    address: string;
    province: string;
    provinceName?: string;
    district: string;
    districtName?: string;
    ward: string;
    wardName?: string;
    email: string;
}

export interface IOrder {
    _id: string;
    createdBy: string | any;
    storeId: string | IStore;
    warehouseId: string | IWarehouse;
    fbPageId: string;
    isDraft: boolean;
    products: IOrderProduct[];
    discountId: { type: string };
    totalPrice: Number;
    customer: IOrderCustomer;
    note: string;
    status: ORDER_STATUS;
    createdAt: string;
    source: string;
    code: string;
    deliveryOptions: IDeliveryOptions;
    paidAt?: string;
    paymentType?: EPaymentType;
    paymentMethod?: EPaymentMethod;
}

export interface IGetOrderParams {
    id: string; // storeId
    page: number;
    limit: number;
    source?: string;
    serviceId?: number;
    status?: number;
    search?: string;
    soft?: string;
    direction?: string;
    transportStatus?: string;
    customerId?: string;
    deliveryDate?: number;
    startTime?: number;
    endTime?: number;
}

export interface ICreateOrderData {
    products: IProduct[];
    customer: ICustomer;
    deliveryOptions: any;
    warehouseId?: string;
    source?: string;
    paymentType?: EPaymentType;
    paymentMethod?: EPaymentMethod;
}
