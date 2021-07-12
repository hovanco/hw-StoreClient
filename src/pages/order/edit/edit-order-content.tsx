import { Space, Typography } from 'antd';
import React, { FC } from 'react';
import { BackLink, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import BtnSubmitOrder from '../create/components/btn-submit-order';
import CancelEditOrder from '../create/components/cancel-edit-order';
import CreateOrder from '../create/create-order';
import { useOrder } from '../detail';

interface Props {}

const EditOrderContent: FC<Props> = () => {
    const { order } = useOrder();

    return (
        <DefaultLayout title="Sửa đơn hàng">
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink to={`/orders/order/${order?._id}`} text=" Trở lại đơn hàng" />

                        <Typography.Title level={3}>Chỉnh sửa đơn hàng</Typography.Title>
                    </>
                }
                rightContent={
                    <Space size={16}>
                        <CancelEditOrder />
                        <BtnSubmitOrder />
                    </Space>
                }
            />

            <div className="content">
                <CreateOrder />
            </div>
        </DefaultLayout>
    );
};

export default EditOrderContent;
