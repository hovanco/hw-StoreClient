import React, { FC, useState } from 'react';
import { InsaButton } from '../../../../../components';
import { useBilling } from '../../state/context';

interface Props {}

const SubmitBilling: FC<Props> = () => {
    const { createPayment } = useBilling();
    const [loading, setLoading] = useState(false);

    async function confirmPayment() {
        try {
            setLoading(true);
            await createPayment();
        } finally {
            setLoading(false);
        }
    }

    return (
        <InsaButton
            type="primary"
            style={{ width: '100%', marginTop: 20, borderRadius: 8 }}
            onClick={confirmPayment}
            loading={loading}
        >
            THANH TOÁN
        </InsaButton>
    );
};

export default SubmitBilling;
