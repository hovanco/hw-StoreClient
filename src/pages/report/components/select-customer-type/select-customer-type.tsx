import { Select } from 'antd';
import React, { FC } from 'react';

interface Props {}

enum ECusotmerType {
    AllCustomer,
    NewCustomer,
    OldCustomer,
    RetailCustomer,
}

interface ICustomerType {
    value: ECusotmerType;
    label: string;
}

const listCustomerType: ICustomerType[] = [
    {
        value: ECusotmerType.AllCustomer,
        label: 'Tổng số khách hàng',
    },
    {
        value: ECusotmerType.NewCustomer,
        label: 'Khách hàng lần đầu',
    },
    {
        value: ECusotmerType.OldCustomer,
        label: 'Khách hàng quay lại',
    },
    {
        value: ECusotmerType.RetailCustomer,
        label: 'Khách lẻ',
    },
];

const SelectCustomerType: FC<Props> = () => {
    return (
        <Select defaultValue={ECusotmerType.AllCustomer}>
            {listCustomerType.map((customerType) => (
                <Select.Option value={customerType.value} key={customerType.value}>
                    {customerType.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export { SelectCustomerType };
