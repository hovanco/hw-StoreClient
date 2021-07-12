import React, { FC } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useStocks } from './hooks/stocks';

const SearchInventory: FC = () => {
    const { filter, setFilter } = useStocks();

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, search: event.target.value });
    };

    return (
        <div>
            <Input
                placeholder="Tìm kho hàng"
                prefix={<SearchOutlined />}
                width={'100%'}
                value={filter.search}
                onChange={handleSearchTextChange}
            />
        </div>
    );
};

export default SearchInventory;
