import React from 'react';
import Filters from '../components/filter-bar';
import { useOrdersContext } from './state/context';

const FilterBar = () => {
    const { source, serviceId, deliveryDate, removeFilter } = useOrdersContext();

    const handleRemoveFilter = (value: string) => {
        removeFilter(value);
    };

    return (
        <div>
            <Filters
                source={source}
                serviceId={serviceId}
                deliveryDate={deliveryDate}
                removeFilter={handleRemoveFilter}
            />
        </div>
    );
};

export default FilterBar;
