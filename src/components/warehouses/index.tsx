import { CaretDownFilled } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { IWarehouse } from '../../models';
import { IState } from '../../store/rootReducer';
import { useWarehouses } from './useWarehouse';
import './warehouses.less';

interface Props {
    warehouseId?: string;
    selectWareHouse: (key: string) => void;
}

const Warehouses: FC<Props> = ({ warehouseId, selectWareHouse }) => {
    const store = useSelector((state: IState) => state.store.data);
    const { warehouse, warehouses } = useWarehouses(warehouseId || store.warehouseId);

    const handleSelectWarehouse = (menu: any) => {
        selectWareHouse(menu.key);
    };

    const overlay = (
        <Menu onClick={handleSelectWarehouse}>
            {warehouses.map((warehouse: IWarehouse) => (
                <Menu.Item key={warehouse._id}>{warehouse.name}</Menu.Item>
            ))}
        </Menu>
    );

    const label = warehouse?.name || '';

    return (
        <Dropdown overlay={overlay} className="warehouses-btn" trigger={['click']}>
            <Button type="primary">
                <Row justify="space-between" align="middle">
                    <Col>{label}</Col>
                    <Col>
                        <CaretDownFilled />
                    </Col>
                </Row>
            </Button>
        </Dropdown>
    );
};

export default memo(Warehouses);
