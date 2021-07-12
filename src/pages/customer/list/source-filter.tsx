import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../../reducers/storeState/reducer';

import { Select, Typography } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { useCustomerTable } from './context';

const SourceFilter: FC = () => {
    const listSaleChannel = useSelector(({ store }: { store: IStoreState }) => store.data);

    const { filter, selectFilterSource } = useCustomerTable();

    const handleSelectFilterSource = (value: string) => {
        if (value === 'root') selectFilterSource(undefined);
        else selectFilterSource(value);
    };

    return (
        <>
            <Typography.Text className='source-filter'>Lọc theo nguồn</Typography.Text>
            <Select
                value={filter.source || 'root'}
                onChange={handleSelectFilterSource}
                style={{ width: 130 }}
                suffixIcon={<CaretDownOutlined />}
            >
                <Select.Option value='root'>Tất cả</Select.Option>
                {(listSaleChannel.saleChannels || []).map((saleChannel: string) => (
                    <Select.Option value={saleChannel} key={saleChannel}>
                        {saleChannel}
                    </Select.Option>
                ))}
            </Select>
        </>
    );
};

export default SourceFilter;
