import { SALE_CHANNEL_DATA } from '../../../../constants/sale-channels';
import { SaleChannel } from '../../../../models';

export interface IState {
    loading: boolean;
    saleChannels: SaleChannel[];
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
