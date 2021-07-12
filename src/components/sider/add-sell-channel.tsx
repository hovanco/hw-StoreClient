import { Avatar, message, Modal, Space } from 'antd';
import React, { FC, useEffect, useMemo, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import storeApi from '../../api/store-api';
import iconAddCircle from '../../assets/images/ic-actions-add.svg';
import { SALE_CHANNEL_DATA } from '../../constants/sale-channels';
import { SaleChannel } from '../../models';
import { IStoreState } from '../../reducers/storeState/reducer';
import { storeAction } from '../../reducers/storeState/action';
import types from '../../reducers/storeState/type';
import { InsaButton, Loading } from '../index';
import './add-sell-channel.less';

interface Props {
    children?: ReactElement;
}

const AddSellChannel: FC<Props> = ({ children }) => {
    const storeObj = useSelector(({ store }: { store: IStoreState }) => store.data);

    const enableSaleChannels = useSelector(
        ({ store }: { store: IStoreState }) => store.enableSaleChannels
    );

    const dispatch = useDispatch();

    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(storeAction.getEnableSaleChannels());

        // eslint-disable-next-line
    }, []);

    const getEnabledChannelData = useMemo(() => {
        return SALE_CHANNEL_DATA.filter((item: SaleChannel) =>
            enableSaleChannels.includes(item.id)
        ).map((item: SaleChannel) => {
            if (storeObj?.saleChannels?.includes(item.id)) return { ...item, used: true };

            return item;
        });

        // eslint-disable-next-line
    }, [enableSaleChannels, storeObj.saleChannels]);

    const handleAddSaleChannel = async (channel: SaleChannel) => {
        try {
            setLoading(true);

            let newSaleChannels = storeObj.saleChannels
                ? [...storeObj.saleChannels, channel.id]
                : [channel.id];

            let response = await storeApi.updateStore(storeObj._id as string, {
                saleChannels: newSaleChannels,
            });

            dispatch({
                type: types.SET_STORE,
                payload: response,
            });

            message.success(`Thêm kênh bán hàng "${channel.menuTitle}" thành công!`);
        } catch {
            message.success(`Thêm kênh bán hàng "${channel.menuTitle}" thất bại!`);
        } finally {
            setLoading(false);
        }
    };

    const renderButton = () => {
        if (children) {
            return React.cloneElement(children, { onClick: () => setVisible(true) });
        }

        return (
            <span
                className="nav__icon anticon"
                style={{ backgroundImage: `url(${iconAddCircle})` }}
                onClick={() => setVisible(true)}
            ></span>
        );
    };

    return (
        <>
            {renderButton()}

            <Modal
                visible={visible}
                title="Thêm kênh bán hàng"
                footer={null}
                closable={false}
                onCancel={() => setVisible(false)}
                wrapClassName="modal-add-sell-channel"
                width={600}
            >
                {loading && <Loading full />}
                <Space className="channel-section" direction="vertical" size={23}>
                    {getEnabledChannelData.map((channel: SaleChannel, idx: number) => (
                        <Space key={`channel_${idx}`} align="start">
                            <Avatar
                                className="channel-section__avatar"
                                src={channel.icon}
                                shape="square"
                                size={40}
                            />
                            <Space
                                className="channel-section__content"
                                direction="vertical"
                                size={6}
                            >
                                <div className="channel-section__content-name">{channel.title}</div>
                                <div className="channel-section__content-description">
                                    {channel.description}
                                </div>
                            </Space>
                            <span>
                                {channel.used ? (
                                    <InsaButton disabled style={{ width: 70, padding: 0 }}>
                                        Đã thêm
                                    </InsaButton>
                                ) : (
                                    <InsaButton
                                        type="primary"
                                        style={{ width: 70 }}
                                        onClick={() => handleAddSaleChannel(channel)}
                                    >
                                        Thêm
                                    </InsaButton>
                                )}
                            </span>
                        </Space>
                    ))}
                    <div className="boundary-line"></div>
                    <Space className="channel-section__footer" align="start">
                        <span
                            className="primary-text cursor-pointer"
                            onClick={() => {
                                setVisible(false);
                                dispatch(push('/setting/sale-channel'));
                            }}
                        >
                            + Quản lý, cài đặt kênh bán hàng
                        </span>
                        <InsaButton onClick={() => setVisible(false)} style={{ width: 120 }}>
                            Thoát
                        </InsaButton>
                    </Space>
                </Space>
            </Modal>
        </>
    );
};

export default AddSellChannel;
