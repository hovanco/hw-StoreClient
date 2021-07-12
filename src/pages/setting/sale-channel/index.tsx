import Title from 'antd/lib/typography/Title';
import React, { FC } from 'react';
import { BackLink, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import SaleChannelTable from './components/sale-channel-table';
import { ProviderSaleChannel } from './state';

const title = 'Kênh bán hàng';

const SaleChannel: FC = () => {
    return (
        <ProviderSaleChannel>
            <DefaultLayout title={title}>
                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to="/setting" text="Cài đặt" />
                            <Title level={3}>{title}</Title>
                        </>
                    }
                />
                <div className="content">
                    <SaleChannelTable />
                </div>
            </DefaultLayout>
        </ProviderSaleChannel>
    );
};

export default SaleChannel;
