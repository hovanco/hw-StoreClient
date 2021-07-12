import { Col, Row, Select, Space } from 'antd';
import { isUndefined, omitBy, isEqual, isNil } from 'lodash';
import * as queryString from 'query-string';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { TrashIcon } from '../../../../assets/icon';
import { useCustomerTable } from '../context';
import { usePopover } from './context';
import { dataOptionsAdvanceFilter, IFilterOption } from './data';
import FilterButton from './filter-btn';
import FilterValue from './filter-value';

interface IFilterData {
    name?: string;
    key: string;
    used?: boolean;
    value: any;
}

type Props = {};

const DropdownOverlay: FC<Props> = () => {
    let history = useHistory();
    const location = useLocation();
    const { filter, advanceFilterChange } = useCustomerTable();
    const { toggle, visible } = usePopover();

    const [filterData, setFilterData] = useState<IFilterData[]>([]);
    const [filterOptions, setFilterOptions] = useState<IFilterOption[]>(
        dataOptionsAdvanceFilter.filter((i: IFilterOption) => i.key.length)
    );

    const selectNewFilterItem = (key: string) => {
        toggleMarkUsedFilterOption(key);
        addNewFilterItem(key);
    };

    const addNewFilterItem = (key: string) => {
        let newFilterItem: IFilterOption = getFilterOptionByKey(key);
        let newFilterData = [...filterData, { ...newFilterItem, value: undefined }];

        setFilterData(newFilterData);

        let newFilterOptions = filterOptions.filter((item) => item.key !== key);
        setFilterOptions(newFilterOptions);
    };

    const toggleMarkUsedFilterOption = (key: string | string[]) => {
        if (typeof key === 'string') key = [key];

        let newFilterOptions: IFilterOption[] = filterOptions.map((filterOption: IFilterOption) => {
            if (key.indexOf(filterOption.key) !== -1)
                return { ...filterOption, used: !filterOption.used };

            return filterOption;
        });

        setFilterOptions(newFilterOptions);
    };

    const removeFilterItem = (key: string) => {
        let newFilterData = filterData.filter((item: IFilterData) => item.key !== key);

        setFilterData(newFilterData);
        toggleMarkUsedFilterOption(key);
    };

    const changeFilterItemKey = (newKey: string, oldKey: string) => {
        const newFilterItem = getFilterOptionByKey(newKey);
        const newFilterData: IFilterData[] = filterData.map((item: IFilterData) => {
            if (item.key === oldKey) return newFilterItem as IFilterData;

            return item;
        });

        setFilterData(newFilterData);
        toggleMarkUsedFilterOption([oldKey, newKey]);
    };

    const getFilterOptionByKey = (key: string) => {
        return filterOptions.filter((item: IFilterOption) => item.key === key)[0];
    };

    const filterItemChangeValue = (key: string, value: any) => {
        let newFilterData = filterData.map((item: IFilterData) => {
            if (item.key === key) {
                return { ...item, value };
            }

            return item;
        });

        setFilterData(newFilterData);
    };

    const handleFilter = () => {
        toggle();

        let filterProperties: any =
            filterData.length === 0
                ? dataOptionsAdvanceFilter.reduce(
                      (prevValue, currValue) => ({
                          ...prevValue,
                          [currValue.key]: undefined,
                      }),
                      {}
                  )
                : filterData
                      .filter((item) => {
                          if (item.key === 'createdAt' || item.key === 'dateOfBirth') {
                              return false;
                          }

                          return !isUndefined(item.value);
                      })
                      .reduce(
                          (prevValue, currValue) => ({
                              ...prevValue,
                              [currValue.key]: currValue.value,
                          }),
                          {}
                      );

        const createdAt = filterData.find((item) => item.key === 'createdAt' && item.value);

        if (createdAt) {
            filterProperties = {
                ...filterProperties,
                fromAt: createdAt.value[0],
                toAt: createdAt.value[1],
            };
        }

        const dateOfBirth = filterData.find((item) => item.key === 'dateOfBirth' && !isNil(item.value));

        if (dateOfBirth) {
            filterProperties = {
                ...filterProperties,
                dateOfBirth: dateOfBirth.value.value,
                filterDateBy: dateOfBirth.value.filterDateBy,
            };
        }

        let searchString = queryString.stringify(filterProperties);

        history.push({
            pathname: location.pathname,
            search: searchString,
        });

        advanceFilterChange(filterProperties);
    };

    useEffect(() => {
        const filterKeys = Object.keys(omitBy(filter, isUndefined));

        const getFilterDataExist = () => {
            if (filterKeys.length === 0) {
                return [];
            }

            let result = [];

            if (filter.gender) {
                result.push({
                    name: 'Giới tính',
                    key: 'gender',
                    used: true,
                    value: filter.gender,
                });
            }

            if (filter.dateOfBirth) {
                result.push({
                    name: 'Ngày sinh',
                    key: 'dateOfBirth',
                    used: true,
                    value: filter.dateOfBirth,
                });
            }

            if (filter.createdAt) {
                result.push({
                    name: 'Ngày tạo',
                    key: 'createdAt',
                    used: true,
                    value: filter.createdAt,
                });
            }

            return result;
        };

        const filterDataExist = getFilterDataExist();

        // setFilterData(filterDataExist);

        if (!isEqual(filterData, filterDataExist)) setFilterData(filterDataExist);

        const filterOptionsNotExist =
            filterKeys.length === 0
                ? dataOptionsAdvanceFilter
                : dataOptionsAdvanceFilter.map((item) => {
                      if (filterKeys.includes(item.key)) {
                          return { ...item, used: true };
                      }

                      return item;
                  });

        setFilterOptions(filterOptionsNotExist);

        // eslint-disable-next-line
    }, [visible, filter]);

    const filterOptionsNotUsed = filterOptions.filter((i: IFilterOption) => !i.used);

    return (
        <Space
            className="filer-order-dropdown"
            style={{ background: '#ffffff' }}
            direction="vertical"
        >
            <div>Hiển thị khách hàng theo:</div>

            {filterData.map((filterItem: IFilterData, idx: number) => (
                <Row key={`filter_item_${idx}`} gutter={[20, 16]}>
                    <Col>
                        <Select
                            style={{ minWidth: 180 }}
                            value={filterItem.key}
                            onChange={(value: string) => changeFilterItemKey(value, filterItem.key)}
                        >
                            {dataOptionsAdvanceFilter
                                .filter((i: IFilterOption) => !(i.key !== filterItem.key && i.used))
                                .map((option: IFilterOption, optionIdx: number) => (
                                    <Select.Option value={option.key} key={`option_${optionIdx}`}>
                                        {option.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Col>

                    <Col flex={1}>
                        <FilterValue
                            dataKey={filterItem.key}
                            value={filterItem.value}
                            onChange={(value: any) => filterItemChangeValue(filterItem.key, value)}
                        />
                    </Col>

                    <Col className="remove-filter-item">
                        <TrashIcon
                            style={{ color: '#848484' }}
                            onClick={() => removeFilterItem(filterItem.key)}
                        />
                    </Col>
                </Row>
            ))}

            {filterOptionsNotUsed.length > 0 && (
                <Space>
                    <Select style={{ minWidth: 180 }} value={'root'} onChange={selectNewFilterItem}>
                        <Select.Option value="root">Chọn điều kiện lọc</Select.Option>
                        {filterOptionsNotUsed.map((option: IFilterOption, optionIdx: number) => (
                            <Select.Option value={option.key} key={`option_${optionIdx}`}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            )}

            <FilterButton onClick={handleFilter} />
        </Space>
    );
};

export default DropdownOverlay;
