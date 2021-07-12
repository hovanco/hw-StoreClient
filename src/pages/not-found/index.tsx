import React, { memo } from 'react';
import { NotFound } from '../../components';
import { BaseLayout } from '../../layout';

const title = 'Trang web không tồn tại';

function NotFoundPage() {
    return (
        <BaseLayout title={title}>
            <NotFound title={title} to="/" />
        </BaseLayout>
    );
}

export default memo(NotFoundPage);
