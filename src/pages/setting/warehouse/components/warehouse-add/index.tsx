import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { FC, useState } from 'react';
import WarehouseForm from '../warehouse-form';

const WarehouseAdd: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const toggle = () => {
        setVisible(!visible);
    };
    return (
        <>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={toggle}>
                Thêm chi nhánh
            </Button>
            <Modal
                visible={visible}
                onCancel={toggle}
                footer={null}
                title="Thêm chi nhánh"
                width={550}
                destroyOnClose
            >
                <WarehouseForm toggle={toggle} />
            </Modal>
        </>
    );
};

export default WarehouseAdd;
