import { Col, DatePicker, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import iconTrash from '../../../../assets/images/trash.svg';
import { InsaButton } from '../../../../components';
import { FilterItem, IFilter } from './interface';

interface FilterRowProps {
    filter: IFilter;
    updateFilter: (filter: IFilter, item: any) => void;
    removeFilter: (filter: IFilter) => void;
}

const FilterRow: FC<FilterRowProps> = ({ filter, updateFilter, removeFilter }) => {
    const handleRemoveFilter = () => {
        removeFilter(filter);
    };

    const selectFilterValue = (value: any) => {
        updateFilter(filter, value);
    };

    const selectDeliveryDate = (value: any) => {
        updateFilter(filter, moment(value).valueOf());
    };

    return (
        <Row gutter={10} align="middle">
            <Col>
                <Input value={filter.title} disabled style={{ maxWidth: 136 }} />
            </Col>

            <Col style={{ flex: 1 }}>
                {filter.value === 'deliveryDate' ? (
                    <DatePicker
                        defaultValue={
                            filter.value_filter ? moment(Number(filter.value_filter)) : undefined
                        }
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày"
                        onChange={selectDeliveryDate}
                    />
                ) : (
                    <Select
                        style={{
                            minWidth: 136,
                            width: '100%',
                        }}
                        placeholder={filter.filters.label}
                        onChange={selectFilterValue}
                        value={filter.value_filter}
                    >
                        {filter.filters.items.map((item: FilterItem) => (
                            <Select.Option value={item.value} key={item.value}>
                                {item.title}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Col>

            <Col>
                <InsaButton size="small" onClick={handleRemoveFilter}>
                    <img src={iconTrash} alt="Remove" />
                </InsaButton>
            </Col>
        </Row>
    );
};

export default FilterRow;
