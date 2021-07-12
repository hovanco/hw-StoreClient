import { Input } from 'antd';
import * as queryString from 'query-string';
import { debounce } from 'lodash';
import React, { FC, useEffect, useState, memo } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useCustomerTable } from './context';

const InputSearch: FC = () => {
    const { changeFilterSearch, filter } = useCustomerTable();
    const location = useLocation();
    const history = useHistory();
    const [searchString, setSearchString] = useState<string | undefined>(filter.search);

    const searchObj = queryString.parse(location.search);

    const onChangeText = (e: any) => {
        setSearchString(e.target.value);
    };

    const handleChangeSearchText = debounce((searchText: string) => {
        const searchString = queryString.stringify({
            ...searchObj,
            search: searchText.length === 0 ? undefined : searchText,
        });

        history.push({
            pathname: location.pathname,
            search: searchString,
        });

        changeFilterSearch(searchText);
    }, 300);

    useEffect(() => {
        setSearchString(filter.search);
    }, [filter.search]);

    return (
        <Input.Search
            key="search"
            placeholder="Tìm kiếm khách hàng"
            onSearch={handleChangeSearchText}
            style={{ width: 330 }}
            allowClear
            value={searchString}
            onChange={onChangeText}
        />
    );
};

export default memo(InputSearch);
