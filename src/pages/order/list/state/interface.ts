export interface IStatus {}

export interface IStateOrders {
    progress: boolean;
    page: number;
    limit: number;
    status?: string;
    search?: string;
    source?: string;
    serviceId?: string;
    soft?: string;
    direction?: string;
    deliveryDate?: number;
}

export interface IActionOrders {
    type: string;
    payload?: any;
}

export interface IContextOrders {
    state: IStateOrders;
    dispatch: React.Dispatch<any>;
}
