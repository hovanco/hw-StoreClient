import React, { FC, ReactElement, memo } from 'react';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

interface Props {
    show: boolean;
    onClick: () => void;
}

const IconMenu: FC<Props> = ({ show, onClick }): ReactElement => {
    const renderIconMenu: ReactElement = show ? <CloseOutlined /> : <MenuOutlined />;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={onClick}>
            {renderIconMenu}
        </div>
    );
};

export default memo(IconMenu);
