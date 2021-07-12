export interface IPagingParams {
    page: number;
    limit?: number;
    total?: number;
    descending?: any;
    order?: any;
}

export interface IPagingResult<M> {
    data: M[];
    pagination: IPagingParams;
}

export interface ICRUDReducer<M> extends IPagingResult<M> {
    loading: boolean;
}
export const CRUDReducer = (): ICRUDReducer<any> => {
    return {
        data: [],
        loading: false,
        pagination: {
            page: 1,
            limit: 20,
        },
    };
};
