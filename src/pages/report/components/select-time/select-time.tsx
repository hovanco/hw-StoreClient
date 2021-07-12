import { DatePicker, Space } from 'antd';
import React, { FC } from 'react';
import moment from 'moment';
import { getEndTime, getStartTime } from '../../../../helper/get-time';

interface Props {
    title?: string;
    onChange: (data: { startTime: number; endTime: number }) => void;
}

const { RangePicker } = DatePicker;

const SelectTime: FC<Props> = ({ title = 'Thời gian:', onChange }) => {
    const handleOnChange = (values: any) => {
        const times = values
            ? {
                  startTime: moment(values[0]).startOf('day').valueOf(),
                  endTime: moment(values[1]).endOf('day').valueOf(),
              }
            : {
                  startTime: getStartTime({
                      type: 'month',
                      date: Date.now(),
                  }),
                  endTime: getEndTime({
                      type: 'month',
                      date: Date.now(),
                  }),
              };

        onChange(times);
    };

    return (
        <Space>
            <span>{title}</span>
            <RangePicker picker="date" onChange={handleOnChange} />
        </Space>
    );
};

export { SelectTime };
