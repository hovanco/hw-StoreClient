import { DatePicker, Select, Space } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import useVisible from '../../hook/useVisible';

export enum ETypeTime {
    today = 0,
    yesterday,
    seven_days_ago,
    month,
    custom,
}

interface Props {
    value?: ETypeTime;
    onChange: ({ typeTime, times }: { typeTime: ETypeTime; times?: number[] }) => void;
}

const times = [
    {
        type: ETypeTime.today,
        title: 'Hôm nay',
    },
    {
        type: ETypeTime.yesterday,
        title: 'Hôm qua',
    },
    {
        type: ETypeTime.seven_days_ago,
        title: '7 ngày trước',
    },

    {
        type: ETypeTime.month,
        title: 'Tháng này',
    },

    {
        type: ETypeTime.custom,
        title: 'Tùy chọn',
    },
];

const SelectTime: FC<Props> = ({ value = ETypeTime.month, onChange }) => {
    const { visible, setVisible } = useVisible();

    const selectTypeTime = (typeTime: ETypeTime) => {
        if (typeTime === ETypeTime.custom) {
            setVisible(true);
        } else {
            onChange({
                typeTime,
            });
            setVisible(false);
        }
    };

    const selectDates = (dates: any) => {
        if (!dates) {
            return;
        }
        const formatDates = dates.map((date: moment.Moment) => moment(date).valueOf());

        onChange({
            typeTime: ETypeTime.custom,
            times: formatDates,
        });
    };

    const style = { minWidth: 120 };

    return (
        <Space>
            <Select style={style} defaultValue={value} onChange={selectTypeTime}>
                {times.map((item: any) => (
                    <Select.Option key={item.type} value={item.type}>
                        {item.title}
                    </Select.Option>
                ))}
            </Select>

            {visible && <DatePicker.RangePicker onChange={selectDates} />}
        </Space>
    );
};

export default SelectTime;
