import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import React, { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import staffsApi from '../../../../../api/staff-api';
import { IState } from '../../../../../store/rootReducer';

interface Props {
    title?: string;
    staffId: string;
    children: ReactElement;
}
const RemoveAccount: FC<Props> = ({ title, staffId, children }) => {
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const removeAccount = () => {
        Modal.confirm({
            title: 'Gỡ tài khoản',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn muốn gỡ tài khoản',
            okText: 'Gỡ tài khoản',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    setLoading(true);
                    await staffsApi.deleteStaff(store._id as string, staffId);
                    message.success('Gỡ tài khoản thành công');
                    history.push('/setting/account');
                } catch (error) {
                    message.error('Lỗi gỡ tài khoản');
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    return React.cloneElement(children, { onClick: removeAccount, loading });
};

export default RemoveAccount;
