import React, { FC } from 'react';

import { parserInput, formatterInput } from '../../../helper/format-money';
import { IEditRow } from './table';
import { IStock } from '../../../models';

import { InputNumber } from 'antd';
import { InsaButton } from '../../../components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import './inventory-update-input.less';

interface Props {
    onFocus: () => void;
    editRow?: IEditRow;
    stock: IStock;
    onChange: Function;
    onSave?: Function;
}

const InventoryUpdateInput: FC<Props> = ({ onFocus, editRow, stock, onChange, onSave }) => {
    const plusValue = () => onChange((editRow?.editValue || 0) + 1);

    const minusValue = () => onChange((editRow?.editValue || 0) - 1);

    const handleChangeInputValue = (value: string | number | undefined) => {
        onChange(Number(value) || 0);
    };

    const resetInput = () => onChange(0);

    const handleFocusInput = () => {
        onFocus();
    };

    const handlePressEnter = () => {
        onSave && onSave();
    };

    if (editRow?._id === stock._id)
        return (
            <div className="inventory-update-input">
                <span className="group-label">Thêm bớt</span>
                <InsaButton onClick={resetInput}>Đặt lại</InsaButton>
                <InsaButton icon={<MinusOutlined />} onClick={minusValue} />
                <InputNumber
                    onPressEnter={handlePressEnter}
                    autoFocus
                    formatter={formatterInput}
                    parser={parserInput}
                    value={editRow?.editValue}
                    onChange={handleChangeInputValue}
                />
                <InsaButton icon={<PlusOutlined />} onClick={plusValue} />
            </div>
        );

    return (
        <div className="inventory-update-input">
            <InputNumber
                formatter={formatterInput}
                parser={parserInput}
                onFocus={handleFocusInput}
                value={0}
            />
        </div>
    );
};

export default InventoryUpdateInput;
