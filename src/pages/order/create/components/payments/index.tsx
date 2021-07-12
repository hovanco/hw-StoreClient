import { Select } from 'antd';
import React from 'react';
import { EPaymentMethod } from '../../../../../models';
import { useOrderNew } from '../../state/context';

interface IPayment {
    value: EPaymentMethod;
    title: string;
}

const payments: IPayment[] = [
    {
        value: EPaymentMethod.Transfer,
        title: 'Chuyển khoản ngân hàng',
    },
    {
        value: EPaymentMethod.Cash,
        title: 'Tiền mặt',
    },
];

const Payments = () => {
    const { paymentMethod, changeValueField } = useOrderNew();

    const changePaymentMethod = (value: EPaymentMethod) => {
        changeValueField({
            field: 'paymentMethod',
            value,
        });
    };

    return (
        <Select
            value={paymentMethod}
            onChange={changePaymentMethod}
            style={{ width: '100%' }}
            placeholder="Chọn hình thức thanh toán"
        >
            {payments.map((payment: IPayment) => (
                <Select.Option key={payment.value} value={payment.value}>
                    {payment.title}
                </Select.Option>
            ))}
        </Select>
    );
};

export default Payments;
