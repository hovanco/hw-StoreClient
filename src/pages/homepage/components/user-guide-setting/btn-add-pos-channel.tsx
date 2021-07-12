import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import storeApi from '../../../../api/store-api';
import { InsaButton } from '../../../../components';
import { POS_URL } from '../../../../configs/vars';
import { SaleChannelId } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import types from '../../../../reducers/storeState/type';

const BtnAddPosChannel: FC = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const store = useSelector((state: IState) => state.store.data);

    const gotoPosChannel = () => {
        window.open(POS_URL, '_blank');
    };

    const addPosChannel = async () => {
        if (store.saleChannels?.includes(SaleChannelId.POS)) {
            gotoPosChannel();
            return;
        }

        try {
            setLoading(true);

            const newStore = await storeApi.updateStore(store._id as string, {
                saleChannels: [...(store.saleChannels || []), SaleChannelId.POS],
            });

            dispatch({
                type: types.SET_STORE,
                payload: newStore,
            });

            setLoading(false);
            gotoPosChannel();
            return;
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <InsaButton type="primary" onClick={addPosChannel} loading={loading}>
            Trải nghiệm ngay
        </InsaButton>
    );
};

export default BtnAddPosChannel;
