import { SaleChannelId } from './index';
import { Gender } from '../constants/gender';
import { Moment } from 'moment';

export interface ICustomer {
    _id: string;
    storeId: string;
    name: string;
    phoneNo?: string;
    address?: string;
    fbPageId?: string;
    fbUserId?: string;
    email?: string;
    note?: string;
    district?: string;
    ward?: string;
    province?: string;
    code: string;
    provinceName?: string;
    districtName?: string;
    wardName?: string;
    source?: SaleChannelId;
    dateOfBirth?: string;
    gender?: Gender;
}

export interface ICustomerEditing extends Omit<ICustomer, 'dateOfBirth'> {
    dateOfBirth?: Moment;
}

export interface ICustomersParams {
    storeId: string;
    page: number;
    limit: number;
    sort?: string;
    direction?: string;
    source?: SaleChannelId;
    search?: string;
    dateOfBirth?: string;
    filterDateBy?: string;
    fromAt?: number;
    toAt?: number;
    gender?: Gender;
}

export interface ICreateCustomerParams {
    name: string;
    email?: string;
    phoneNo: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    dateOfBirth?: string;
    gender?: string;
    source?: string;
    label?: string;
    address2?: string;
    website?: string;
    taxCode?: string;
    description?: string;
}
