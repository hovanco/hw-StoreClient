export enum ETab {
    Revenue = 'revenue',
    Delivery = 'delivery',
}

export enum EFilter {
    Period = 'period',
    Channel = 'channel',
    Warehouse = 'warehouse',
    Staff = 'staff',
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IState {
    loading: boolean;
    tab: ETab;
    filter: EFilter;
    startTime: number;
    endTime: number;
    data: any[];
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
