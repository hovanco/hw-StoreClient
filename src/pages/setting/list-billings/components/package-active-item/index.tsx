import { Row, Col, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import formatMoney from '../../../../../helper/format-money';
import { useBilling } from '../../../create-billing/state/context';
import { IPackage } from '../../../create-billing/state/interface';
import { ICycleBiling, IPackageBiling } from '../../package-biling';
import PackageContent from '../package-content';
import PackageName from '../package-name';

interface IProps {
    data: IPackage[];
}

function PackageActiveItem(props: IProps) {
    const list = props?.data;
    const data = list?.[0];
    const { packages } = useBilling();
    const dataDuration = [
        {
            title: 'Ngày đăng ký',
            value: moment(data.updatedAt).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày hết hạn',
            value: data?.active ? moment(data.expiredAt).format('DD/MM/YYYY') : ' ---',
        },
    ];
    const dataPay = [
        {
            title: 'Tổng tiền',
            value: `${formatMoney(data.total || 0)}đ`,
        },
        {
            title: 'Ngày thanh toán',
            value: data?.active ? moment(data.updatedAt).format('DD/MM/YYYY') : ' ---',
        },
    ];

    return (
        <Row>
            <Col span={11}>
                <Space direction="vertical" size={18}>
                    {list?.map((pkgActive: IPackage) => {
                        const pkg = packages.find(
                            (item: IPackageBiling) => item.code === pkgActive.packageType
                        );
                        if (!pkg) return null;
                        const cycle = pkg.cycles.find(
                            (item: ICycleBiling) => item.id === pkgActive.period
                        );
                        return (
                            <Row key={pkg.id}>
                                <Col span={8}>
                                    <PackageName title={pkg.alias} bgColor={pkg.color} />
                                </Col>
                                <Col span={16} style={{ height: '100%', paddingLeft: 19 }}>
                                    <Row justify="space-between">
                                        <PackageContent
                                            spanTitle={10}
                                            title={`${pkg.package} ${cycle.name}`}
                                            data={dataDuration}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                        );
                    })}
                </Space>
            </Col>
            <Col span={7} />
            <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <Row style={{ width: '100%' }}>
                    <PackageContent spanTitle={12} title="Hóa đơn thanh toán" data={dataPay} />
                </Row>
            </Col>
        </Row>
    );
}

export default PackageActiveItem;
