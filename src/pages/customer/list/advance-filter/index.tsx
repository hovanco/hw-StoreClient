import React, { FC } from 'react';

import { PopoverProvider } from './context';
import AdvanceFilterContainer from './popover';
import './index.less';

const AdvanceFilter: FC = () => {
    return (
        <PopoverProvider>
            <AdvanceFilterContainer />
        </PopoverProvider>
    );
};

export default AdvanceFilter;
