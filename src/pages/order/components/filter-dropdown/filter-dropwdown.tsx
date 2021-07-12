import { Button, Dropdown, Menu, Popover, Space } from 'antd';
import { isUndefined, omitBy, pick } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import BtnDropdown from '../../../../components/btn-dropdown';
import FilterRow from './filter-row';
import { DataFilterItem, IFilter } from './interface';

const dataDefaultFilter: DataFilterItem[] = [
    {
        title: 'Nguồn',
        value: 'source',
        filters: {
            label: 'Chọn nguồn',
            items: [
                {
                    title: 'Facebook',
                    value: 'facebook',
                },
                {
                    title: 'Pos',
                    value: 'pos',
                },
            ],
        },
    },

    {
        title: 'Vận chuyển',
        value: 'serviceId',
        filters: {
            label: 'Chọn vận chuyển',
            items: [
                {
                    title: 'GHTK',
                    value: '1',
                },
                {
                    title: 'GHN',
                    value: '2',
                },
            ],
        },
    },

    {
        title: 'Ngày giao hàng',
        value: 'deliveryDate',
        filters: {
            label: 'Chọn ngày giao hàng',
            items: [],
        },
    },
];

interface Props {
    title?: string;
    filters: Object;
    onFilter: (filters: IFilter[]) => void;
}

const FilterDropdown: FC<Props> = ({ title = 'Chọn điều kiện lọc', onFilter, filters }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [value_filters, setValueFilters] = useState<IFilter[]>([]);
    const [dataFilters, setDataFilters] = useState<DataFilterItem[]>(dataDefaultFilter);

    const toggle = () => setVisible(!visible);

    const handleFilter = () => {
        onFilter(value_filters);
        setVisible(false);
    };

    const removeFilter = (filter: IFilter) => {
        const newFilters = value_filters.filter((item: IFilter) => item.value !== filter.value);

        setValueFilters(newFilters);

        const newDataFilters = dataFilters.map((item: DataFilterItem) => {
            if (item.value === filter.value) return { ...item, hide: false };
            return item;
        });

        setDataFilters(newDataFilters);
    };

    const updateFilter = (filter: any, item: any) => {
        const newFilter = value_filters.map((f: any) => {
            if (f.value === filter.value) return { ...f, value_filter: item };
            return f;
        });

        setValueFilters(newFilter);
    };

    const onSelectFilter = ({ _, key }: any) => {
        const filter = dataFilters.find((item) => item.value === key);

        if (filter) {
            setValueFilters([...value_filters, filter]);

            const newDataFilters = dataFilters.map((item) => {
                if (item.value === key) return { ...item, hide: true };
                return item;
            });

            setDataFilters(newDataFilters);
        }
    };

    useEffect(() => {
        const visibleFilters = omitBy(filters, isUndefined);
        const keyFilters = Object.keys(visibleFilters);
        let newValueFitlers: IFilter[] = [];

        dataFilters.forEach((item) => {
            if (keyFilters.includes(item.value)) {
                newValueFitlers = [
                    ...newValueFitlers,
                    {
                        ...pick(item, ['title', 'value', 'filters']),
                        value_filter: visibleFilters[item.value],
                    },
                ];
            }
        });

        setValueFilters(newValueFitlers);

        const newDateFitlers = dataFilters.map((item) => {
            if (keyFilters.includes(item.value)) {
                return { ...item, hide: true };
            }
            return { ...item, hide: false };
        });

        setDataFilters(newDateFitlers);
    }, [filters, visible]);

    const dataFiltersShow = dataFilters.filter((item: DataFilterItem) => !item.hide);

    const overlayContent = (
        <div>
            <Space style={{ width: '100%' }} size={10} direction='vertical'>
                {value_filters.length > 0 && (
                    <Space style={{ width: '100%' }} size={15} direction='vertical'>
                        {value_filters.map((filter: DataFilterItem) => {
                            return (
                                <FilterRow
                                    key={filter.value}
                                    filter={filter}
                                    removeFilter={removeFilter}
                                    updateFilter={updateFilter}
                                />
                            );
                        })}
                    </Space>
                )}

                {dataFiltersShow.length > 0 && (
                    <Dropdown
                        trigger={['click']}
                        overlay={
                            <Menu onClick={onSelectFilter}>
                                {dataFiltersShow.map((filter: DataFilterItem) => (
                                    <Menu.Item key={filter.value}>{filter.title}</Menu.Item>
                                ))}
                            </Menu>
                        }
                    >
                        <BtnDropdown> Thêm bộ lọc</BtnDropdown>
                    </Dropdown>
                )}

                <Button type='primary' onClick={handleFilter}>
                    Lọc
                </Button>
            </Space>
        </div>
    );

    return (
        <Popover
            content={overlayContent}
            placement='bottom'
            trigger='click'
            visible={visible}
            onVisibleChange={toggle}
            destroyTooltipOnHide
        >
            <BtnDropdown>{title}</BtnDropdown>
        </Popover>
    );
};

export { FilterDropdown };
