import { Col, Collapse, Divider, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import formatMoney from '../../../../../helper/format-money';
import { IPackageBiling } from '../../../list-billings/package-biling';
import { useBilling } from '../../state/context';
import './value-billing.less';
import icChevronDown from '../../../../../assets/images/ic-chevron-down.svg';
import formatDescription from '../../../../../helper/format';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ValueBilling = () => {
    const { packagesSelect, billingCycle } = useBilling();

    const calcPricePackage = (item: IPackageBiling) => {
        return `${formatMoney(item.price * billingCycle)} VNĐ / ${billingCycle} THÁNG`;
    };

    return (
        <Row gutter={[0, 10]} style={packagesSelect?.length > 0 ? { paddingTop: 24 } : {}}>
            {packagesSelect?.map((item, index) => (
                <div key={index}>
                    <Col span={24} className="package-billing">
                        <Row className="label-pay-billing" align="middle">
                            <Space size={20}>
                                <Col>
                                    <Title level={5} style={{ color: item.color, marginBottom: 0 }}>
                                        {item.package}
                                    </Title>
                                </Col>
                                <Col>
                                    <Text>{calcPricePackage(item)} (đã bao gồm thuế)</Text>
                                </Col>
                            </Space>
                        </Row>
                        <Collapse
                            collapsible="header"
                            defaultActiveKey={['1']}
                            expandIconPosition="right"
                            className="detail-package-collapse"
                            bordered={false}
                            expandIcon={(panelProps) => {
                                return (
                                    <img
                                        src={icChevronDown}
                                        className={
                                            panelProps?.isActive
                                                ? 'chevron-active'
                                                : 'chevron-inactive'
                                        }
                                        alt="icon"
                                    />
                                );
                            }}
                        >
                            <Panel header="CHI TIẾT GÓI SẢN PHẨM" key="1">
                                {item?.description &&
                                    formatDescription(item.description).map(
                                        (desc: string, index: number) => {
                                            return (
                                                <Row key={index}>
                                                    <Col>
                                                        -{' '}
                                                        <Text className="description">{desc}</Text>
                                                    </Col>
                                                </Row>
                                            );
                                        }
                                    )}
                            </Panel>
                        </Collapse>
                    </Col>
                    {index + 1 < packagesSelect.length && <Divider />}
                </div>
            ))}
        </Row>
    );
};

export default ValueBilling;
