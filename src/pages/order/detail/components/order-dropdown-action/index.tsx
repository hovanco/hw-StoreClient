import { Dropdown, Menu, message, Modal } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import orderApi from '../../../../../api/order-api';
import { BtnDropdown } from '../../../../../components';
import { IOrder } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../../create/state/context';
import { checkEditOrder } from '../../../util/check-edit-order';

const { removeOrder } = orderApi;

interface Props {}

const OrderDropdownAction = (props: Props) => {
    const history = useHistory();
    const store = useSelector((state: IState) => state.store.data);

    const { order } = useOrderNew();

    const handleRemoveOrder = () => {
        Modal.confirm({
            title: 'Xóa đơn hàng',
            content: `Bạn chắc chắn muốn xóa đơn hàng`,
            cancelText: 'Hủy',
            okText: 'Xóa',
            okType: 'danger',
            okButtonProps: {
                type: 'primary',
            },
            onOk() {
                return new Promise((resolve, reject) => {
                    removeOrder({
                        storeId: store._id as string,
                        orderId: (order as IOrder)._id,
                    })
                        .then(() => {
                            message.success('Đã xóa đơn hàng thông công');
                            history.push('/orders/list');
                            resolve();
                        })
                        .catch(() => {
                            message.error('Lỗi khi xóa đơn hàng');
                            reject();
                        });
                }).catch(() => console.log('Oops errors!'));
            },
        });
    };

    const disableEdit = checkEditOrder(order);

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to={`/orders/new/${order && order._id}`}>Đặt lại</Link>
            </Menu.Item>
            {}
            <Menu.Item key="1" disabled={disableEdit || !!get(order, 'paidAt')}>
                {disableEdit ? (
                    'Sửa đơn hàng'
                ) : (
                    <Link to={`/orders/order/edit/${order && order._id}`}>Sửa đơn hàng</Link>
                )}
            </Menu.Item>
            <Menu.Item
                key="2"
                style={disableEdit ? {} : { color: '#f53d2d' }}
                onClick={handleRemoveOrder}
                disabled={disableEdit}
            >
                Xóa đơn hàng
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <BtnDropdown>Thao tác khác</BtnDropdown>
        </Dropdown>
    );
};

export default OrderDropdownAction;
