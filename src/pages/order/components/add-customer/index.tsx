import { Modal } from 'antd';
import React, { FC, ReactElement } from 'react';
import useVisble from '../../../../hook/useVisible';
import { ICustomer } from '../../../../models';
import AddCustomerForm from './add-customer-form';
import ProviderAddCustomer from './context';

interface Props {
    children: ReactElement;
    selectCustomer: (customer: ICustomer) => void;
}

const AddCustomer: FC<Props> = ({ children, selectCustomer }: Props) => {
    const { visible, toggle } = useVisble();

    return (
        <ProviderAddCustomer selectCustomer={selectCustomer}>
            {React.cloneElement(children, { onClick: toggle })}

            <Modal
                visible={visible}
                onCancel={toggle}
                footer={null}
                title={
                    <div className="title-custom">
                        <span>Thêm khách hàng</span>
                    </div>
                }
                className="modal-custom"
                destroyOnClose
            >
                <AddCustomerForm toggle={toggle} />
            </Modal>
        </ProviderAddCustomer>
    );
};

export default AddCustomer;
