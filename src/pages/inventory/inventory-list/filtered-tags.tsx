import React, { FC, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

import { find } from 'lodash';
import { IStoreState } from '../../../reducers/storeState/reducer';

import { useInventoryTable } from './context';
import dataFilterInventory, { IFilterOption } from './advance-filter/data';

import { Tag } from 'antd';

interface IFilter extends IFilterOption {
    value: any;
}

const FilteredTags: FC = () => {
    const { filter, advanceFilterChange } = useInventoryTable();

    const categories = useSelector(({ store }: { store: IStoreState }) => store.categories);

    const tags = useMemo(() => {
        let { status, categoryId, brandId } = filter;

        let getFilterItemByKey = (key: string, value: any) => {
            let filterItem = find(dataFilterInventory, ['id', key]);

            return { ...filterItem, value } as IFilter;
        };

        let getCategoryName = (id: string) => find(categories, ['_id', id])?.name;

        let result: IFilter[] = [];
        if (status !== undefined)
            result.push(
                getFilterItemByKey('status', status === '6' ? 'Ngừng giao dịch' : 'Đang giao dịch')
            );
        if (categoryId !== undefined)
            result.push(getFilterItemByKey('categoryId', getCategoryName(categoryId)));
        if (brandId !== undefined) result.push(getFilterItemByKey('brandId', brandId));

        return result;
        // eslint-disable-next-line
    }, [filter.status, filter.categoryId, filter.brandId]);

    const removeTag = (id: string) => {
        advanceFilterChange({ ...filter, [id]: undefined });
    };

    return (
        <div>
            {tags.map((item: any) => (
                <Tag key={item.id} closable onClose={() => removeTag(item.id)}>
                    {item.name}: {item.value}
                </Tag>
            ))}
        </div>
    );
};

export default memo(FilteredTags);
