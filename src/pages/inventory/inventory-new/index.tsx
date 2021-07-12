import { Row, Select, Form, Space, Typography, Col } from 'antd';
import React, { FC } from 'react';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import iconHelp from '../../../assets/images/ic-help.svg';
import iconPlus from '../../../assets/images/ic-plus.svg';
import theme from '../../../theme';
import iconUpload from '../../../assets/images/ic-upload.svg';
import InventoryFormSupplier from './inventory-form-supplier';
import InventoryFormProduct from './inventory-form-product';
import InventoryFormWarehouse from './inventory-form-warehouse';
import InventoryFormPayment from './inventory-form-payment';
import InventoryFormOrder from './inventory-form-order';
import './style.less';

const InventoryNew: FC = () => {
    const renderGroupBtn = () => {
        return [
            <InsaButton
                style={{ width: 140 }}
                size="middle"
                key="cancel"
                // disabled={loading}
            >
                Hủy
            </InsaButton>,
            <InsaButton
                type="primary"
                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                onClick={() => {
                    console.log(form.getFieldsValue());
                }}
                key="submit"
            >
                Đặt hàng và duyệt
            </InsaButton>,
        ];
    };
    const [form] = Form.useForm();

    return (
        <DefaultLayout title="ĐƠN NHẬP HÀNG">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>ĐƠN NHẬP HÀNG</Typography.Title>}
                rightContent={
                    <Space>
                        {renderGroupBtn()}
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton
                            // shape="circle"
                            icon={<img style={{ marginRight: 10 }} src={iconHelp} alt="icon" />}
                        >
                            Trợ giúp
                        </InsaButton> */}
                    </Space>
                }
            />
            <Row
                style={{
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                    marginTop: 28,
                }}
                justify="end"
            >
                <Space>
                    <InsaButton>In đơn hàng</InsaButton>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Xuất file</Typography.Text>
                    </InsaButton>
                    <Select
                        style={{ minWidth: 136 }}
                        value={'root'}
                        onChange={
                            (value) => {}
                            // handleSelectCategory(value as string)
                        }
                    >
                        <Select.Option value="root">Thao tác khác</Select.Option>
                    </Select>
                </Space>
            </Row>

            <Form
                layout="vertical"
                className="inventory-form"
                size="small"
                form={form}
                initialValues={{
                    categoryId: '',
                }}
            >
                <Row
                    gutter={[16, 0]}
                    style={{
                        paddingLeft: theme.spacing.m,
                        paddingRight: theme.spacing.m,
                        marginTop: 28,
                    }}
                >
                    <Col span={16}>
                        <InventoryFormSupplier />
                        <InventoryFormProduct />
                        <InventoryFormWarehouse />
                    </Col>
                    <Col span={8}>
                        <InventoryFormPayment />
                        <InventoryFormOrder />
                    </Col>
                </Row>
            </Form>
            <Row
                justify="end"
                style={{
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                    marginTop: 28,
                }}
            >
                <Space>{renderGroupBtn()}</Space>
            </Row>
        </DefaultLayout>
    );
};
export default InventoryNew;
