import { Col, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../api/order-api';
import { Loading, PageTopWrapper, SelectTime, Warehouses } from '../../../components';
import { ETypeTime } from '../../../components/select-time';
import { getEndTime, getStartTime, ITypeTime } from '../../../helper/get-time';
import { DefaultLayout } from '../../../layout';
import { IState } from '../../../store/rootReducer';
import { CodStatus, StatusCounts } from './components';
import './style.less';

const ms_of_day = 24 * 60 * 60 * 1000;

const getTimes = ({ type, date }: { type: ITypeTime; date?: any }): number[] => {
    const startTime = getStartTime({
        type,
        date: date && date.length > 0 ? date[0] : date,
    });
    const endTime = getEndTime({
        type,
        date: date && date.length > 0 ? date[1] : date,
    });

    return [startTime, endTime];
};

function OverviewDelivery() {
    const store = useSelector((state: IState) => state.store.data);
    const [times, setTimes] = useState<number[] | any>(getTimes({ type: 'month' }));

    const [loading, setLoading] = useState<boolean>(true);

    const [deliveryStatus, setDeliveryStatus] = useState<any>();

    const [warehouse, setWarehouse] = useState<string>();

    const selectWareHouse = (warehouseId: string) => {
        setWarehouse(warehouseId);
    };

    const selectTime = ({ typeTime, times }: { typeTime: ETypeTime; times?: number[] }) => {
        const getType = (): ITypeTime => {
            if (typeTime === ETypeTime.today || typeTime === ETypeTime.yesterday) return 'day';
            if (typeTime === ETypeTime.seven_days_ago || typeTime === ETypeTime.custom)
                return 'custom';

            return 'month';
        };

        const getDate = () => {
            if (typeTime === ETypeTime.today) return Date.now();

            if (typeTime === ETypeTime.yesterday) return Date.now() - ms_of_day;

            if (typeTime === ETypeTime.seven_days_ago) {
                const startTime = Date.now() - ms_of_day * 7;
                const endTime = Date.now() - ms_of_day;

                return [startTime, endTime];
            }

            if (typeTime === ETypeTime.custom) {
                return times;
            }

            return undefined;
        };
        if (getType() === 'custom') {
            setTimes(getDate());
        } else {
            setTimes(
                getTimes({
                    type: getType(),
                    date: getDate(),
                })
            );
        }
    };

    useEffect(() => {
        async function loadDeliveryStatus(storeId: string) {
            try {
                setLoading(true);
                const response = await orderApi.getDeliveryStatus({
                    storeId,
                    warehouseId: warehouse || store.warehouseId,
                    startTime: times[0],
                    endTime: times[1],
                });

                setDeliveryStatus(response);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        if (store._id) {
            loadDeliveryStatus(store._id);
        }
    }, [times, store._id, warehouse, store.warehouseId]);

    const renderContent = () => {
        if (loading) return <Loading full />;

        if (!deliveryStatus) return <div />;

        return (
            <Row justify="space-between" className="order-create delivery" gutter={16}>
                <Col span="15">
                    <StatusCounts statusCounts={deliveryStatus.statusCounts} times={times} />
                </Col>

                <Col span="9">
                    <CodStatus codStatus={deliveryStatus.codStatus} />
                </Col>
            </Row>
        );
    };

    return (
        <DefaultLayout title="Delivery Overview">
            <PageTopWrapper
                leftContent={
                    <Typography.Title level={3} style={{ marginBottom: 0 }}>
                        Tổng quan vận chuyển
                    </Typography.Title>
                }
                rightContent={
                    <Space>
                        <Warehouses warehouseId={warehouse} selectWareHouse={selectWareHouse} />

                        <SelectTime onChange={selectTime} />
                    </Space>
                }
            />
            <div className="content">{renderContent()}</div>
        </DefaultLayout>
    );
}
export default OverviewDelivery;
