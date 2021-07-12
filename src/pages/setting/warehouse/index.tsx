import Title from 'antd/lib/typography/Title';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackLink, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { getWarehouses } from '../../../reducers/storeState/action';
import { IState } from '../../../store/rootReducer';
import WarehouseAdd from './components/warehouse-add';
import WarehouseTable from './components/warehouse-table';

const title = 'Quản lý chi nhánh';

const Warehouse: FC = () => {
    const store = useSelector((state: IState) => state.store.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if (store._id) {
            dispatch(getWarehouses(store._id));
        }
    }, [store._id]);

    return (
        <DefaultLayout title={title}>
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink to="/setting" text="Cài đặt" />
                        <Title level={3}>{title}</Title>
                    </>
                }
                rightContent={<WarehouseAdd />}
            />
            <div className="content">
                <WarehouseTable />
            </div>
        </DefaultLayout>
    );
};

export default Warehouse;
