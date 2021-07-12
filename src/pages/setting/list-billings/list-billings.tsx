import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, Radio, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BillingPeriods, EBillingPackageType, EBillingPaymentType } from '../../../api/billing-api';
import { BackLink, InsaButton, Loading, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { useBilling } from '../create-billing/state/context';
import PackageBiling, { IPackageBiling } from './package-biling';
import PackagesActive from './packages-active';

const { Title, Text } = Typography;

function BillingsPage() {
    const { packages, packagesActive, loading, packagesInactive, init } = useBilling();
    const [time, setTime] = useState('6');
    const [isShowActive, setIsShowActive] = useState(true);
    const history = useHistory();

    useEffect(() => {
        init(
            EBillingPackageType.Pos,
            EBillingPaymentType.BankTransfer,
            BillingPeriods.SixMonths,
            false,
        );
    }, []);

    useEffect(() => {
        setIsShowActive(packagesActive.length > 0 || packagesInactive.length > 0);
    }, [packagesActive, packagesInactive]);

    const handleChangeTime = (e: any) => {
        setTime(e.target.value);
    };

    const handleChoosePackage = (packageBiling: IPackageBiling) => {
        history.push(
            `/setting/billings/create?packagesSelect=${packageBiling.code}&billingCycle=${time}`,
        );
    };

    const showListPackage = () => setIsShowActive(false);

    const renderListPackage = () => (
        <div className='content'>
            <Space
                className='title-wrapper'
                direction='vertical'
                align='center'
                style={{ width: '100%' }}
                size={12}
            >
                <Title>Bảng giá các gói dịch vụ INSA</Title>
                <Text>
                    Hãy lựa chọn giải pháp phù hợp với nhu cầu của bạn và dùng thử miễn phí 30 ngày
                </Text>
                <Radio.Group
                    value={time}
                    onChange={handleChangeTime}
                    buttonStyle='solid'
                    size='large'
                >
                    <Radio.Button value='6'>6 tháng</Radio.Button>
                    <Radio.Button value='12'>12 tháng</Radio.Button>
                </Radio.Group>
            </Space>
            <Row gutter={[16, 62]} className='bilings-list-wrapper'>
                {packages.map((packageBiling: IPackageBiling) => (
                    <Col key={packageBiling.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                        <PackageBiling
                            packageBiling={packageBiling}
                            handleChoosePackage={handleChoosePackage}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );

    if (loading) return <Loading full />;

    return (
        <DefaultLayout title='Gói dịch vụ & thanh toán'>
            <div className='list-billings-page'>
                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to='/setting' text='Cài đặt' />

                            <Title level={3}>GÓI DỊCH VỤ & THANH TOÁN</Title>
                        </>
                    }
                    // TODO: Show after add feature
                    rightContent={
                        <Space size={14}>
                            {isShowActive && (
                                <InsaButton
                                    icon={<PlusCircleOutlined />}
                                    type='primary'
                                    onClick={showListPackage}
                                >
                                    Thay đổi gói dịch vụ
                                </InsaButton>
                            )}
                            {/* <InsaButton icon={<QuestionCircleOutlined />}>Trợ giúp</InsaButton> */}
                        </Space>
                    }
                />
                {isShowActive ? <PackagesActive /> : renderListPackage()}
            </div>
        </DefaultLayout>
    );
}

export default BillingsPage;
