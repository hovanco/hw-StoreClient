import { Space, Typography } from 'antd';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BackLink, InsaButton, Loading, PageTopWrapper } from '../../../components';
import ExpiredStore from '../../../components/expired-store';
import { useCheckExpired } from '../../../hook/useCheckExpired';
import { DefaultLayout } from '../../../layout';
import { useOrder } from '../detail';
import BtnSubmitOrder from './components/btn-submit-order';
import CreateOrder from './create-order';
import ProviderOrderNewContext from './state/context';
import { EStatusPage } from './state/interface';
import './style.less';

function AddOrder() {
    const { loading, order } = useOrder();
    const { visible, hideWarningExpired } = useCheckExpired();

    const history = useHistory();

    const dispatch = useDispatch();

    const handleCancel = () => {
        hideWarningExpired();
        dispatch(push('/orders'));
    };

    const handleBuyPackage = () => {
        hideWarningExpired();
        dispatch(push('/setting/billings/list'));
    };

    if (loading) return <Loading full />;

    return (
        <ProviderOrderNewContext order={order} statusPage={EStatusPage.NEW}>
            <DefaultLayout title="Thêm đơn hàng">
                <ExpiredStore
                    visible={visible}
                    onCancel={handleCancel}
                    onBuyPackage={handleBuyPackage}
                />

                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to="/orders/list" text="Danh sách đơn hàng" />

                            <Typography.Title level={3}>TẠO ĐƠN HÀNG</Typography.Title>
                        </>
                    }
                    rightContent={
                        <Space>
                            <InsaButton
                                style={{ width: 100 }}
                                size="middle"
                                key="cancel"
                                disabled={loading}
                                onClick={() => history.push('/orders/list')}
                            >
                                Hủy
                            </InsaButton>
                            <BtnSubmitOrder />
                            {/* TODO: Show after add feature */}
                            {/* <InsaButton icon={<QuestionCircleOutlined />}>Trợ giúp</InsaButton> */}
                        </Space>
                    }
                />
                <div className="content">
                    <CreateOrder />
                </div>
            </DefaultLayout>
        </ProviderOrderNewContext>
    );
}
export default AddOrder;
