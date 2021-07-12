import { InputNumber } from 'antd';
import { get } from 'lodash';
import React from 'react';
import formatMoney, { formatterInput, parserInput } from '../../../../../helper/format-money';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';

interface Props {}

const ShipmentFeeCustomer = (props: Props) => {
    const { order, statusPage, shipmentFeeForCustomer, changeValueField } = useOrderNew();

    if (statusPage === EStatusPage.DETAIL) {
        return <>{formatMoney(get(order, 'deliveryOptions.shipmentFeeForCustomer'))} đ</>;
    }

    const onChange = (value?: string | number) => {
        changeValueField({
            field: 'shipmentFeeForCustomer',
            value: Number(value),
        });
    };

    return (
        <InputNumber
            placeholder="Nhập phí báo khách"
            onChange={onChange}
            style={{
                width: '100%',
            }}
            value={shipmentFeeForCustomer}
            formatter={formatterInput}
            parser={parserInput}
            min={0}
        />
    );
};

export default ShipmentFeeCustomer;
