import { Input } from 'antd';
import React, { useState, FC, useEffect } from 'react';
import { useOrdersContext } from './state/context';

interface Props {}

const SearchOrder: FC<Props> = () => {
    const [text, setText] = useState<string>();
    const { changeTextSearch, search } = useOrdersContext();

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSearch = (value: string) => {
        changeTextSearch(value);
    };

    useEffect(() => {
        if (search && search?.length > 0) {
            setText(search);
        }
    }, [search]);

    return (
        <Input.Search
            key="search"
            placeholder="Tìm kiếm đơn hàng"
            onChange={onChangeText}
            onSearch={handleSearch}
            style={{ width: 330 }}
            allowClear
            value={text}
        />
    );
};

export default SearchOrder;
