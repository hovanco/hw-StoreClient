import { Dropdown, Menu } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { BtnDropdown } from '../../../../components';
import { ORDER_STATUS } from '../../../../models/order';
import { getOrderStatusName } from '../order-label-status';
import './select-status-order.less';
interface Props {
    selectStatusOrder: (status: string | undefined) => void;
    status?: string;
}

const StatusSelect: FC<Props> = ({ selectStatusOrder, status }) => {
    const [key, setKey] = useState<string | number>('root');
    const [visible, setVisible] = useState<boolean>(false);

    const handleSelectStatus = ({ _, key }: any) => {
        setVisible(false);
        setKey(key);
        setTimeout(() => {
            const status = key === 'root' ? undefined : key;
            selectStatusOrder(status);
        }, 500);
    };

    useEffect(() => {
        if (status) {
            setKey(status);
        }
    }, [status]);

    const listStatus = Object.values(ORDER_STATUS).slice(
        Object.keys(ORDER_STATUS).length / 2,
        Object.keys(ORDER_STATUS).length
    );

    const overlay = (
        <Menu onClick={handleSelectStatus} selectedKeys={[`${key}`]}>
            <Menu.Item key="root">Tất cả đơn hàng</Menu.Item>

            {listStatus.map((value: any) => (
                <Menu.Item key={value}>{getOrderStatusName(value)}</Menu.Item>
            ))}
        </Menu>
    );

    const statusSelect: any = listStatus.find((value: any) => Number(value) === Number(key));

    return (
        <Dropdown
            overlay={overlay}
            trigger={['click']}
            visible={visible}
            onVisibleChange={(value) => {
                setVisible(value);
            }}
        >
            <BtnDropdown>{getOrderStatusName(statusSelect) || 'Tất cả đơn hàng'}</BtnDropdown>
        </Dropdown>
    );
};

export default StatusSelect;
