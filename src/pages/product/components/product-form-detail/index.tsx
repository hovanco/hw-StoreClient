import { Card, Col, Form, InputNumber, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { FC } from 'react';
import { formatterInput, parserInput } from '../../../../helper/format-money';
import rules from '../../../../helper/rules';

interface Props {
    form: FormInstance;
}

const ProductFormDetail: FC<Props> = ({ form }) => (
    <Card title="Chi tiết" size="small">
        <Row gutter={[30, 0]}>
            <Col span={24}>
                <Form.Item
                    label="Cân nặng"
                    name="weight"
                    rules={[rules.ruleRequired(), rules.ruleNumberMin(10)]}
                >
                    <InputNumber
                        placeholder="Gram"
                        style={{ width: '100%' }}
                        formatter={formatterInput}
                        parser={parserInput}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[30, 0]} align="bottom">
            <Col span={24}>
                <Form.Item
                    label="Kích thước"
                    name="width"
                    rules={[rules.ruleNumberMin(0)]}
                    initialValue={form.getFieldValue('width')}
                >
                    <InputNumber
                        placeholder="R ( cm )"
                        style={{ width: '100%' }}
                        formatter={formatterInput}
                        parser={parserInput}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    label=""
                    name="length"
                    rules={[rules.ruleNumberMin(0)]}
                    initialValue={form.getFieldValue('length')}
                >
                    <InputNumber
                        placeholder="D ( cm )"
                        style={{ width: '100%' }}
                        formatter={formatterInput}
                        parser={parserInput}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    label=""
                    name="height"
                    rules={[rules.ruleNumberMin(0)]}
                    initialValue={form.getFieldValue('height')}
                >
                    <InputNumber
                        placeholder="C ( cm )"
                        style={{ width: '100%' }}
                        formatter={formatterInput}
                        parser={parserInput}
                    />
                </Form.Item>
            </Col>
        </Row>
    </Card>
);

export { ProductFormDetail };
