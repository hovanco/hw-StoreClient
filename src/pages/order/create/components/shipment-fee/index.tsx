import { InputNumber } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import formatMoney, { formatterInput, parserInput } from '../../../../../helper/format-money';
import { useOrderNew } from '../../state/context';
import { EShipTypes, EStatusPage } from '../../state/interface';

const ShipmentFee = () => {
    const { order, shipmentFee, changeValueField, statusPage, shipType } = useOrderNew();
    const [disabled, setDisabled] = useState<boolean>(true);

    const onChange = (value?: string | number) => {
        changeValueField({
            field: 'shipmentFee',
            value: Number(value),
        });
    };

    useEffect(() => {
        if (shipType === EShipTypes.SelfTransport) {

            if (statusPage === EStatusPage.NEW) {
                changeValueField({
                    field: 'shipmentFee',
                    value: 0,
                });
            }

            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [shipType, statusPage]);

    if (statusPage === EStatusPage.DETAIL) {
        return <>{formatMoney(get(order, 'deliveryOptions.shipmentFee'))} đ</>;
    }

    return (
        <InputNumber
            placeholder="Nhập phí vận chuyển"
            onChange={onChange}
            style={{
                width: '100%',
            }}
            value={shipmentFee}
            formatter={formatterInput}
            parser={parserInput}
            disabled={disabled}
            min={0}
        />
    );
};

export default ShipmentFee;
