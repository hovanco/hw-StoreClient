import { ColumnsType } from 'antd/lib/table';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InsaTable } from '../../../../../components';
import { IWarehouse } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';

const columns: ColumnsType<IWarehouse> = [
    {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        width: 50,
    },
    {
        title: 'Tên chi nhánh',
        align: 'center',
        dataIndex: 'name',
    },
    {
        title: 'Số điện thoại',
        align: 'center',
        dataIndex: 'phoneNo',
    },
    {
        title: 'Địa chỉ',
        align: 'center',
        dataIndex: 'address',
    },
    {
        title: 'Tỉnh/Thành phố',
        align: 'center',
        dataIndex: 'provinceName',
    },
    {
        title: 'Quận/Huyện',
        align: 'center',
        dataIndex: 'districtName',
    },
    {
        title: 'Xã/Phường',
        align: 'center',
        dataIndex: 'wardName',
    },
];

const WarehouseTable: FC = () => {
    const warehouses = useSelector((state: IState) => state.store.warehouses);
    const loading = useSelector((state: IState) => state.store.loadingStore);
    const history = useHistory();

    const dataSource = warehouses.map((warehouse, index) => ({ ...warehouse, index: index + 1 }));

    return (
        <InsaTable
            name="Danh sách chi nhánh"
            columns={columns}
            bordered
            loading={loading}
            rowKey="_id"
            dataSource={dataSource}
            onRow={(record, _) => {
                return {
                    onClick: () => {
                        history.push({
                            pathname: `/setting/warehouse/${record._id}`,
                            state: {
                                warehouse: record,
                            },
                        });
                    },
                };
            }}
        />
    );
};

export default WarehouseTable;
