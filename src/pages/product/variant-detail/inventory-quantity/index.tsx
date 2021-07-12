import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { IProductVariantDetailParams } from '../../interface';
import { FormInstance } from 'antd/lib/form/Form';

import { Row, Col } from 'antd';
import InventoryQuantityTable from './inventory-quantity-table';
import SearchInventory from './search-inventory';
import SelectWarehouse from './select-warehouse';
import './index.less';

import { IventoryContextProvider } from './context';

interface Props {
    form: FormInstance;
}

const InventoryQuantity: FC<Props> = ({ form }) => {
    const params = useParams<IProductVariantDetailParams>();

    if (params.variantId === 'new') return <></>;

    return (
        <div className="inventory-quantity">
            <IventoryContextProvider form={form}>
                <Row gutter={16}>
                    <Col flex="1">
                        <SearchInventory />
                    </Col>
                    <Col>
                        <SelectWarehouse />
                    </Col>
                </Row>

                <div className="un-card-padding">
                    <InventoryQuantityTable />
                </div>
            </IventoryContextProvider>
        </div>
    );
};

export default InventoryQuantity;
