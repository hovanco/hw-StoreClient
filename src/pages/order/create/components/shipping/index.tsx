import { Radio, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { get } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import shippingApi from '../../../../../api/shipping-api';
import { API_URI } from '../../../../../configs/vars';
import formatMoney from '../../../../../helper/format-money';
import { IOrder } from '../../../../../models';
import { EDeliveryServiceIds, ETransportType } from '../../../../../models/order';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../state/context';
import { EStatusPage, IInfoDelivery, IShip } from '../../state/interface';
import './shipping.less';

const formatShips = (ships: any[]): IShip[] => {
    let new_ships: IShip[] = [];

    ships.forEach((ship) => {
        const { info, shipmentFees } = ship;

        shipmentFees.forEach((s: any) => {
            if (s.transportType) {
                const item: IShip = {
                    avatar: info.avatar,
                    serviceId: info.id,
                    transportType: s.transportType,
                    shipmentFee: s.total,
                    name: info.name,
                };

                new_ships.push(item);
            }
        });
    });
    return new_ships;
};

const useShipping = () => {
    const store = useSelector((state: IState) => state.store.data);
    const { products, infoDelivery, statusPage, warehouseId, order, shipType } = useOrderNew();
    const [loading, setLoading] = useState<boolean>(false);
    const [ships, setShips] = useState<any>([]);

    useEffect(() => {
        async function loadShipping() {
            setLoading(true);

            const toProvinceId = order
                ? (get(order, 'customer.province') as string)
                : (infoDelivery as IInfoDelivery).province;

            const toDistrictId = order
                ? (get(order, 'customer.district') as string)
                : (infoDelivery as IInfoDelivery).district;

            const toWardId = order
                ? (get(order, 'customer.ward') as string)
                : (infoDelivery as IInfoDelivery).ward;

            const weight =
                order && statusPage === EStatusPage.DETAIL
                    ? (get(order, 'products') || []).reduce(
                          (value: number, product: any) =>
                              get(product, 'productId.weight', 0) * product.count + value,
                          0
                      )
                    : products.reduce(
                          (value: number, o: any) => (o.weight || 0) * o.count + value,
                          0
                      );

            const data = {
                toProvinceId,
                toDistrictId,
                toWardId,
                warehouseId: (order as IOrder)
                    ? (get(order, 'warehouseId._id') as string)
                    : warehouseId,
                weight,
                length: 20,
                width: 20,
                height: 10,
            };

            try {
                const response = await shippingApi.servicesTransport({
                    storeId: store._id as string,
                    data,
                });

                setShips(formatShips(response));
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        const valid = (infoDelivery as IInfoDelivery) && warehouseId && products.length > 0;

        if (valid) {
            loadShipping();
        }

        // eslint-disable-next-line
    }, [infoDelivery, products, warehouseId, shipType]);

    const value = useMemo(() => [loading, ships], [loading, ships]);

    return value;
};

const columns_base: ColumnsType<IShip> = [
    {
        title: 'Hãng vận chuyển',
        dataIndex: '',
        key: 'avatar',
        align: 'center',
        render: ({ avatar, serviceId }) => {
            const title = serviceId === EDeliveryServiceIds.GHN ? 'GHN' : 'GHTK';
            return <img src={`${API_URI}/store${avatar}`} style={{ width: 80 }} alt={title} />;
        },
    },
    {
        title: 'Dịch vụ',
        dataIndex: 'transportType',
        key: 'transportType',
        align: 'center',
        render: (transportType) => {
            if (transportType === ETransportType.Fast) return 'Nhanh';
            return 'Tiêu chuẩn';
        },
    },
    {
        title: 'Tổng phí',
        dataIndex: 'shipmentFee',
        key: 'shipmentFee',
        align: 'center',
        render: (shipmentFee) => formatMoney(shipmentFee),
    },
];

const Shipping = () => {
    const { selectShip, ship, statusPage, order } = useOrderNew();
    const [loading, ships] = useShipping();

    useEffect(() => {
        if (statusPage === EStatusPage.EDIT || statusPage === EStatusPage.NEW) {
            const ship_exist = ships.find(
                (shipItem: any) =>
                    shipItem?.serviceId === (order ? order.deliveryOptions?.serviceId : ship?.serviceId) &&
                    shipItem.transportType === (order ? order.deliveryOptions?.transportType : ship?.transportType)
            );

            if (ship_exist) {
                selectShip(ship_exist);
            }
        }

        // eslint-disable-next-line
    }, [ships]);

    const columns: ColumnsType<IShip> =
        order && statusPage === EStatusPage.DETAIL
            ? columns_base
            : [
                {
                    dataIndex: '',
                    key: 'select',
                    width: 40,
                    render: (item) => {
                        const checked =
                            item.serviceId === ship?.serviceId &&
                            item.transportType === ship?.transportType;

                        return <Radio checked={checked} />;
                    },
                },
                ...columns_base,
            ];

    const dataSource =
        statusPage === EStatusPage.DETAIL &&
        [1, 2].includes(get(order, 'deliveryOptions.serviceId'))
            ? ships.filter(
                (ship: IShip) =>
                    ship.serviceId === order?.deliveryOptions?.serviceId &&
                    ship.transportType === order?.deliveryOptions?.transportType
            )
            : ships;

    return (
        <div className="ships">
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            selectShip(record);
                        },
                    };
                }}
                loading={loading}
                bordered
                columns={columns}
                dataSource={dataSource}
                rowKey={(item) => `${item.serviceId}-${item.transportType}`}
                pagination={false}
            />
        </div>
    );
};

export default Shipping;
