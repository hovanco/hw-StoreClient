import { get } from 'lodash';
import { IOrder, ORDER_STATUS } from '../../../models';

const ORDER_STATUS_ARRAY = [ORDER_STATUS.DELIVERING, ORDER_STATUS.DELIVERED, ORDER_STATUS.RETURNED];

const checkEditOrder = (order?: IOrder): boolean => {
    const orderStatus = get(order, 'status');

    return !!orderStatus && ORDER_STATUS_ARRAY.includes(orderStatus);
};

export { checkEditOrder };
