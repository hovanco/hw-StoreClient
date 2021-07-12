import React, { FC } from 'react';
import { FilterDropdown, IFilter } from '../components/filter-dropdown';
import { useOrdersContext } from './state/context';

interface Props {
    title?: string;
}

const FilterDropdownOrder: FC<Props> = ({ title = 'Lọc đơn hàng' }) => {
    const { changeFilter, source, serviceId, deliveryDate } = useOrdersContext();

    const onFilter = (filters: IFilter[]) => {
        let data = {};

        filters.forEach((filter: IFilter) => {
            data = { ...data, [filter.value]: filter.value_filter };
        });

        changeFilter(data);
    };

    return (
        <FilterDropdown
            title={title}
            onFilter={onFilter}
            filters={{
                source,
                serviceId,
                deliveryDate,
            }}
        />
    );
};

export default FilterDropdownOrder;
