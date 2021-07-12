import { IAttribute, IStock, IProduct } from '../../models';

export interface IProductDetailParams {
    productId: string;
}

export interface IProductVariantDetailParams {
    productId?: string;
    variantId?: string;
}

export interface IReplacedAttributeParam {
    oldId: string;
    newId: string;
    newName: string;
}

export interface IEditStock extends Omit<IStock, 'productId'> {
    productId: IProduct | string;
}
