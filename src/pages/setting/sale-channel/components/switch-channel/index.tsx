import { Switch } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import storeApi from '../../../../../api/store-api';
import { SaleChannelId } from '../../../../../models';
import { IStoreState } from '../../../../../reducers/storeState/reducer';
import types from '../../../../../reducers/storeState/type';

interface Props {
    used: boolean;
    idChannel: SaleChannelId;
}

const SwitchChannel: FC<Props> = ({ used, idChannel }) => {
    const store = useSelector(({ store }: { store: IStoreState }) => store.data);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const onChange = async (value: any) => {
        if (store) {
            try {
                setLoading(true);

                let newSaleChannels = store.saleChannels || [];

                newSaleChannels = value
                    ? [...newSaleChannels, idChannel]
                    : newSaleChannels.filter((item) => item !== idChannel);

                const response = await storeApi.updateStore(store._id as string, {
                    saleChannels: newSaleChannels,
                });

                dispatch({
                    type: types.SET_STORE,
                    payload: response,
                });
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
    };

    return <Switch checked={used} onChange={onChange} loading={loading} />;
};

export default SwitchChannel;
