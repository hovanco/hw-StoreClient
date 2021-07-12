import { Modal } from 'antd';
import React, { FC } from 'react';
import { EmultipleIcon } from '../../../../../assets/icon';
import useVisble from '../../../../../hook/useVisible';
import { IInfoDelivery } from '../../state/interface';
import FormEditDelivery from './form-edit-delivery';

interface Props {
    infoDelivery?: IInfoDelivery;
}

const EditInfoDelivery: FC<Props> = ({ infoDelivery }) => {

    const { toggle, visible } = useVisble();
    
    return (
        <>
            <EmultipleIcon onClick={toggle} style={{ lineHeight: 1, fontSize: 16 }} />
            <Modal
                visible={visible}
                onCancel={toggle}
                footer={null}
                title="Thay đổi thông tin giao hàng"
                destroyOnClose
            >
                <FormEditDelivery infoDelivery = {infoDelivery} toggle={toggle}/>
            </Modal>
        </>
    );
};

export default EditInfoDelivery;
