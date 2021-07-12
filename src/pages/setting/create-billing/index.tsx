import { Typography } from 'antd';
import * as queryString from 'query-string';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { BackLink, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { IPackageBiling } from '../list-billings/package-biling';
import BannerFooter from './components/banner-footer';
import CreateBilling from './create-billing';
import { useBilling } from './state/context';

const { Title } = Typography;

function CreateBiling() {
    const history = useHistory();
    const { packages } = useBilling();
    const searchState: {
        packagesSelect?: string;
        billingCycle?: string;
        reorder?: string;
    } = queryString.parse(history.location.search);
    const { packagesSelect, reorder } = searchState;

    const currentPackage = packages.find(
        (item: IPackageBiling) => item.code === parseInt(packagesSelect || '')
    );

    const title = searchState.reorder
        ? `GIA HẠN ${currentPackage?.package}`
        : 'THANH TOÁN GÓI DOANH NGHIỆP';

    return (
        <DefaultLayout title="Thanh toán gói doanh nghiệp">
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink to="/setting/billings/list" text="Danh sách gói dịch vụ" />

                        <Title level={3}>{title}</Title>
                    </>
                }
                // TODO: Show after add feature
                // rightContent={
                //     <InsaButton icon={<QuestionCircleOutlined />}>Trợ giúp</InsaButton>
                // }
            />
            <div className="content create-billing">
                <CreateBilling reorder={!!reorder} />
                <BannerFooter />
            </div>
        </DefaultLayout>
    );
}
export default CreateBiling;
