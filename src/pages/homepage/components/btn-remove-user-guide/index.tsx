import { Button, message } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStorePreference } from '../../../../api/user-store-preference-api';
import { IState } from '../../../../store/rootReducer';
import { useUserGuide } from '../../state';

const BtnRemoveUserGuide: FC = () => {
    const { updateUserGuide } = useUserGuide();
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(false);

    const removeUserGuide = async () => {
        setLoading(true);
        try {
            await updateUserStorePreference({
                storeId: store._id as string,
                hideNewUserGuide: true,
            });

            updateUserGuide(true);
        } catch (error) {
            setLoading(false);
            message.error('Đã xảy ra lỗi, vui lòng thử lại');
        }
    };

    return (
        <Button type="link" onClick={removeUserGuide} loading={loading}>
            Bỏ qua hướng dẫn
        </Button>
    );
};

export default BtnRemoveUserGuide;
