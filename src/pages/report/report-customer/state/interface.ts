export enum EFilter {
    Province = 'province',
    Period = 'period',
    Channel = 'channel',
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IState {
    loading: boolean;
    filter: EFilter;
    startTime?: number;
    endTime?: number;
    data: any[];
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
