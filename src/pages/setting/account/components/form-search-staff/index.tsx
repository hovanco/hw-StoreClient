import { Input } from 'antd';
import React, { FC } from 'react';

interface Props {
    searchStaff: (text: string) => void;
}
const FormSearchStaff: FC<Props> = ({ searchStaff }) => {
    const onSearch = (text: string) => {
        searchStaff(text);
    };

    return (
        <Input.Search
            onSearch={onSearch}
            style={{ width: 250 }}
            width={300}
            allowClear
            placeholder="Tìm kiếm tài khoản"
        />
    );
};

export default FormSearchStaff;
