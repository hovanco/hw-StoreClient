import { ITypeTime } from '../../../../helper/get-time';

export interface ICounts {
    accessCount: number;
    customersCount: number;
    ordersCount: number;
    returnedOrdersCount: number;
    stocksCount: number;
}

interface IDataItem {
    date: string;
    value: number;
}

interface IAll {
    data: IDataItem[];
    total: number;
}

export interface IChannelData {
    customerCount: number;
    data: IDataItem[];
    total: number;
    orderCount: number;
}

export interface IRevenues {
    all?: IAll;
    facebook?: IChannelData;
    shopee?: IChannelData;
    pos?: IChannelData;
}

export interface ITimeReport {
    type: ITypeTime;
    value: number;
}

export interface IStateReport {
    loading: boolean;
    counts: ICounts;
    revenues: IRevenues;
    time: ITimeReport;
    warehouseId?: string;
}

export interface IActionReport {
    type: string;
    payload: any;
}

export interface IContextReport {
    state: IStateReport;
    dispatch: React.Dispatch<any>;
}
