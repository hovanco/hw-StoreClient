import React from 'react';
import { Input, InputNumber } from 'antd';
import formatMoney, { formatterInput, parserInput } from '../../../../helper/format-money';

const EditInput = ({ isEdit = false, isNumber = false, defaultValue, ...rest }: any) => {
    const LocalInput = isNumber ? (
        <InputNumber
            defaultValue={defaultValue}
            {...rest}
            formatter={formatterInput}
            parser={parserInput}
        />
    ) : (
        <Input defaultValue={defaultValue} {...rest} />
    );

    return isEdit ? (
        LocalInput
    ) : (
        <span>{isNumber && defaultValue ? formatMoney(defaultValue) : defaultValue}</span>
    );
};

export default EditInput;
