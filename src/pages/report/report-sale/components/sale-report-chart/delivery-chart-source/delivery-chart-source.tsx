import { Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useReportSale } from '../../../state';

interface Props {}

const DeliveryChartSource: FC<Props> = () => {
    const { data, loading, selectTimes } = useReportSale();

    const dataChart = data.map((item: any) => item.revenue);
    const categoriesChart = data.map((item: any) => item.source);

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ doanh thu" bordered={false}>
            <Row justify="space-between" align="middle">
                <Col>
                    <SelectTime onChange={selectTimes} />
                </Col>
            </Row>

            <div style={{ marginTop: 30 }}>
                <ReportChart categories={categoriesChart} data={dataChart} loading={loading} name='Doanh thu' />
            </div>
        </Card>
    );
};

export { DeliveryChartSource };
