import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React, { useEffect } from 'react';
import { EPaymentType } from '../../../../../models';
import { useOrderNew } from '../../state/context';
import { EShipTypes, EStatusPage } from '../../state/interface';
import './payment-type.less';

interface Props {}

const radioStyle = {
    display: 'block',
    height: 30,
    lineHeight: '30px',
};

interface IPaymentType {
    value: EPaymentType;
    title: string;
}

const payment_types: IPaymentType[] = [
    { value: EPaymentType.PayFirst, title: 'Thanh toán trước' },
    { value: EPaymentType.PayLater, title: 'Thanh toán sau' },
    { value: EPaymentType.PayCOD, title: 'Thanh toán COD' },
];

const PaymentType = (props: Props) => {
    const { statusPage, paymentType, order, changeValueField, shipType } = useOrderNew();

    useEffect(() => {
        
        if (shipType === EShipTypes.SelfTransport &&
            paymentType === EPaymentType.PayCOD) {
                changeValueField({
                    value: undefined,
                    field: 'paymentType',
                });
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shipType, paymentType])

    const onChange = (e: RadioChangeEvent) => {
        changeValueField({
            value: e.target.value,
            field: 'paymentType',
        });
    };

    if (statusPage === EStatusPage.DETAIL) {
        const payment_type_exist = payment_types.find(
            (item: IPaymentType) => item.value === order?.paymentType
        );
        const title = payment_type_exist?.title || '';

        return <span className="paymentTypeText">{title}</span>;
    }

    return (
        <Radio.Group value={paymentType} onChange={onChange}>
            {payment_types.map((item) => (
                <Radio
                    style={radioStyle}
                    key={item.value}
                    value={item.value}
                    disabled={
                        item.value === EPaymentType.PayCOD && shipType === EShipTypes.SelfTransport
                    }
                >
                    {item.title}
                </Radio>
            ))}
        </Radio.Group>
    );
};

export default PaymentType;
