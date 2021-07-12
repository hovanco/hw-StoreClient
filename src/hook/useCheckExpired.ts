import { useEffect, useState } from 'react';
import { checkRestrictAction } from '../helper/get-time';
import { useBilling } from '../pages/setting/create-billing/state/context';

export const useCheckExpired = () => {
    const { packagesActive, loading } = useBilling();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loading) {
            setVisible(checkRestrictAction(packagesActive));
        }
    }, [packagesActive, loading]);

    const hideWarningExpired = () => setVisible(false);

    return {
        visible,
        hideWarningExpired
    };
};
