import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from '../../../../../reducers/storeState/reducer';
import { IStoreCategory } from '../../../../../models';
import { ILocalFilter } from '../index';

import { Select } from 'antd';

interface Props {
    filter: ILocalFilter;
    onChange?: Function;
}

const Category: FC<Props> = ({ filter, onChange }) => {
    const { categories } = useSelector(({ store }: { store: IStoreState }) => store);

    const handleCategoryChange = (value: string) => {
        onChange && onChange({ ...filter, value });
    };

    return (
        <Select
            style={{ minWidth: 136 }}
            value={filter.value || 'root'}
            onChange={handleCategoryChange}
        >
            <Select.Option value="root">Chọn loại sản phẩm</Select.Option>
            {categories.map((item: IStoreCategory) => (
                <Select.Option value={item._id} key={item._id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
};

export default Category;
