import { Card, Col, Form, Row, Space, Typography } from 'antd';
import React, { FC } from 'react';
import BillingCycle from './components/billing-cycle';
import PaymentMethod from './components/payment-method';
import PackagesBilling from './components/packages-billing';
import ValueBilling from './components/value-billing';
import PaymentBilling from './components/payment-billing';
import './style.less';
import LabelCard from './components/label-card';
import icEcommerceMoney from '../../../assets/images/ic-ecommerce-money.svg';
import icActionsCalendar from '../../../assets/images/ic-actions-calendar.svg';
import icEcommerceTag from '../../../assets/images/ic-ecommerce-tag.svg';
import BannerSale from './components/banner-sale';
import PackageName from '../list-billings/components/package-name';
import { useBilling } from './state/context';
import { IPackageBiling } from '../list-billings/package-biling';
import * as queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { BillingPeriods, EBillingPackageType, EBillingPaymentType } from '../../../api/billing-api';

const { Text } = Typography;
interface Props {
    reorder: boolean;
}
const CreateBilling: FC<Props> = ({ reorder }) => {
    const history = useHistory();
    const title = reorder ? 'Thêm gói dịch vụ' : 'Chọn gói dịch vụ';
    const { packagesNeedExtend, genTransationCode, resetTransactionCode, init } = useBilling();

    const searchState: {
        packagesSelect?: string;
        billingCycle?: string;
        reorder?: string;
    } = queryString.parse(history.location.search);
    const { packagesSelect, billingCycle } = searchState;

    React.useEffect(() => {
        genTransationCode();
        init(
            packagesSelect ? parseInt(packagesSelect) : EBillingPackageType.Pos,
            EBillingPaymentType.BankTransfer,
            billingCycle ? parseInt(billingCycle) : BillingPeriods.SixMonths,
            !!reorder || false,
        );
        return () => {
            resetTransactionCode();
        };
    }, []);

    return (
        <>
            <Form layout='vertical'>
                <Row gutter={24} justify='space-between'>
                    <Col span={16} className='form-billing'>
                        {reorder && (
                            <Space>
                                {packagesNeedExtend.map((item: IPackageBiling) => (
                                    <Row
                                        key={item.id}
                                        align='middle'
                                        className='info-package-reorder'
                                    >
                                        <Col>
                                            <PackageName
                                                title={item?.alias}
                                                bgColor={item?.color}
                                            />
                                        </Col>
                                        <Col className='info'>
                                            <Text className='name-package'>{item?.package}</Text>
                                            <br />
                                            <Text>{item?.name}</Text>
                                        </Col>
                                    </Row>
                                ))}
                            </Space>
                        )}
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <LabelCard icon={icEcommerceTag} title={title} />
                                <PackagesBilling reorder={reorder} />
                                <LabelCard
                                    icon={icActionsCalendar}
                                    title='Chọn chu kì thanh toán'
                                />
                                <BillingCycle />
                                <LabelCard
                                    icon={icEcommerceMoney}
                                    title='Chọn phương thức thanh toán'
                                />
                                <PaymentMethod />
                                <BannerSale
                                    title1='Ưu đãi cực SHOCK với gói'
                                    title2='INSA OMNI'
                                    title3='Mua 6 tháng tặng 1 tháng - Mua 12 tháng tặng 3 tháng'
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col span={8} className='detail-pay'>
                        <div className='detail-pay-container'>
                            <Card className='card-custom' bordered={false}>
                                <Col>
                                    <Typography.Title level={5} className='title-pay'>
                                        Chi tiết thanh toán
                                    </Typography.Title>
                                </Col>
                                <ValueBilling />
                            </Card>
                            <Card
                                type='inner'
                                title='Thanh toán'
                                bordered={false}
                                className='card-custom pay'
                            >
                                <PaymentBilling />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default CreateBilling;
