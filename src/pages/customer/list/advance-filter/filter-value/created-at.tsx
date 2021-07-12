import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

interface Props {
    onChange?: Function;
    value: any;
}

const { RangePicker } = DatePicker;

const CreatedAt = (props: Props) => {
    const onChange = (values: any) => {
        const dates = values
            ? [moment(values[0]).startOf('day').valueOf(), moment(values[1]).endOf('day').valueOf()]
            : [undefined, undefined];

        props.onChange && props.onChange(dates);
    };

    return (
        <RangePicker
            onChange={onChange}
            format="DD/MM/YYYY"
            value={
                props.value
                    ? [moment(Number(props.value[0])), moment(Number(props.value[1]))]
                    : undefined
            }
        />
    );
};

export default CreatedAt;
