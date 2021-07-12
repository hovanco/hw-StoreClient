import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import formatMoney from '../../../../../helper/format-money';
import { ICycleBiling } from '../../../list-billings/package-biling';
import { useBilling } from '../../state/context';
import './billing-cycle.less';

interface Props {}

const radioStyle = {
    display: 'block',
};

const BillingCycle = (props: Props) => {
    const { billingCycle, changeValueField, packagesSelect, changeCycleForPackage } = useBilling();

    const onChange = (e: RadioChangeEvent) => {
        changeValueField({
            value: e.target.value,
            field: 'billingCycle',
        });
        changeCycleForPackage(e.target.value);
    };

    return (
        <Radio.Group value={billingCycle} onChange={onChange} className='cycle-billing'>
            {packagesSelect[packagesSelect.length - 1]?.cycles?.map((item: ICycleBiling) => (
                <Radio style={radioStyle} key={item.id} value={item.id}>
                    {`${formatMoney(item.price * packagesSelect.length)}đ / ${item.name}`}
                </Radio>
            ))}
        </Radio.Group>
    );
};

export default BillingCycle;
