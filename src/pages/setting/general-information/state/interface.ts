export interface IState {
    packages: any[];
    billingCycles: any[];
    paymentMethods: any[];
    packagesSelect: any[];
    billingCycle: any;
    paymentMethod: any;
    coupon: string;
}

export interface IAction {
    type: string;
    payload: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
