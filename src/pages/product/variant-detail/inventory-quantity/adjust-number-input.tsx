import React, { FC } from 'react';

import { formatterInput, parserInput } from '../../../../helper/format-money';

import { InputNumber, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

type Props = {
    value?: number;
    onChange: Function;
};

const AdjustNumberInput: FC<Props> = ({ value, onChange }) => {
    const plusInput = () => inputChange(value ? value + 1 : 1);

    const minasInput = () => inputChange(value ? (value - 1 >= 0 ? value - 1 : 0) : 0);

    const inputChange = (value: number | string | undefined) => {
        onChange(Number(value));
    };

    return (
        <div className="adjust-number-input">
            <Space>
                <MinusOutlined onClick={minasInput} />
                <InputNumber
                    value={value}
                    formatter={formatterInput}
                    parser={parserInput}
                    style={{ width: 80 }}
                    min={0}
                    onChange={inputChange}
                />
                <PlusOutlined onClick={plusInput} />
            </Space>
        </div>
    );
};

export default AdjustNumberInput;
