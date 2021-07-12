import { Card, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { FC } from 'react';
import { formatterInput, parserInput } from '../../../../helper/format-money';
import rules from '../../../../helper/rules';

const ProductFormSaleInfo: FC = () => (
    <Card title='Thông tin bán hàng' size='small'>
        <Row gutter={[50, 0]}>
            <Col span={12}>
                <Form.Item label='Giá nhập' name='originalPrice' rules={[rules.ruleRequired()]}>
                    <InputNumber
                        placeholder='VND'
                        style={{ width: '100%' }}
                        formatter={formatterInput}
                        parser={parserInput}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label='Giá bán' name='wholesalePrice' rules={[rules.ruleRequired()]}>
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={formatterInput}
                        parser={parserInput}
                    />
                </Form.Item>
            </Col>
        </Row>
    </Card>
);

export default ProductFormSaleInfo;
