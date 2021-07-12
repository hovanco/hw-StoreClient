import { Button, Empty } from 'antd';
import React, { FC } from 'react';
import { Loading } from '../../../../components';
import { guest } from '../../../../constants/guest';
import { ICustomer } from '../../../../models';
import AddCustomer from '../add-customer';
import { useSearchCustomer } from './context';
import CustomerRow from './customer-row';

interface Props {
    loading: boolean;
    customers: ICustomer[];
    setHideVisible?: () => void;
    optionGuest: boolean;
}

const Customers: FC<Props> = ({ loading, customers, optionGuest, setHideVisible }) => {
    const { selectCustomer } = useSearchCustomer();

    const handleSelectCustomer = (customer: ICustomer) => {
        if (setHideVisible) {
            setHideVisible();
        }

        selectCustomer(customer);
    };

    const renderCustomes =
        customers.length > 0 ? (
            customers.map((customer: ICustomer) => (
                <CustomerRow
                    key={customer._id}
                    customer={customer}
                    selectCustomer={handleSelectCustomer}
                />
            ))
        ) : (
            <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có khách hàng" />
            </div>
        );

    return (
        <div className={'custome-list-wrap'}>
            <div className="customers-list">
                {loading && <Loading />}

                {optionGuest && <div onClick={() => handleSelectCustomer(guest)} className="customer-row">
                    <div className="customer-name">Khách vãng lai</div>
                </div>}

                {renderCustomes}

                <div className="add-customer">
                    <AddCustomer selectCustomer={selectCustomer}>
                        <Button type="primary" size="small" style={{ width: 170 }}>
                            Thêm khách hàng
                        </Button>
                    </AddCustomer>
                </div>
            </div>
        </div>
    );
};

export default Customers;
