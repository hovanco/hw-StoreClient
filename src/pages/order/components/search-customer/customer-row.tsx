import React, { FC, memo } from 'react';
import { ICustomer } from '../../../../models';

interface Props {
    customer: ICustomer;
    selectCustomer: (customer: ICustomer) => void;
}

const CustomerRow: FC<Props> = ({ customer, selectCustomer }) => {
    const onClick = () => {
        selectCustomer(customer);
    };

    return (
        <div onClick={onClick} className="customer-row">
            <div className="customer-name">{customer.name}</div>
            <div className="customer-phoneNo">{customer.phoneNo}</div>
        </div>
    );
};

export default memo(CustomerRow);
