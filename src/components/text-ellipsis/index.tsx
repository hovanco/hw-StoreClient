import React, { ReactNode } from 'react';
import './style.less';

interface Props {
    children: ReactNode;
    width?: number | string;
}

const TextEllipsis = (props: Props) => {
    return (
        <span className="text-ellipsis" style={{ width: props.width }}>
            {props.children}
        </span>
    );
};

export default TextEllipsis;
