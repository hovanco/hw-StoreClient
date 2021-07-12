import React, { FC } from 'react';

import { useForm } from 'antd/lib/form/Form';
import { ICustomer, ICustomerEditing } from '../../../../models';

import { Modal } from 'antd';
import AddCustomerForm from '../../create/form';

import { useCustomer } from '../context';

interface Props {
    customer: ICustomerEditing;
    visible: boolean;
    toggle: () => void;
}

const UpdateCustomerInfo: FC<Props> = ({ customer, visible, toggle }) => {
    const [form] = useForm();
    const { setCustomer } = useCustomer();

    const handleCancel = () => {
        form.resetFields();
        toggle();
    };

    const updateLocalCustomer = (newCustomer: ICustomer) => {
        setCustomer(newCustomer);
    };

    return (
        <Modal
            onCancel={handleCancel}
            visible={visible}
            width={1050}
            title="Cập nhật khách hàng"
            closable
            maskClosable={false}
            footer={false}
            keyboard={false}
            className="customer-info-form-modal"
        >
            <AddCustomerForm
                toggle={toggle}
                form={form}
                customer={customer}
                callbackAfterUpdate={updateLocalCustomer}
            />
        </Modal>
    );
};

export default UpdateCustomerInfo;
