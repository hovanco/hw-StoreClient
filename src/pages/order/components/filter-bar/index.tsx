import { Tag } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { EDeliveryServiceIds } from '../../../../models';
import './filters.less';

interface FilterItemProps {
    value: string;
    value_filter: string | number;
    removeFilter: (value: string) => void;
}

function getTitleServideID(value_filter: string | number) {
    if (value_filter === `${EDeliveryServiceIds.GHTK}`) return 'GHTK';

    return 'GHN';
}

const FilterItem: FC<FilterItemProps> = ({ value, value_filter, removeFilter }) => {
    const closeFilter = () => {
        removeFilter(value);
    };

    const label =
        value === 'source' ? 'Nguồn' : value === 'deliveryDate' ? 'Ngày giao hàng' : 'Vận chuyển';

    function getValueFilter() {
        if (value === 'source') return value_filter;
        if (value === 'serviceId') return getTitleServideID(value_filter);
        if (value === 'deliveryDate') return moment(Number(value_filter)).format('DD/MM/YYYY');
        return null;
    }

    return (
        <Tag onClose={closeFilter} className="filter-item" closable>
            <span>
                {label}: {getValueFilter()}
            </span>
        </Tag>
    );
};

interface Props {
    source?: string;
    serviceId?: string;
    deliveryDate?: number;
    removeFilter: (value: string) => void;
}

const Filters: FC<Props> = ({ source, serviceId, deliveryDate, removeFilter }) => {
    return (
        <div className="filters">
            {source && (
                <FilterItem value="source" value_filter={source} removeFilter={removeFilter} />
            )}

            {serviceId && (
                <FilterItem
                    value="serviceId"
                    value_filter={serviceId}
                    removeFilter={removeFilter}
                />
            )}

            {deliveryDate && (
                <FilterItem
                    value="deliveryDate"
                    value_filter={deliveryDate}
                    removeFilter={removeFilter}
                />
            )}
        </div>
    );
};

export default Filters;
