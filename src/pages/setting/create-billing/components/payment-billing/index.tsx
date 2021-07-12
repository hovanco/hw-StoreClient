import { Col, Row, Space, Typography } from 'antd';
import React, { FC } from 'react';
import formatMoney from '../../../../../helper/format-money';
import { IPackageBiling } from '../../../list-billings/package-biling';
import { useBilling } from '../../state/context';
import CouponInput from '../coupon-input';
import SubmitBilling from '../submit-billing';
import './payment-billing.less';

const { Text } = Typography;
interface Props {}

const PaymentBilling: FC<Props> = () => {
    const { packagesSelect, billingCycle, transactionCode } = useBilling();

    const price = packagesSelect.reduce(
        (prevItem, item: IPackageBiling) => prevItem + item?.price * billingCycle,
        0
    );

    return (
        <>
            <Space size={12} direction="vertical">
                <Row gutter={10} align="middle" className="transaction-code-view">
                    <Col span={9}>
                        <Text className="label">Mã đơn hàng</Text>
                    </Col>
                    <Col span={15} className="transaction-code">
                        : {transactionCode}
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={9}>
                        <Text className="label">Tạm tính</Text>
                    </Col>
                    <Col span={15}>: {formatMoney(price)}VNĐ</Col>
                </Row>
                <Text className="label">Code giảm giá/ Coupon</Text>
                <CouponInput />
            </Space>
            <Row gutter={10}>
                <Col span={9} className="label">
                    TỔNG THANH TOÁN
                </Col>
                <Col span={15} className="label">
                    : {formatMoney(price)}VNĐ
                </Col>
            </Row>
            <SubmitBilling />
        </>
    );
};

export default PaymentBilling;
