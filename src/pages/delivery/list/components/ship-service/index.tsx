import { Tag, Tooltip } from 'antd';
import React, { FC, memo } from 'react';
import './ship-transport.less';
import cls from 'classnames';

const ships: { [key: number]: { id: string; title: string; color: string } } = {
    2: {
        id: 'GHN',
        title: 'Giao hàng nhanh',
        color: '#FF8216',
    },
    1: {
        id: 'GHTK',
        title: 'Giao hàng tiết kiệm',
        color: '#11924B',
    },
};

const statusTransportService = (serviceId?: number): string => {
    if (serviceId === 1) return 'Nhanh';
    return 'Tiêu chuẩn';
};

interface Props {
    type?: 'vertical' | 'horizontal';
    deliveryOptions: {
        serviceId?: number;
        transportType?: number;
    };
    showTypeDelivery?: boolean;
}

const ShipService: FC<Props> = ({
    deliveryOptions,
    type = 'vertical',
    showTypeDelivery = true,
}) => {
    const ship = ships[deliveryOptions.serviceId as number];
    if (!ship)
        return (
            <div className="ship-service">
                <Tooltip title="Tự vận chuyển" className="ship-service-label">
                    <Tag>TVC</Tag>
                </Tooltip>
            </div>
        );

    const className = cls('ship-service', {
        vertical: type === 'vertical',
        horizontal: type === 'horizontal',
    });

    return (
        <div className={className}>
            <Tooltip title={ship.title}>
                <Tag color={ship.color} className="ship-service-label">
                    {ship.id}
                </Tag>
            </Tooltip>

            {deliveryOptions.serviceId && showTypeDelivery && (
                <div className="ship-service-transport">
                    {statusTransportService(deliveryOptions.transportType)}
                </div>
            )}
        </div>
    );
};

export default memo(ShipService);
