import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { InsaButton } from '../../../components';
import { Modal } from 'antd';
import iconPlus from '../../../assets/images/ic-plus.svg';
import AddCustomerForm from './form';
import { useForm } from 'antd/lib/form/Form';
import ExpiredStore from '../../../components/expired-store';
import { useBilling } from '../../setting/create-billing/state/context';
import { checkRestrictAction } from '../../../helper/get-time';

import './style.less';

const AddCustomer: FC = () => {
    const { packagesActive } = useBilling();
    const [visible, setVisible] = useState<boolean>(false);
    const [popup, setPopup] = useState(false);
    const [form] = useForm();

    const dispatch = useDispatch();

    const toggle = () => setVisible(!visible);

    const handleCancel = () => {
        form.resetFields();
        toggle();
    };

    const handleAddNewCustomer = () => {
        if (checkRestrictAction(packagesActive)) {
            setPopup(true);
        } else {
            toggle();
        }
    };

    const handleBuyPackage = () => {
        setPopup(false);
        dispatch(push('/setting/billings/list'));
    };

    return (
        <>
            <InsaButton
                type="primary"
                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                onClick={handleAddNewCustomer}
            >
                Thêm khách hàng
            </InsaButton>

            <ExpiredStore
                visible={popup}
                onCancel={() => setPopup(false)}
                onBuyPackage={handleBuyPackage}
            />

            <Modal
                onCancel={handleCancel}
                visible={visible}
                width={1050}
                title="Thêm mới khách hàng"
                closable
                maskClosable={false}
                footer={false}
                keyboard={false}
                className="customer-info-form-modal"
            >
                <AddCustomerForm toggle={toggle} form={form} />
            </Modal>
        </>
    );
};

export default AddCustomer;
