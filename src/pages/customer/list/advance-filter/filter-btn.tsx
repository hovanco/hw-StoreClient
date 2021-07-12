import React, { FC } from 'react';

import { InsaButton } from '../../../../components';
import { Typography } from 'antd';

interface Props {
    onClick: () => void;
}

const FilterButton: FC<Props> = ({ onClick }) => {
    return (
        <InsaButton className="filter-btn" onClick={onClick}>
            <Typography.Text type="secondary">Lọc</Typography.Text>
        </InsaButton>
    );
};

export default FilterButton;
