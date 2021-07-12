import { Col, Collapse, Divider, Row, Typography } from 'antd';
import React from 'react';
import formatMoney from '../../../../../helper/format-money';
import { IPackageBiling } from '../../../list-billings/package-biling';
import { useBilling } from '../../state/context';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ValueBilling = () => {
    const { packagesSelect, billingCycle } = useBilling();

    const calcPricePackage = (item: IPackageBiling, billingCycle: number) => {
        const currentCycle = item.cycles.find((cycle) => cycle.id === billingCycle);
        let price = '0';
        if (currentCycle?.price) {
            price = formatMoney(currentCycle?.price);
        }

        return `${price}/ ${currentCycle?.name}`;
    };

    return (
        <Row gutter={[0, 10]}>
            {packagesSelect?.map((item, index) => (
                <>
                    <Col span={24} className="package-billing">
                        <Title level={5}>{item.package}</Title>
                        <Text>{calcPricePackage(item, billingCycle)} (đã bao gồm thuế)</Text>
                        <Collapse
                            collapsible="header"
                            defaultActiveKey={['1']}
                            expandIconPosition="right"
                            className="detail-package-collapse"
                            bordered={false}
                        >
                            <Panel header="CHI TIẾT GÓI SẢN PHẨM" key="1">
                                {item.description}
                            </Panel>
                        </Collapse>
                    </Col>
                    {index + 1 < packagesSelect.length && <Divider />}
                </>
            ))}
        </Row>
    );
};

export default ValueBilling;
