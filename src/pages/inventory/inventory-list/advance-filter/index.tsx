import React, { FC, useState, useMemo, useEffect } from 'react';

import { find, isEqual } from 'lodash';

import { Col, Popover, Row, Select, Space } from 'antd';
import RComponent from './components';
import iconTrash from '../../../../assets/images/ic-trash-blue.svg';
import { InsaButton } from '../../../../components';
import { CaretDownOutlined } from '@ant-design/icons';

import dataFilterInventory, { IFilterOption } from './data';
import { useInventoryTable } from '../context';

import './index.less';

interface Props {}

export interface ILocalFilter extends IFilterOption {
    value?: any;
}

const AdvanceFilter: FC<Props> = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [localFilter, setLocalFilter] = useState<ILocalFilter[]>([]);
    const [filterOptions, setFilterOptions] = useState<IFilterOption[]>(dataFilterInventory);

    const { filter, advanceFilterChange } = useInventoryTable();

    useEffect(() => {
        let { status, categoryId, brandId } = filter;

        const filtersToggle: string[] = [];
        let newLocalFilter = localFilter
            .map((item: ILocalFilter) => {
                if (item.id === 'status') {
                    if (item.value && !status) {
                        filtersToggle.push('status');
                    }
                    return { ...item, value: status };
                }
                if (item.id === 'categoryId') {
                    if (item.value && !categoryId) {
                        filtersToggle.push('categoryId');
                    }
                    return { ...item, value: categoryId };
                }
                if (item.id === 'brandId') {
                    if (item.value && !brandId) {
                        filtersToggle.push('brandId');
                    }
                    return { ...item, value: brandId };
                }

                return item;
            })
            .filter((item: ILocalFilter) => item.value !== undefined);

        if (!isEqual(newLocalFilter, localFilter)) setLocalFilter(newLocalFilter);

        toggleUseStatusFilterOptionById(filtersToggle);
        // eslint-disable-next-line
    }, [filter.status, filter.categoryId, filter.brandId]);

    const toggle = () => setVisible(!visible);

    const addNewFilterItem = (key: string) => {
        let newFilterItem: any = find(filterOptionsNotUsed, ['id', key]);

        if (newFilterItem) {
            setLocalFilter([...localFilter, newFilterItem]);
            toggleUseStatusFilterOptionById([newFilterItem.id]);
        }
    };

    const filterOptionsNotUsed = useMemo(() => {
        return filterOptions.filter((item: IFilterOption) => !item.used);
    }, [filterOptions]);

    const toggleUseStatusFilterOptionById = (filterOptionId: string[]) => {
        let newFilterOptions = filterOptions.map((item: IFilterOption) => {
            if (filterOptionId.includes(item.id)) return { ...item, used: !item.used };

            return item;
        });

        setFilterOptions(newFilterOptions);
    };

    const changeFilterItem = (oldKey: string, newKey: string) => {
        let newLocalFilter = localFilter.map((item: ILocalFilter) => {
            if (item.id === oldKey) return { ...item, id: newKey, value: undefined };

            return item;
        });

        setLocalFilter(newLocalFilter);
        toggleUseStatusFilterOptionById([oldKey, newKey]);
    };

    const removeFilterItem = (key: string) => {
        let newLocalFilter = localFilter.filter((item: ILocalFilter) => item.id !== key);

        setLocalFilter(newLocalFilter);
        toggleUseStatusFilterOptionById([key]);
    };

    const applyFilter = () => {
        let newFilterContext = localFilter
            .filter((i: ILocalFilter) => i.value !== undefined)
            .reduce((prevValue, currValue) => {
                return { ...prevValue, [currValue.id]: currValue.value };
            }, {});

        advanceFilterChange(newFilterContext);
        toggle();
    };

    const filterValueChange = (filterItem: ILocalFilter) => {
        let newLocalFilter = localFilter.map((item: ILocalFilter) => {
            if (item.id === filterItem.id) return filterItem;

            return item;
        });

        setLocalFilter(newLocalFilter);
    };

    return (
        <Popover
            title=""
            arrowContent={null}
            style={{ width: 460 }}
            trigger="click"
            visible={visible}
            onVisibleChange={toggle}
            overlayClassName="advance-filter-modal"
            content={
                <>
                    <Row style={{ width: 460 }} gutter={[0, 8]}>
                        <Col span={24}>
                            <Space direction="vertical">
                                {localFilter.map((item: ILocalFilter) => (
                                    <Row gutter={8}>
                                        <Col className="filter-key-col">
                                            <Select
                                                style={{ minWidth: 136 }}
                                                value={item.id}
                                                onChange={(value: string) =>
                                                    changeFilterItem(item.id, value)
                                                }
                                                suffixIcon={<CaretDownOutlined />}
                                            >
                                                {filterOptions
                                                    .filter((option: IFilterOption) => {
                                                        return (
                                                            option.id === item.id || !option.used
                                                        );
                                                    })
                                                    .map((option: IFilterOption) => (
                                                        <Select.Option
                                                            value={option.id}
                                                            key={option.id}
                                                        >
                                                            {option.name}
                                                        </Select.Option>
                                                    ))}
                                            </Select>
                                        </Col>
                                        <Col flex={1} className="filter-value-col">
                                            <RComponent
                                                filter={item}
                                                onChange={filterValueChange}
                                            />
                                        </Col>
                                        <Col className="filter-action-col">
                                            <InsaButton
                                                icon={<img src={iconTrash} alt="icon" />}
                                                onClick={() => removeFilterItem(item.id)}
                                            ></InsaButton>
                                        </Col>
                                    </Row>
                                ))}
                            </Space>
                        </Col>
                        {localFilter.length < filterOptions.length && (
                            <Col span={24}>
                                <Space>
                                    <Select
                                        style={{ minWidth: 136 }}
                                        value={'root'}
                                        onChange={addNewFilterItem}
                                        suffixIcon={<CaretDownOutlined />}
                                    >
                                        <Select.Option value="root">Thêm bộ lọc</Select.Option>
                                        {filterOptionsNotUsed.map((item: IFilterOption) => (
                                            <Select.Option value={item.id} key={item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Space>
                            </Col>
                        )}

                        <Col span={24}>
                            <InsaButton
                                style={{
                                    backgroundColor: '#6c6fbf',
                                    color: '#fff',
                                    width: 136,
                                }}
                                onClick={applyFilter}
                            >
                                Lọc
                            </InsaButton>
                        </Col>
                    </Row>
                </>
            }
        >
            <InsaButton>Lọc sản phẩm</InsaButton>
        </Popover>
    );
};
export default AdvanceFilter;
