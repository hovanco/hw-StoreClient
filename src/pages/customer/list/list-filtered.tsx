import { Col, Tag } from 'antd';
import { isNil } from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { Gender } from '../../../constants/gender';
import { useCustomerTable } from './context';
import './list-filtered.less';

const ListFiltered: FC = () => {
    const { filter, removeFilterByKey } = useCustomerTable();

    const { gender, createdAt, dateOfBirth } = filter;

    return (
        <Col span={24} className="list-filter-customer-tags">
            {gender && (
                <Tag closable onClose={() => removeFilterByKey('gender')}>
                    Giới tính: {gender === Gender.MALE ? 'Nam' : 'Nữ'}
                </Tag>
            )}

            {createdAt && (
                <Tag closable onClose={() => removeFilterByKey('createdAt')}>
                    Thời gian tạo:{' '}
                    {createdAt.map((item) => moment(Number(item)).format('DD/MM/YYYY')).join(' - ')}
                </Tag>
            )}

            {!isNil(dateOfBirth) && (
                <Tag closable onClose={() => removeFilterByKey('dateOfBirth')}>
                    Ngày sinh: {moment(dateOfBirth.value, 'DD/MM/YYYY').format('DD/MM')}
                </Tag>
            )}
        </Col>
    );
};

export default ListFiltered;
