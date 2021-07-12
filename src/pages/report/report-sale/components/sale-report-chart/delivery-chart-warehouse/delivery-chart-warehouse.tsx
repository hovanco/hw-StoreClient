import { Card, Col, Row } from 'antd';
import { get } from 'lodash';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useReportSale } from '../../../state';

interface Props {}

const DeliveryChartWarehouse: FC<Props> = () => {
    const { loading, data, selectTimes } = useReportSale();

    const dataChart = data.map((item: any) => item.revenue);
    const categoriesChart = data.map((item: any) => get(item, 'warehouse[0].name'));

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ doanh thu" bordered={false}>
            <Row justify="space-between" align="middle">
                <Col>
                    <SelectTime onChange={selectTimes} />
                </Col>
            </Row>

            <div style={{ marginTop: 30 }}>
                <ReportChart loading={loading} data={dataChart} categories={categoriesChart} name='Doanh thu' />
            </div>
        </Card>
    );
};

export { DeliveryChartWarehouse };
