import { FormInstance } from 'antd/lib/form';
import { IAttribute, IVariant, IStock } from '../../../models';

export interface IAction {
    type: string;
    payload: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
    form: FormInstance;
    isCreateMode?: boolean;
}

export interface IAttributeOption extends IAttribute {
    isLocalAttributeSign?: boolean;
}

export interface IState {
    attributes: IAttribute[];
    variants: IVariant[];
    attributeOptions: IAttributeOption[];
    stocks: IStock[];
}
