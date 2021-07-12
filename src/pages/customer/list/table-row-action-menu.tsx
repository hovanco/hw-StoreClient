import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Modal, Typography } from 'antd';
import moment, { Moment } from 'moment';
import React, { FC, memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import customerApi from '../../../api/customer-api';
import { EmultipleIcon, TrashIcon } from '../../../assets/icon';
import { InsaButton } from '../../../components';
import { ICustomer, ICustomerEditing } from '../../../models';
import { IState } from '../../../store/rootReducer';
import { useCustomerTable } from './context';
import UpdateCustomerInfo from './update-customer-info';

interface Props {
    customer: ICustomer;
}

const CustomerRowAction: FC<Props> = ({ customer }) => {
    const [visible, setVisible] = useState(false);
    const [visibleDropdown, setVisibleDropdown] = useState(false);

    const storeObj = useSelector((state: IState) => state.store.data);
    const { getCustomers } = useCustomerTable();

    const toggle = () => {
        setVisible(!visible);
    };

    const handleMenuClick = (menuItem: any) => {
        setVisibleDropdown(false);

        switch (menuItem.key) {
            case 'edit':
                toggle();
                return;

            case 'remove':
                confirmDeleteCustomer();
                return;

            default:
                return;
        }
    };

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
            getCustomers();
        } catch {
            message.error('Xoá khách hàng thất bại');
        }
    };

    const normalizeCustomerDataForForm: ICustomerEditing = useMemo(() => {
        if (!customer?.dateOfBirth) return customer as ICustomerEditing;

        return {
            ...customer,
            dateOfBirth: moment(customer?.dateOfBirth, 'DD/MM/YYYY') as Moment,
        } as ICustomerEditing;
    }, [customer]);

    return (
        <>
            <Dropdown
                trigger={['click']}
                visible={visibleDropdown}
                onVisibleChange={(value: boolean) => {
                    setVisibleDropdown(value);
                }}
                overlay={
                    <Menu onClick={handleMenuClick}>
                        <Menu.Item key="edit">
                            <Typography.Text>
                                <EmultipleIcon />
                                Chỉnh sửa
                            </Typography.Text>
                        </Menu.Item>
                        <Menu.Item key="remove">
                            <Typography.Text type="danger">
                                <TrashIcon />
                                Xoá
                            </Typography.Text>
                        </Menu.Item>
                    </Menu>
                }
            >
                <InsaButton>
                    <DownOutlined />
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

export default memo(CustomerRowAction);
