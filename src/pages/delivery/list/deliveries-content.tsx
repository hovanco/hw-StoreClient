import { Col, Row, Select, Space } from 'antd';
import React from 'react';
import FilterBar from '../../order/list/filter-bar';
import FilterDropdownOrder from '../../order/list/filter-dropdown-order';
import SearchOrder from '../../order/list/search-order';
import StatusSelect from '../../order/list/status-select';
import { DeliveriesTable } from './components';

const listAction = [
    { value: 'Picking', label: 'In phiếu giao hàng' },
    { value: 'Picked', label: 'In hướng dẫn đóng gói' },
    { value: 'Storing', label: 'Cập nhật nhanh' },
    { value: 'Delivering', label: 'Đối soát' },
];

function DeliveriesContent() {
    const handleSelectStatus = (value: string) => {};

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Row justify="space-between">
                    <Col>
                        <Space size="middle">
                            <StatusSelect />

                            {/* TODO: Show after add feature */}
                            {/* <Select
                                style={{
                                    minWidth: 150,
                                }}
                                value={'root'}
                                onChange={(value) => handleSelectStatus(value as string)}
                            >
                                <Select.Option value="root">Thao tác</Select.Option>
                                {listAction.map((action, index) => (
                                    <Select.Option key={index} value={action.value}>
                                        {action.label}
                                    </Select.Option>
                                ))}
                            </Select> */}
                        </Space>
                    </Col>
                    <Col>
                        <Space size="middle">
                            <FilterDropdownOrder />

                            <SearchOrder />
                        </Space>
                    </Col>
                </Row>
            </Col>

            <FilterBar />

            <Col span={24}>
                <DeliveriesTable />
            </Col>
        </Row>
    );
}

export default DeliveriesContent;
