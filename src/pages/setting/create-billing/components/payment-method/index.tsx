import { Radio, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { EBillingPaymentType } from '../../../../../api/billing-api';
import { useBilling } from '../../state/context';
import './payment-method.less';

const { Text } = Typography;

interface Props {}

const radioStyle = {
    display: 'block',
    height: 30,
    lineHeight: '30px',
};

interface IPaymentType {
    value: number;
    title: string;
}

const payment_types: IPaymentType[] = [
    { value: EBillingPaymentType.BankTransfer, title: 'Chuyển khoản ngân hàng' },
    // { value: EBillingPaymentType.OnlinePayment, title: 'Thanh toán online qua cổng Napas bằng thẻ Visa/ Master Card' },
];

const PaymentMethod = (props: Props) => {
    const { paymentMethod, changeValueField } = useBilling();

    const onChange = (e: RadioChangeEvent) => {
        changeValueField({
            value: e.target.value,
            field: 'paymentMethod',
        });
    };

    return (
        <Radio.Group value={paymentMethod} onChange={onChange} className="payment-billing">
            {payment_types.map((item) => (
                <Radio style={radioStyle} key={item.value} value={item.value}>
                    <Text className="label-name">{item.title}</Text>
                    <div className="info-bank">
                        <Text>
                            Khách hàng chuyển khoản theo cú pháp:
                            <br />
                            Mã đơn hàng + SĐT ĐẶT HÀNG
                        </Text>
                        <br />
                        <Text className="label">Thông tin chuyển khoản ngân hàng</Text>
                        <br />
                        <Text className="label-name">Trần Hoàng Hiệp</Text>
                        <br />
                        <Text>
                            - Ngân hàng: Techcombank chi nhánh Đà Nẵng
                            <br />- Số tài khoản: 19033620454213
                        </Text>
                        <br />
                        <Text className="label-name">Trần Hoàng Hiệp</Text>
                        <br />
                        <Text>
                            - Ngân hàng: Vietcombank chi nhánh Đà Nẵng
                            <br />- Số tài khoản: 041000555475
                        </Text>
                    </div>
                </Radio>
            ))}
        </Radio.Group>
    );
};

export default PaymentMethod;
