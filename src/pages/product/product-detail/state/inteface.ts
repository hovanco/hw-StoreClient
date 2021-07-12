import { IProduct } from '../../../../models';

export interface IAction {
    type: string;
    payload?: any;
}

export interface IReducer {
    loading: boolean;
    product?: IProduct;
}

export interface IContext {
    state: IReducer;
    dispatch: React.Dispatch<any>;
    loadProduct: React.Dispatch<any>;
}
