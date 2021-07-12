import { EPaymentMethod, EPaymentType, ICustomer, IOrder, SaleChannelId } from '../../../../models';
import { EDeliveryDiscountBy, EDeliveryServiceIds, ETransportType } from '../../../../models/order';

export interface IProductState {
    count: number;
    name: string;
    code: string;
    price: number;
    weight: number;
    _id: string;
    images: string[];
    quantity: number;
    attributes?: any[];
}

export interface IInfoDelivery {
    name: string;
    phoneNo: string;
    address: string;
    ward: string;
    wardName: string;
    district: string;
    districtName: string;
    province: string;
    provinceName: string;
}

export enum EShipTypes {
    SendShipping = 'send_shipping',
    SelfTransport = 'self-transport',
}

export interface IShip {
    avatar: string;
    name: string;
    serviceId: EDeliveryServiceIds;
    shipmentFee: number;
    transportType: ETransportType;
}

export interface IState {
    products: IProductState[];
    customer?: ICustomer;
    infoDelivery?: IInfoDelivery;
    shipType: EShipTypes;
    warehouseId?: string;
    shipmentFee?: number;
    shipmentFeeForCustomer?: number;
    discountBy: EDeliveryDiscountBy;
    discount?: number;
    noteForDelivery?: string;
    customerNote?: string;
    ship?: IShip;
    source?: SaleChannelId;
    paymentType?: EPaymentType;
    paymentMethod?: EPaymentMethod;
    isEdit: boolean;
    delivered?: boolean;
}

export interface IAction {
    type: string;
    payload: any;
}

export enum EStatusPage {
    NEW,
    EDIT,
    DETAIL,
}

export interface IContext {
    order?: IOrder;
    statusPage?: EStatusPage;
    state: IState;
    dispatch: React.Dispatch<any>;
}
