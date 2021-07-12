import React, { FC } from 'react';

import { ILocalFilter } from '../index';

import { Select } from 'antd';

interface Props {
    filter: ILocalFilter;
    onChange?: Function;
}

const Brand: FC<Props> = ({ filter, onChange }) => {
    const handleBrandChange = (value: string) => {
        onChange && onChange({ ...filter, value });
    };

    return (
        <Select
            style={{ minWidth: 136 }}
            value={filter.value || 'root'}
            onChange={handleBrandChange}
        >
            <Select.Option value="root">Chọn nhãn hiệu</Select.Option>
        </Select>
    );
};

export default Brand;
