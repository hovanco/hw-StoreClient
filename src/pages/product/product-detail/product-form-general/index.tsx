import { Card, Col, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { get } from 'lodash';
import React, { FC } from 'react';
import SunEditor from 'suneditor-react';
import { sunEditorOption } from '../../product-new/product-form-general';
import rules from '../../../../helper/rules';

type Props = {
    form: FormInstance;
};
const ProductFormGeneral: FC<Props> = ({ form }) => {
    return (
        <>
            <Card title="Thông tin cơ bản" size="small">
                <Form.Item label="Tên sản phẩm" name="name" rules={[rules.ruleRequired()]}>
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Row gutter={[50, 0]}>
                    <Col span={12}>
                        <Form.Item label="SKU" name="sku">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Barcode" name="code" rules={[rules.ruleRequired()]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="shortDescription" label="Mô tả ngắn (short description)">
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item name="htmlDescription" label="Mô tả (HTML description)">
                    <SunEditor
                        setOptions={sunEditorOption}
                        setContents={form?.getFieldValue('htmlDescription')}
                    />
                </Form.Item>
                <Form.Item name="description" label="Mô tả (Text description)">
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                </Form.Item>
                {form.getFieldValue('categoryId') && (
                    <Form.Item style={{ marginBottom: 5 }}>
                        <b>Danh mục:</b> {get(form.getFieldValue('categoryId'), 'name') || '---'}
                    </Form.Item>
                )}
                {/* <Form.Item>
                    <span>Nhãn hiệu: Nhãn hiệu độc quyền</span>
                </Form.Item> */}
            </Card>
        </>
    );
};

export default ProductFormGeneral;
