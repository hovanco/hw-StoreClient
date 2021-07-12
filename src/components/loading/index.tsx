import React, { FC } from 'react';
import { Spin } from 'antd';

import './loading.less';
interface Props {
    full?: boolean;
}

const Loading: FC<Props> = ({ full = false }) => {
    const className = full ? 'loading full' : 'loading';

    return (
        <div className={className}>
            <Spin />
        </div>
    );
};
export default Loading;
