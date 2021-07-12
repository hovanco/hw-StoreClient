import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SunEditor from 'suneditor-react';
import { EmultipleIcon } from '../../../../assets/icon';
import rules from '../../../../helper/rules';
import { ICategory } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import ProductFormCategoryModal from '../product-form-category-modal';

type Props = {
    form: FormInstance;
};
export const sunEditorOption = {
    showPathLabel: false,
    charCounter: true,
    width: 'auto',
    height: 'auto',
    minHeight: '100px',
    maxHeight: '600px',
    buttonList: [
        ['undo', 'redo', 'fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
        ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list'],
        ['table', 'link', 'image', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
    ],
};
const ProductFormGeneral: FC<Props> = ({ form }) => {
    const categories = useSelector((state: IState) => state.store.categories);
    const [category, setCategory] = useState<string>();
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const getCategoryExist = () => {
        if (!category) {
            return null;
        }

        const categoryExist = (categories as ICategory[]).find(
            (item: ICategory) => item._id === category
        );

        if (!categoryExist) {
            return null;
        }

        return categoryExist;
    };

    const categoryExist = getCategoryExist();

    return (
        <>
            <Card title="Thông tin cơ bản" size="small">
                <Form.Item label="Tên sản phẩm" name="name" rules={[rules.ruleRequired()]}>
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Row gutter={[50, 0]}>
                    <Col span={12}>
                        <Form.Item label="SKU" name="sku" rules={[rules.ruleRequired()]}>
                            <Input />
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
                <Form.Item label="Danh mục">
                    <Button
                        onClick={() => {
                            setVisibleModal(true);
                        }}
                        type="link"
                        style={{ padding: 0 }}
                    >
                        {categoryExist ? categoryExist.name : 'Nhập danh mục sản phẩm'}
                        <EmultipleIcon style={{ marginLeft: 8 }} />
                    </Button>
                </Form.Item>
                <Form.Item label="Nhãn hiệu">
                    <Select style={{ width: 344 }} placeholder="Nhãn hiệu sản phẩm"></Select>
                </Form.Item>
            </Card>
            <Form.Item name="categoryId" noStyle>
                {/* <Input hidden= */}
                <ProductFormCategoryModal
                    visible={visibleModal}
                    onCancel={() => {
                        setVisibleModal(false);
                    }}
                    onOk={(categoryId: string) => {
                        setCategory(categoryId);
                        form.setFieldsValue({
                            categoryId,
                        });
                        setVisibleModal(false);
                    }}
                />
            </Form.Item>
        </>
    );
};

export default ProductFormGeneral;
