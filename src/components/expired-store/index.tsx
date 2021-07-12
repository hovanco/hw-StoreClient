import { Row, Modal, Space } from 'antd';
import React, { FC } from 'react';
import { InsaButton } from '..';
import './expired-store.less';

interface Props {
    visible: boolean;
    onBuyPackage: Function;
    onCancel: Function;
}

const ExpiredStore: FC<Props> = ({ visible, onBuyPackage, onCancel }) => {
    return (
        <Modal
            visible={visible}
            footer={null}
            closeIcon={null}
            closable={false}
            bodyStyle={{ padding: 10, paddingBottom: 15, textAlign: 'center' }}
            width={360}
            title={
                <Row justify='center'>
                    <span>Thông báo</span>
                </Row>
            }
            className="modal-expired-store"
        >
            <div style={{ marginBottom: 10 }}>
                <span>Tài khoản của bạn đã hết hạn.</span>
                <br />
                <span>Vui lòng mua gói dịch vụ để tiếp tục sử dụng.</span>
            </div>
            <Row justify="center">
                <Space>
                    <InsaButton type="primary" onClick={() => onBuyPackage()}>
                        Mua gói
                    </InsaButton>
                    <InsaButton onClick={() => onCancel()}>
                        Hủy
                    </InsaButton>
                </Space>
            </Row>
        </Modal>
    );
};

export default ExpiredStore;
