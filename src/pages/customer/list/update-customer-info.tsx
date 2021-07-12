import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { FC } from 'react';
import { ICustomerEditing } from '../../../models';
import AddCustomerForm from '../create/form';
import { useCustomerTable } from './context';

interface Props {
    customer: ICustomerEditing;
    visible: boolean;
    toggle: () => void;
}

const UpdateCustomerInfo: FC<Props> = ({ customer, visible, toggle }) => {
    const [form] = useForm();
    const { getCustomers } = useCustomerTable();

    const handleCancel = () => {
        form.resetFields();
        toggle();
    };

    return (
        <Modal
            onCancel={handleCancel}
            visible={visible}
            width={1050}
            title="Cập nhật khách hàng"
            closable={false}
            footer={false}
            className="customer-info-form-modal"
            destroyOnClose
        >
            <AddCustomerForm
                toggle={toggle}
                form={form}
                customer={customer}
                callbackAfterUpdate={getCustomers}
            />
        </Modal>
    );
};

export default UpdateCustomerInfo;
