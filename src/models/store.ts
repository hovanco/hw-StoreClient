import { SaleChannelId } from './sale-channel';

export enum EBusinessType {
    Others = 0,
    Fashion = 1,
    MomAndBaby = 2,
    Accessories = 3,
    Furniture = 4,
    Food = 5,
    Cosmetic = 6,
    Services = 7,
}

export interface IStore {
    address?: string;
    code?: string;
    createdAt?: string;
    email?: string;
    district?: string;
    districtName?: string;
    ghnShopId?: number;
    name?: string;
    ownerId?: string;
    phoneNo?: string;
    province?: string;
    provinceName?: string;
    role?: number;
    updatedAt?: string;
    ward?: string;
    wardName?: string;
    warehouseId?: string;
    saleChannels?: SaleChannelId[];
    _id?: string;
    fax?: string;
    businessType?: typeof EBusinessType;
    logoUrl?: string;
}
export interface IStoreCategory {
    _id: string;
    name?: string;
    createdAt?: string;
}
export interface IProduct {
    _id?: string;
    attributes?: IAttribute[];
    images?: any[];
    name?: string;
    code?: string;
    weight?: number;
    originalPrice?: number;
    price?: number;
    wholesalePrice?: number;
    brandId?: string;
    unitId?: string;
    storeId?: string;
    sku?: string;
    createdAt?: string;
    updatedAt?: string;
    height?: number;
    length?: number;
    width?: number;
    categoryId?: IStoreCategory;
    isVariant?: boolean;
    variants?: IVariant[];
    quantity?: number;
    shortDescription?: string;
    htmlDescription?: string;
    description?: string;
    isDeleted?: boolean;
}
export interface IVariantParam {
    attributes?: IAttribute[];
    images?: any[];
    name?: string;
    code?: string;
    weight?: number;
    originalPrice?: number;
    price?: number;
    wholesalePrice?: number;
    brandId?: string;
    unitId?: string;
    storeId?: string;
    sku?: string;
    createdAt?: string;
    updatedAt?: string;
    height?: number;
    length?: number;
    width?: number;
    categoryId?: IStoreCategory;
}
export interface IVariant {
    _id: string;
    images?: any[];
    name?: string;
    code?: string;
    weight?: number;
    originalPrice?: number;
    price?: number;
    wholesalePrice?: number;
    brandId?: string;
    unitId?: string;
    storeId?: string;
    sku?: string;
    createdAt?: string;
    updatedAt?: string;
    height?: number;
    length?: number;
    width?: number;
    quantity?: number;
    categoryId?: IStoreCategory;
    attributes: IAttribute[];
}
export interface IAttribute {
    _id: string;
    name: string;
    tags: string[];
}
export interface ICreateUser {
    _id?: string;
    email?: string;
    name?: string;
}

export interface IWarehouse {
    address?: string;
    createdAt?: string;
    district?: string;
    districtName?: string;
    ghnShopId?: number;
    name: string;
    oldGhnShopIds?: any[];
    phoneNo?: string;
    province?: string;
    provinceName?: string;
    storeId?: string;
    updatedAt?: string;
    ward?: string;
    wardName?: string;
    _id: string;
}
