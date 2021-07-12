import { ExclamationCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import staffsApi from '../../../../../api/staff-api';
import { IStaff } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useStaffs } from '../../state';
import FormStaff, { EFormStaff } from '../add-staff/form-staff';

interface Props {
    staff: IStaff;
}

const TableActionStaff: FC<Props> = ({ staff }) => {
    const history = useHistory();
    const { loadStaffs } = useStaffs();
    const store = useSelector((state: IState) => state.store.data);
    const [visible, setVisible] = useState<boolean>(false);

    const toggle = () => setVisible(!visible);

    const handleRemoveStaff = () => {
        Modal.confirm({
            title: 'Xóa nhân viên',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn chắc chắn muốn xóa nhân viên?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await staffsApi.deleteStaff(store._id as string, staff._id);
                    message.success('Đã xóa nhân viên thành công');
                    loadStaffs(store._id);
                } catch (error) {
                    message.error('Lỗi xóa nhân viên');
                } finally {
                }
            },
        });
    };

    const onClick = ({ key }: any) => {
        if (key === 'remove') {
            handleRemoveStaff();
        }

        if (key === 'edit') {
            // toggle();
            history.push(`/setting/account/${staff._id}`);
        }
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="remove">Xóa</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button>
                    <MenuOutlined />
                </Button>
            </Dropdown>
            <Modal visible={visible} onCancel={toggle} footer={null} title="Chỉnh sửa nhân viên">
                <FormStaff toggle={toggle} type={EFormStaff.edit} staff={staff} />
            </Modal>
        </>
    );
};

export default TableActionStaff;
