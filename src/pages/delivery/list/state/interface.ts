export interface IStateDeliveris {
    loading: boolean;
    deliveries: any[];
    total: number;
    page: number;
    limit: number;
    status?: any;
    search?: string;
    source?: string;
    serviceId?: string;
    soft: string;
    direction: 'desc' | 'asc';
}

export interface IActionDeliveris {
    type: string;
    payload: any;
}

export interface IContextDeliveris {
    state: IStateDeliveris;
    dispatch: React.Dispatch<any>;
}
