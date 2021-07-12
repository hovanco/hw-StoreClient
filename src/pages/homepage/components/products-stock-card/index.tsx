import { Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import ProductStockChart from './product-stock-chart';

import './product-stock-card.less';

interface Props {
    value?: number;
}

const ProductsStockCard: FC<Props> = ({ value = 0 }) => {
    return (
        <Card className="overview-card" bodyStyle={{ padding: 0 }} bordered={false}>
            <Row>
                <Col
                    style={{
                        width: '30%',
                        minWidth: 120,
                        background: '#d3d7e2',
                    }}
                >
                    <ProductStockChart />
                </Col>
                <Col
                    style={{
                        flex: 1,
                    }}
                >
                    <div className="overview-number">
                        <div className="number">{value}</div>
                        <span className="label">Sản phẩm tồn kho</span>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default ProductsStockCard;
