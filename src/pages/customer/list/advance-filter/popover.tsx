import React, { FC } from 'react';

import { InsaButton } from '../../../../components';
import { Typography, Popover } from 'antd';
import DropdownOverlay from './dropdown-overlay';
import { CaretDownOutlined } from '@ant-design/icons';
import { usePopover } from './context';
import './index.less';

const AdvanceFilterContainer: FC = () => {
    const { visible, toggle } = usePopover();

    return (
        <Popover
            content={<DropdownOverlay />}
            trigger="click"
            placement="bottom"
            visible={visible}
            onVisibleChange={toggle}
        >
            <InsaButton>
                <Typography.Text className="advance-filter">Lọc khách hàng</Typography.Text>
                <CaretDownOutlined style={{ color: '#717171' }} />
            </InsaButton>
        </Popover>
    );
};

export default AdvanceFilterContainer;
