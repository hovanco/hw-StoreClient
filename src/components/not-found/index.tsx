import { Button, Result } from 'antd';
import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    to: string;
}

const NotFound: FC<Props> = ({ title, to }) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle={title}
            extra={
                <Link to={to}>
                    <Button type="primary">Quay lại</Button>
                </Link>
            }
        />
    );
};

export default memo(NotFound);
