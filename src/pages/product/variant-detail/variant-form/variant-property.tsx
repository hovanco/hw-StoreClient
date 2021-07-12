import React, { FC } from 'react';

import { Card, Row, Col, Form, Input, InputNumber } from 'antd';
import rules from '../../../../helper/rules';
import { formatterInput, parserInput } from '../../../../helper/format-money';
import InventoryQuantity from '../inventory-quantity';
import { FormInstance } from 'antd/lib/form/Form';

interface Props {
    form: FormInstance;
}

const VariantProperty: FC<Props> = ({ form }) => {
    return (
        <Card title="Chi tiết thuộc tính">
            <Row gutter={[60, 32]}>
                <Col span={12}>
                    <Form.Item
                        label="Giá bán lẻ"
                        name="price"
                        rules={[rules.ruleRequired(), rules.ruleNumberMin(0)]}
                    >
                        <InputNumber formatter={formatterInput} parser={parserInput} />
                    </Form.Item>

                    <Form.Item label="SKU" name="sku">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Trọng lượng"
                        name="weight"
                        rules={[rules.ruleNumberMin(10), rules.ruleNumberMax(1000000)]}
                    >
                        <InputNumber
                            placeholder="Gram"
                            formatter={formatterInput}
                            parser={parserInput}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Giá bán sĩ"
                        name="wholesalePrice"
                        rules={[rules.ruleNumberMin(0)]}
                    >
                        <InputNumber formatter={formatterInput} parser={parserInput} />
                    </Form.Item>
                    <Form.Item label="Barcode" name="code">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <InventoryQuantity form={form} />
                </Col>
            </Row>
        </Card>
    );
};

export default VariantProperty;
