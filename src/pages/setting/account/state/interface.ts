import { IStaff } from '../../../../models';

export interface IState {
    loading: boolean;
    staffs: IStaff[];
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
    loadStaffs: React.Dispatch<any>;
}
