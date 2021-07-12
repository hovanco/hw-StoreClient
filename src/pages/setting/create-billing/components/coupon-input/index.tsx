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
            placeholder="Coupon/code"
            onChange={onChange}
            style={{
                width: '100%',
                marginBottom: 24,
                borderRadius: 8,
                height: 42,
            }}
            value={coupon}
        />
    );
};

export default CouponInput;
