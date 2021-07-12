import { Typography, Space, Row, Col, Card, Table } from 'antd';
import React from 'react';
import { useBilling } from '../create-billing/state/context';
import PackageActiveItem from './components/package-active-item';
import PackageName from './components/package-name';
import { EBillingPaymentTypeName } from '../../../api/billing-api';
import { ColumnsType } from 'antd/es/table';
import { IPackage } from '../create-billing/state/interface';
import { IPackageBiling } from './package-biling';
import formatMoney from '../../../helper/format-money';
import { formatDate } from '../../../helper/format';
import { convertPackages } from '../../../helper/convert';

const { Text } = Typography;

const columns: ColumnsType<any> = [
    {
        title: 'Tên gói dịch vụ',
        dataIndex: 'names',
        key: 'names',
        render: (names: any) => {
            return names.map((item: any, index: number) => (
                <Row align="middle" key={index}>
                    <Col span={11}>
                        <PackageName small title={item.alias} bgColor={item.color} />
                    </Col>
                    <Col span={11} offset={1} className="col-name">
                        <Text className="text-info">{item.name}</Text>
                        <br />
                        <Text className="text-info">{item.period}</Text>
                    </Col>
                </Row>
            ));
        },
        align: 'center',
    },
    {
        title: 'Ngày đăng ký',
        dataIndex: 'registeredAt',
        key: 'registeredAt',
        align: 'center',
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'expiredAt',
        key: 'expiredAt',
        align: 'center',
    },
    {
        title: 'Hình thức thanh toán',
        dataIndex: 'paymentType',
        key: 'paymentType',
        align: 'center',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
    },
    {
        title: 'Tổng thanh toán',
        dataIndex: 'total',
        key: 'total',
        align: 'center',
        render: (value, row, index) => {
            const obj: { children: any; props: any } = {
                children: value.price,
                props: {},
            };
            if (value.rowSpan3) {
                obj.props.rowSpan = 3;
            }
            if (value.rowSpan2) {
                obj.props.rowSpan = 2;
            }
            if (value.rowSpan0) {
                obj.props.rowSpan = 0;
            }
            return obj;
        },
    },
];

function convertPackagesByTransactioncode(pkgs: IPackage[]) {
    const list: any = {};
    pkgs.forEach((item: IPackage) => {
        list[item?.transactionCode] = [];
    });
    pkgs.forEach((item: IPackage) => {
        list[item.transactionCode].push(item);
    });
    return Object.values(list);
}

function PackagesActive() {
    const { packagesActive, packagesInactive, packages, listHistoryPayment } = useBilling();
    const packagesActiveToShow = convertPackages(packagesActive);
    const listHistoryPaymentShow = convertPackages(listHistoryPayment);
    const packagesInactiveToShow = convertPackages(packagesInactive);
    const listActivePackage = convertPackagesByTransactioncode(packagesActiveToShow);
    const listInactivePackage = convertPackagesByTransactioncode(packagesInactiveToShow);
    const listActives = listActivePackage.map((item: any, index: number) => (
        <PackageActiveItem key={index} data={item} />
    ));
    const listInactive = listInactivePackage.map((item: any, index: number) => (
        <PackageActiveItem key={index} data={item} />
    ));

    const dataSourceShow = listHistoryPaymentShow?.map((item: IPackage, index: number) => {
        const pkg: IPackageBiling = packages.find(
            (pkg: IPackageBiling) => pkg.code === item.packageType
        );
        const cycleObj = pkg?.cycles.find((cycle: any) => cycle.id === item.period);
        let rowSpan3 = false;
        let rowSpan2 = false;
        let rowSpan0 = false;
        let preItem: IPackage = packagesActiveToShow[index - 1];
        let nextItem: IPackage = packagesActiveToShow[index + 1];
        let thenItem: IPackage = packagesActiveToShow[index + 2];
        let listTransCode = [item?.transactionCode];
        let order = 1;
        if (
            listTransCode.includes(thenItem?.transactionCode) &&
            listTransCode.includes(nextItem?.transactionCode)
        ) {
            rowSpan3 = true;
            order = index;
        }
        if (listTransCode.includes(preItem?.transactionCode)) {
            rowSpan0 = true;
            order = index - 1;
        }
        if (
            !listTransCode.includes(preItem?.transactionCode) &&
            listTransCode.includes(nextItem?.transactionCode)
        ) {
            rowSpan2 = true;
            order = index;
        }
        return {
            key: index,
            names: [
                {
                    alias: pkg?.alias,
                    name: pkg?.package,
                    period: cycleObj?.name,
                    color: pkg?.color,
                    icon: pkg?.icon,
                },
            ],
            expiredAt: formatDate(item?.expiredAt),
            registeredAt: formatDate(item?.createdAt),
            paymentType: EBillingPaymentTypeName[item?.paymentType],
            price: formatMoney(cycleObj?.price || 0),
            total: {
                price: formatMoney(item?.total || 0),
                rowSpan2,
                rowSpan0,
                rowSpan3,
                order,
            },
        };
    });

    const headStyle = { backgroundColor: '#f6f8f8' };
    return (
        <div className="packages-content">
            <Row>
                <Col span={18} offset={3}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        {packagesActive.length > 0 && (
                            <Card title="Gói đang sử dụng" headStyle={headStyle}>
                                <Space size={30} direction="vertical">
                                    {listActives}
                                </Space>
                            </Card>
                        )}
                        {packagesInactive.length > 0 && (
                            <Card title="Gói đang chờ duyệt" headStyle={headStyle}>
                                <Space size={30} direction="vertical">
                                    {listInactive}
                                </Space>
                            </Card>
                        )}
                        <Card
                            title="Lịch sử thanh toán"
                            headStyle={headStyle}
                            bodyStyle={{
                                padding: 0,
                            }}
                        >
                            <Table
                                dataSource={dataSourceShow}
                                columns={columns}
                                pagination={false}
                                bordered
                                rowClassName={(record: any, index: number) => {
                                    return (
                                        (record.total.order > 0 && record.total.order % 2 === 0
                                            ? 'grey'
                                            : '') +
                                        ' ' +
                                        ((!record.total.rowSpan0 &&
                                            !record.total.rowSpan2 &&
                                            !record.total.rowSpan3) ||
                                        record.total.rowSpan2 ||
                                        record.total.rowSpan2
                                            ? 'border-top'
                                            : '')
                                    );
                                }}
                            />
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

export default PackagesActive;
