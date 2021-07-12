import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { get } from 'lodash';
import React, { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import warehouseApi from '../../../../../api/warehouse-api';
import { IState } from '../../../../../store/rootReducer';

interface Props {
    title?: string;
    warehouseId: string;
    children: ReactElement;
}
const RemoveWarehouse: FC<Props> = ({ title, warehouseId, children }) => {
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const removeWarehouse = () => {
        Modal.confirm({
            title: 'Xóa chi nhánh',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn muốn xóa chi nhánh',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    setLoading(true);
                    await warehouseApi.deleteWarehouse({
                        storeId: store._id as string,
                        warehouseId
                    });
                    message.success('Xóa chi nhánh thành công');
                    history.push('/setting/warehouse');
                } catch (error) {
                    if (get(error, 'response.data.message') === 'HAS_RELATED_ORDER') {
                        message.error('Chi nhánh đã tồn tại đơn hàng nên không thể xóa.');
                    } else {
                        message.error('Xóa chi nhánh thất bại');
                    }
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    return React.cloneElement(children, { onClick: removeWarehouse, loading });
};

export default RemoveWarehouse;
