import { Row, Select, Form, Space, Typography, Col } from 'antd';
import React, { FC } from 'react';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import iconHelp from '../../../assets/images/ic-help.svg';
import theme from '../../../theme';
import iconUpload from '../../../assets/images/ic-upload.svg';
import SupplierFormInformation from './form-information';
import SupplierFormAddress from './form-address';
import SupplierFormExtension from './form-extension';
import SupplierFormSetting from './form-setting';
import './style.less';
import { ArrowLeftOutlined } from '@ant-design/icons';

const SupplierNew: FC = () => {
    const renderGroupBtn = () => {
        return [
            <InsaButton style={{ width: 140 }} size="middle" key="cancel">
                Hủy
            </InsaButton>,
            <InsaButton style={{ width: 100 }} type="primary">
                Lưu
            </InsaButton>,
        ];
    };
    const [form] = Form.useForm();

    return (
        <DefaultLayout title="THÊM MỚI NHÀ CUNG CẤP">
            <PageTopWrapper
                leftContent={
                    <>
                        <Space>
                            <ArrowLeftOutlined />
                            <Typography.Title level={4} type="secondary" style={{ margin: 0 }}>
                                Danh sách nhà cung cấp
                            </Typography.Title>
                        </Space>
                        <Typography.Title level={3}>THÊM MỚI NHÀ CUNG CẤP</Typography.Title>
                    </>
                }
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
                className="supplier-form"
                size="middle"
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
                        <SupplierFormInformation />
                        <SupplierFormAddress />
                        <SupplierFormExtension />
                    </Col>
                    <Col span={8}>
                        <SupplierFormSetting />
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
export default SupplierNew;
