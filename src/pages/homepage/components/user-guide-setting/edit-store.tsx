import { Modal } from 'antd';
import React, { FC, useState } from 'react';
import { InsaButton } from '../../../../components';
import FormCreateStore, { ETypeForm } from '../../../create-store/form-create-store';

const EditStore: FC = () => {
    const [visible, setVisble] = useState<boolean>(false);

    const toggle = () => {
        setVisble(!visible);
    };

    return (
        <>
            <InsaButton type="primary" onClick={toggle}>
                Thiết lập ngay
            </InsaButton>

            <Modal
                visible={visible}
                onCancel={toggle}
                footer={null}
                title="Chỉnh sửa cửa hàng"
                destroyOnClose
            >
                <FormCreateStore type={ETypeForm.EDIT} />
            </Modal>
        </>
    );
};

export default EditStore;
