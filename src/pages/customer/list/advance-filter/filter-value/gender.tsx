import React, { FC } from 'react';

import { InsaButton } from '../../../../../components';
import { Typography } from 'antd';

import { Gender } from '../../../../../constants/gender';

interface Props {
    value: any;
    onChange?: Function;
}

const Status: FC<Props> = ({ value, onChange }) => {
    return (
        <>
            <InsaButton
                className={value === Gender.MALE ? 'filter-status-blue' : 'filter-status-gray'}
                onClick={() => onChange && onChange(Gender.MALE)}
                style={{ width: 130 }}
            >
                <Typography.Text type="secondary">Nam</Typography.Text>
            </InsaButton>
            <InsaButton
                className={value === Gender.FEMALE ? 'filter-status-blue' : 'filter-status-gray'}
                onClick={() => onChange && onChange(Gender.FEMALE)}
                style={{ width: 130 }}
            >
                <Typography.Text type="secondary">Nữ</Typography.Text>
            </InsaButton>
        </>
    );
};

export default Status;
