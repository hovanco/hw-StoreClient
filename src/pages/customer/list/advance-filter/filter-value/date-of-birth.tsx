import React, { useState } from 'react';
import { DatePicker, Row, Col, Select } from 'antd';
import moment from 'moment';
import { get, isNil } from 'lodash';

interface Props {
    onChange?: Function;
    value: any;
}

const momentFormat = 'DD/MM';

const DateOfBirth = (props: Props) => {
    const [filterDateBy, setFilterDateBy] = useState<string>(get(props,'value.filterDateBy', 'day_month'));

    const onChange = (value: any) => {
        value = value ? moment(value).format(momentFormat) : undefined;

        props.onChange && props.onChange({
            value,
            filterDateBy: value && filterDateBy,
        });
    };

    const onChangeFilter = (value: string) => {
        setFilterDateBy(value);

        const birthday = !isNil(props.value) ? props.value.value : undefined;
        birthday && props.onChange && props.onChange({
            value: birthday,
            filterDateBy: value,
        });
    }

    return (
        <Row gutter={[8, 0]}>
            <Col>
                <DatePicker
                    format={momentFormat}
                    onChange={onChange}
                    value={!isNil(props.value) && props.value.value ? moment(props.value.value, momentFormat) : undefined}
                    style={{ minWidth: 180 }}
                />
            </Col>
            <Col>
                <Select style={{ minWidth: 180 }} value={filterDateBy} onChange={onChangeFilter}>
                    <Select.Option value='day_month'>Lọc theo ngày/ tháng</Select.Option>
                    <Select.Option value='month'>Lọc theo tháng</Select.Option>
                </Select>
            </Col>
        </Row>
    );
};

export default DateOfBirth;
