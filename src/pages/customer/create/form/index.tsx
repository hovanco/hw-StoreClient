import { Col, Divider, Form, message, Row, Space } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { pick, get, every, isNil } from 'lodash';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import customerApi from '../../../../api/customer-api';
import { InsaButton } from '../../../../components';
import { DefaultLayout } from '../../../../layout';
import { ICreateCustomerParams, ICustomer, ICustomerEditing } from '../../../../models';
import { storeAction } from '../../../../reducers/storeState/action';
import { IState } from '../../../../store/rootReducer';
import AdditionalInfo from './additional-info';
import AddressInfo from './address-info';
import AdvanceSetting from './advance-setting';
import CustomerInfo from './customer-info';
import './index.less';
import OtherInfo from './other-info';

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface Props {
    toggle: () => void;
    form: FormInstance;
    customer?: ICustomerEditing;
    callbackAfterUpdate?: (responseCustomer: ICustomer) => void;
}

const AddCustomerForm: FC<Props> = ({ toggle, form, customer, callbackAfterUpdate }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(!customer);

    const dispatch = useDispatch();
    const storeObj = useSelector((state: IState) => state.store.data);

    const submitForm = async () => {
        const formData = await form.validateFields();

        const customerFormData: ICreateCustomerParams = {
            ...pick(formData, [
                'name',
                'phoneNo',
                'province',
                'district',
                'ward',
                'address',
                'dateOfBirth',
                'gender',
                'email',
                'address2',
                'label',
                'website',
                'taxCode',
                'description',
            ]),
        };

        if (customerFormData.dateOfBirth)
            customerFormData.dateOfBirth = moment(customerFormData.dateOfBirth).format(
                'DD/MM/YYYY'
            );

        if (!customer?._id) {
            await createCustomer(customerFormData);
        } else {
            await updateCustomer(customerFormData);
        }

        form.resetFields();
    };

    const createCustomer = async (formData: ICreateCustomerParams) => {
        try {
            if (!storeObj._id) return;

            setLoading(true);

            await customerApi.createCustomer({ storeId: storeObj._id as string, formData });

            message.success('Tạo khách hàng thành công');

            toggle();

            dispatch(
                storeAction.getCustomers({
                    storeId: storeObj._id as string,
                    page: 1,
                    limit: 20,
                    sort: 'createdAt',
                    direction: 'desc',
                })
            );
        } catch (error) {
            if (get(error, 'response.status') === 409) {
                message.error('Số điện thoại đã tồn tại');
            } else {
                message.error('Xảy ra lỗi, vui lòng thử lại');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateCustomer = async (formData: ICreateCustomerParams) => {
        try {
            if (!storeObj._id) return;

            setLoading(true);

            const responseCustomer = await customerApi.updateCustomer({
                storeId: storeObj._id as string,
                customerId: customer?._id as string,
                formData,
            });

            message.success('Cập nhật khách hàng thành công');

            toggle();

            callbackAfterUpdate && callbackAfterUpdate(responseCustomer);
        } catch (error) {
            if (get(error, 'response.status') === 409) {
                message.error('Số điện thoại đã tồn tại');
            } else {
                message.error('Xảy ra lỗi, vui lòng thử lại');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        toggle();
    };

    const onFieldsChange = (changedFields: FieldData[], allFields: FieldData[]) => {
        const requiredFields = ['name', 'phoneNo'];

        const fields = allFields.filter((field: FieldData) =>
            requiredFields.includes((field.name as string[])[0]));

        const result = every(fields, (field: FieldData) =>
            field.errors?.length === 0 && !isNil(field.value));

        setDisabled(!result);
    }

    return (
        <>
            <DefaultLayout title="Cập nhật khách hàng">
                <Form
                    onFinish={submitForm}
                    form={form}
                    layout="vertical"
                    className="customer-info-form"
                    initialValues={customer}
                    onFieldsChange={onFieldsChange}
                >
                    <Row gutter={22}>
                        <Col span="15">
                            <Space direction="vertical" size={22}>
                                <CustomerInfo />
                                <AddressInfo form={form} />
                                <AdditionalInfo />
                            </Space>
                        </Col>
                        <Col span="9">
                            <Space direction="vertical" size={22}>
                                <OtherInfo />
                                <AdvanceSetting />
                            </Space>
                        </Col>
                    </Row>

                    <Divider />

                    <Space className="customer-info-form__footer">
                        <InsaButton
                            onClick={handleCancel}
                            style={{ width: 120 }}
                            disabled={loading}
                        >
                            Hủy
                        </InsaButton>
                        <InsaButton
                            htmlType="submit"
                            type="primary"
                            style={{ width: 120 }}
                            loading={loading}
                            disabled={disabled}
                        >
                            Lưu
                        </InsaButton>
                    </Space>
                </Form>
            </DefaultLayout>
        </>
    );
};
export default AddCustomerForm;
