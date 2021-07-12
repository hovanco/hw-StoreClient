import { IActionDeliveris, IStateDeliveris } from './interface';

const initialDeliveriesState: IStateDeliveris = {
    loading: false,
    deliveries: [],
    total: 1,
    page: 1,
    limit: 20,
    status: undefined,
    search: undefined,
    source: undefined,
    serviceId: undefined,
    soft: 'createdAt',
    direction: 'desc',
};

const deliveriesReducer = (state: IStateDeliveris, action: IActionDeliveris) => {
    switch (action.type) {
        default:
            return state;
    }
};

export { initialDeliveriesState, deliveriesReducer as default };
