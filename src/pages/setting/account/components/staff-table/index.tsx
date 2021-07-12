import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { InsaTable } from '../../../../../components';
import constants from '../../../../../constants';
import { EUserRole, IStaff } from '../../../../../models';
import AddStaff from '../add-staff';
import FormSearchStaff from '../form-search-staff';

interface RoleProps {
    role: EUserRole;
}

interface IItemStaff {
    role: EUserRole;
    title: string;
    color: string;
}

export const listStaffs: IItemStaff[] = [
    {
        role: EUserRole.owner,
        title: 'Chủ shop',
        color: '#f50',
    },
    {
        role: EUserRole.manager,
        title: 'Quản lý',
        color: '#2db7f5',
    },
    {
        role: EUserRole.staff,
        title: 'Nhân viên',
        color: '#87d068',
    },
];

const Role: FC<RoleProps> = ({ role }) => {
    const staff = listStaffs.find((item) => item.role === role);

    if (!staff) {
        return <></>;
    }

    return <Tag color={staff.color}>{staff.title}</Tag>;
};

const columns: ColumnsType<IStaff> = [
    {
        title: 'Họ tên',
        dataIndex: '',
        render: (staff: IStaff) => {
            return (
                <Space>
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        src={`${constants.URL_IMG}${staff.picture}`}
                    />
                    <span>{staff.name}</span>
                </Space>
            );
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'role',
        align: 'center',
        render: (role) => <Role role={role} />,
    },
];

interface Props {
    loading: boolean;
    staffs: IStaff[];
    searchStaff: (text: string) => void;
}

const StaffTable: FC<Props> = ({ loading, staffs, searchStaff }) => {
    const history = useHistory();
    const [page, setPage] = useState<number>(1);
    const headerExtend = (
        <>
            <Col>
                <FormSearchStaff searchStaff={searchStaff} />
            </Col>

            <Col>
                <AddStaff />
            </Col>
        </>
    );

    const dataSource = staffs.map((staff, index) => ({ ...staff, index: index + 1 }));

    return (
        <InsaTable
            name="Danh sách tài khoản"
            headerExtend={headerExtend}
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            bordered
            rowKey="_id"
            isShowTotal
            className="hover"
            pagination={{
                total: dataSource.length,
                showSizeChanger: false,
                current: page,
                pageSize: 20,
                onChange: (value) => {
                    setPage(Number(value));
                },
            }}
            onRow={(staff) => {
                return {
                    onClick: () => {
                        history.push(`/setting/account/${staff._id}`);
                    },
                };
            }}
        />
    );
};

export default StaffTable;
