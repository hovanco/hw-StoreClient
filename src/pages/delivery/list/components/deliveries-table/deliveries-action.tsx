import { CaretDownOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown, Menu, Space } from 'antd';
import React, { FC, ReactElement } from 'react';

interface Props {
    widthTable: number;
    loadingRemoveOrders: boolean;
    selectedRowKeys: any[];
    handleMenuClick: (e: any) => void;
    removeAllSelect: () => void;
}

const DeliveriesAction: FC<Props> = ({
    widthTable,
    loadingRemoveOrders,
    selectedRowKeys,
    handleMenuClick,
    removeAllSelect,
}) => {
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">Xóa đơn hàng</Menu.Item>
            <Menu.Item key="unselect">Bỏ chọn</Menu.Item>
        </Menu>
    );

    return (
        <div className='order-actions' style={{ width: widthTable }}>
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
                        loading: loadingRemoveOrders,
                        icon: undefined,
                    }),
                ]}
            >
                <Space>
                    <Checkbox onClick={removeAllSelect} checked />
                    <span>Đã chọn {selectedRowKeys.length} đơn hàng</span>
                </Space>
            </Dropdown.Button>
        </div>
    );
}

export default DeliveriesAction;
