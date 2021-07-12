import React, { FC } from 'react';
import { InsaButton } from '../../../../../components';

interface Props {}

const SubmitBilling: FC<Props> = () => {
    const payBilling = () => {};

    return (
        <InsaButton type="primary" style={{ width: '100%', marginTop: 19 }} onClick={payBilling}>
            THANH TOÁN
        </InsaButton>
    );
};

export default SubmitBilling;
