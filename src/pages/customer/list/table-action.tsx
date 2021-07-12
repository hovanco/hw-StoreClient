import React, { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import customerApi from '../../../api/customer-api';
import { IState } from '../../../store/rootReducer';

import { CaretDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown, Menu, message, Modal, Space } from 'antd';
import { useCustomerTable } from './context';

interface Props {
    customers: any;
    resetCustomerSelected: () => void;
    widthTable: number;
}

const TableAction: FC<Props> = ({ customers, widthTable, resetCustomerSelected }): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const storeObj = useSelector((state: IState) => state.store.data);
    const { getCustomers } = useCustomerTable();

    const comfirmDeleteCustomer = () => {
        Modal.confirm({
            title: `Bạn chắc chắn muốn xoá ${customers.length} khách hàng này?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                await deleteCustomer();
            },
            onCancel() {},
        });
    };

    const deleteCustomer = async () => {
        try {
            setLoading(true);
            await Promise.all(
                customers.map((customerId: string) => {
                    return customerApi.deleteCustomer({
                        storeId: storeObj._id as string,
                        customerId,
                    });
                })
            );

            message.success(`Đã xoá thành công ${customers.length} khách hàng`);

            resetCustomerSelected();
            getCustomers();
        } catch {
            message.error(`Xoá khách hàng thất bại`);
        } finally {
            setLoading(false);
        }
    };

    const menu = (
        <Menu>
            {/* <Menu.Item key='0'>
                Cập nhật khách hàng
            </Menu.Item>
            <Menu.Item key='1'>
                Ngừng giao dịch
            </Menu.Item>
            <Menu.Item key='2'>
                Cập nhật trạng thái
            </Menu.Item> */}
            <Menu.Item key="3" onClick={comfirmDeleteCustomer}>
                <span style={{ color: '#f53d2d' }}>Xoá khách hàng</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={resetCustomerSelected}>
                <span>Bỏ chọn</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='customer-actions' style={{ width: widthTable }}>
            <Dropdown.Button
                overlay={menu}
                buttonsRender={([leftButton, rightButton]) => [
                    leftButton,
                    React.cloneElement(rightButton as ReactElement, {
                        children: (
                            <>
                                Chọn thao tác <CaretDownOutlined />
                            </>
                        ),
                        loading: loading,
                        icon: undefined,
                    }),
                ]}
            >
                <Space>
                    <Checkbox onClick={resetCustomerSelected} checked />
                    <span>Đã chọn {customers.length} khách hàng</span>
                </Space>
            </Dropdown.Button>
        </div>
    );
};

export default TableAction;
