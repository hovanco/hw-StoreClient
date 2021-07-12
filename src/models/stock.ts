import { IProduct } from './index';

export interface IStock {
    _id: string;
    productId: IProduct;
    warehouseId: string;
    storeId: string;
    quantity: number;
}
