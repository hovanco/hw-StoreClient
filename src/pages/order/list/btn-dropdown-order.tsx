import { Dropdown, Menu, Modal } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import orderApi from '../../../api/order-api';
import { BtnDropdown } from '../../../components';
import { IOrder } from '../../../models/order';
import { IState } from '../../../store/rootReducer';
import { checkEditOrder } from '../util/check-edit-order';
import { useOrdersContext } from './state/context';

interface Props {
    order: IOrder;
}

const style = {
    height: 29,
    width: 33,
    padding: 0,
};

const BtnDropdownOrder: FC<Props> = ({ order }) => {
    const history = useHistory();
    const { fetchDataCallback } = useOrdersContext();

    const store = useSelector((state: IState) => state.store.data);

    const handleRemoveOrder = () => {
        Modal.confirm({
            title: 'Xóa Đơn Hàng?',
            content: `Bạn chắc chắn muốn xóa đơn hàng?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',

            onOk() {
                if (store._id) {
                    orderApi
                        .removeOrder({
                            storeId: store._id,
                            orderId: order._id,
                        })
                        .then(() => {
                            fetchDataCallback({});
                        })
                        .catch(() => {});
                }
            },
        });
    };

    const handleOpenOrder = () => {
        history.push(`/orders/order/${order._id}`);
    };

    const handleEditOrder = () => {
        history.push(`/orders/order/edit/${order._id}`);
    };

    const onClickMenu = ({ key }: any) => {
        if (key === 'open') {
            return handleOpenOrder();
        }
        if (key === 'remove') {
            return handleRemoveOrder();
        }
        if (key === 'edit') {
            return handleEditOrder();
        }

        return;
    };

    const disableEdit = checkEditOrder(order);

    const overlay = (
        <Menu onClick={onClickMenu}>
            <Menu.Item key="open">Xem</Menu.Item>
            <Menu.Item key="edit" disabled={disableEdit}>
                Sửa
            </Menu.Item>
            <Menu.Item key="remove">Xóa</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={overlay} placement="bottomRight" trigger={['click']}>
            <BtnDropdown style={{ ...style }}></BtnDropdown>
        </Dropdown>
    );
};

export default BtnDropdownOrder;
