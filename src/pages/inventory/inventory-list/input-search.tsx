import React, { FC, useState } from 'react';

import { useInventoryTable } from './context';

import { Input } from 'antd';

const InputSearch: FC = () => {
    const { searchChange } = useInventoryTable();

    const [searchText, setSearchText] = useState<string>('');

    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        searchChange(searchText);
    };

    return (
        <Input.Search
            key="search"
            placeholder="Tìm kiếm sản phẩm"
            onChange={onSearchTextChange}
            onSearch={handleSearch}
            style={{ width: 330 }}
            value={searchText}
        />
    );
};

export default InputSearch;
