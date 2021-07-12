import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { FC, useRef, useState } from 'react';
import useKey from '../../../../hook/useKey';

interface Props {
    onChange: (text: string) => void;
    setFocus?: () => void;
}
const InputSearch: FC<Props> = ({ onChange, setFocus }) => {
    const [text, setText] = useState<string>('');
    const inputRef = useRef<any>();

    const focusInput = () => {
        inputRef.current.focus();
        if (setFocus) setFocus();
    };

    useKey({
        key: 'F2',
        callback: focusInput,
    });

    const handleOnChange = (textSearch: string) => {
        setText(textSearch);
        onChange(textSearch);
    };

    const handleOnPress = () => {
        onChange(text);
    };

    return (
        <Input
            ref={inputRef}
            placeholder="Nhập tên sản phẩm / Quét Barcode (F2)"
            prefix={<SearchOutlined />}
            onPressEnter={handleOnPress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.value)}
            onFocus={() => onChange(text)}
            allowClear
        />
    );
};

export default InputSearch;
