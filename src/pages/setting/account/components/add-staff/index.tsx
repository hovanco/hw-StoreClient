import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useState } from 'react';
import FormAddStaff from './form-staff';

interface Props {}

const AddStaff: FC<Props> = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const toggle = () => setVisible(!visible);

    return (
        <>
            <Button type="primary" onClick={toggle} icon={<UserAddOutlined />}>
                Thêm nhân viên
            </Button>
            <Modal
                visible={visible}
                onCancel={toggle}
                footer={null}
                title="Thêm nhân viên"
                destroyOnClose
            >
                <FormAddStaff toggle={toggle} />
            </Modal>
        </>
    );
};

export default AddStaff;
