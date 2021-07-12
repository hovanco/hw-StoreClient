import React, { FC, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import moment, { Moment } from 'moment';
import customerApi from '../../../../api/customer-api';
import { IState } from '../../../../store/rootReducer';

import { Menu, Dropdown, Typography, Modal, message } from 'antd';
import { InsaButton } from '../../../../components';
import { ICustomerEditing } from '../../../../models';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import UpdateCustomerInfo from './update-customer-info';
import { useCustomer } from '../context';

interface Props {}

const CustomerInfoAction: FC<Props> = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const toggle = () => setVisible(!visible);

    const { customer } = useCustomer();
    const history = useHistory();
    const storeObj = useSelector((state: IState) => state.store.data);

    const handleMenuClick = (menuItem: any) => {
        switch (menuItem.key) {
            case '1':
                toggle();
                return;

            case '2':
                confirmDeleteCustomer();
                return;

            default:
                return;
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Typography.Text>Cập nhật thông tin</Typography.Text>
            </Menu.Item>
            <Menu.Item key="2">
                <Typography.Text type="danger">Xoá khách hàng</Typography.Text>
            </Menu.Item>
        </Menu>
    );

    const normalizeCustomerDataForForm: ICustomerEditing = useMemo(() => {
        if (!customer.dateOfBirth) return customer as ICustomerEditing;

        return {
            ...customer,
            dateOfBirth: moment(customer.dateOfBirth, 'DD/MM/YYYY') as Moment,
        } as ICustomerEditing;
    }, [customer]);

    const confirmDeleteCustomer = () => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn xoá người dùng này?',
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                await deleteCustomer();
            },
            onCancel() {},
        });
    };

    const deleteCustomer = async () => {
        try {
            await customerApi.deleteCustomer({
                storeId: storeObj._id as string,
                customerId: customer._id as string,
            });

            message.success('Xoá khách hàng thành công');
            history.replace('/customers/list');
        } catch {
            message.error('Xoá khách hàng thất bại');
        }
    };

    return (
        <>
            <Dropdown overlay={menu} trigger={['click']}>
                <InsaButton>
                    Thao tác khác <DownOutlined />
                </InsaButton>
            </Dropdown>

            <UpdateCustomerInfo
                customer={normalizeCustomerDataForForm}
                visible={visible}
                toggle={toggle}
            />
        </>
    );
};

export default CustomerInfoAction;
