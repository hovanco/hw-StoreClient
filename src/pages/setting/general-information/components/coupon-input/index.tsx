import { Input } from 'antd';
import React from 'react';
import { useBilling } from '../../state/context';

interface Props {}

const CouponInput = (props: Props) => {
    const { coupon, changeValueField } = useBilling();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeValueField({
            field: 'coupon',
            value: e.target.value,
        });
    };

    return (
        <Input
            placeholder="Nhập phí báo khách"
            onChange={onChange}
            style={{
                width: '100%',
                marginTop: 8,
                marginBottom: 12,
            }}
            value={coupon}
        />
    );
};

export default CouponInput;
