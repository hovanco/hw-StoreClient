import { Modal } from 'antd';
import React, { FC } from 'react';
import TableDeliveryList from './table-delivery-list';

interface Props {
    status: number;
    times: any[];
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const ModalDeliveryList: FC<Props> = ({ status, times, visible, setVisible }) => {
    const toggle = () => {
        setVisible(!visible);
    }

    return (
        <>
            <Modal
                visible={visible}
                onCancel={toggle}
                title="Danh sách đơn hàng"
                bodyStyle={{ padding: 0 }}
                width="75%"
                footer={null}
            >
                <TableDeliveryList
                    status={status}
                    times={times}
                />
            </Modal>
        </>
    );
};

export default ModalDeliveryList;
