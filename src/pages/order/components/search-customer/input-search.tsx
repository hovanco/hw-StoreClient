import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { FC, useRef } from 'react';
import useKey from '../../../../hook/useKey';

interface Props {
    onChange: (text: string) => void;
    setFocus?: () => void;
}

const InputSearch: FC<Props> = ({ onChange, setFocus }) => {
    const inputRef = useRef<any>();

    const focusInput = () => {
        inputRef.current.focus();
        if (setFocus) setFocus();
    };

    useKey({ key: 'F3', callback: focusInput });

    return (
        <Input
            ref={inputRef}
            prefix={<SearchOutlined />}
            style={{ width: '100%' }}
            placeholder="Số điện thoại/ Tên khách hàng ( F3)"
            allowClear
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
    );
};

export default InputSearch;
