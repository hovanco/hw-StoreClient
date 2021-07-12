import React from 'react';
import icon from './components/report-tabs/icon';

export enum ETabReportCustomer {
    Time,
    WareHouse,
    Source,
}

export enum ReportRouteType {
    Sale = 'sale',
    WareHouse = 'warehouse',
    Financinal = 'financinal',
    Customer = 'customer',
}

export const ReportTabItem = {
    period: {
        label: 'Theo thời gian',
        key: 'period',
        icon: icon.time,
    },
    channel: {
        label: 'Theo kênh bán hàng',
        key: 'channel',
        icon: icon.source,
    },
    sellingProduct: {
        label: 'Sản phẩm bán chạy',
        key: 'sellingProduct',
        icon: icon.sellingProduct,
    },
    province: {
        label: 'Theo khu vực',
        key: 'province',
        icon: icon.warehouse,
    },

    warehouse: {
        label: 'Theo chi nhánh',
        key: 'warehouse',
        icon: icon.warehouse,
    },

    order: {
        label: 'Theo đơn hàng',
        key: 'order',
        icon: icon.order,
    },
    customer: {
        label: 'Theo khách hàng',
        key: 'customer',
        icon: icon.customer,
    },
    staff: {
        label: 'Theo nhân viên',
        key: 'staff',
        icon: icon.staff,
    },
    summary: {
        label: 'Báo cáo bán hàng tổng hợp',
        key: 'summary',
        icon: icon.summary,
    },
    payMethod: {
        label: 'Hình thức thanh toán',
        key: 'payMethod',
        icon: icon.payMethod,
    },
    inventory: {
        label: 'Báo cáo nhập hàng theo nhà cung cấp',
        key: 'inventory',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="18.95"
                viewBox="0 0 22 18.95"
            >
                <g>
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M21 8.18v-2A1.34 1.34 0 0 0 20.25 5a18.43 18.43 0 0 0-16.5 0A1.34 1.34 0 0 0 3 6.22v2A3 3 0 0 0 1 11v8a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-8a3 3 0 0 0-2-2.82zM5 6.62a16.49 16.49 0 0 1 14 0V8H5zM8 20v-5h3v5zm5 0v-5h3v5zm8-1a1 1 0 0 1-1 1h-2v-5.5a1.5 1.5 0 0 0-1.5-1.5h-9A1.5 1.5 0 0 0 6 14.5V20H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"
                        transform="translate(-1 -3.05)"
                    />
                </g>
            </svg>
        ),
    },
    product: {
        label: 'Báo cáo nhập hàng theo sản phẩm',
        key: 'inventory',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.001"
                height="22.033"
                viewBox="0 0 22.001 22.033"
            >
                <g>
                    <g>
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M20.44 1.61L16.55 1a3 3 0 0 0-3.39 2.41l-.16.95a1 1 0 0 1-2 0l-.18-.92A3 3 0 0 0 7.45 1l-3.89.58a3 3 0 0 0-2.56 3v3.36a2.51 2.51 0 0 0 2.44 2.56.56.56 0 0 1 .56.56V20a3 3 0 0 0 3 3h9.1a2.9 2.9 0 0 0 2.9-2.9v-8.79a.83.83 0 0 1 .88-.81A3 3 0 0 0 23 7.63v-3a3 3 0 0 0-2.56-3.02zm.56 6a.9.9 0 0 1-.88.92A3 3 0 0 0 17 11.38V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8.94A2.51 2.51 0 0 0 3.56 8.5.56.56 0 0 1 3 7.94V4.58a1 1 0 0 1 .85-1L7.75 3a1 1 0 0 1 1.13.8l.17.93a3 3 0 0 0 5.9 0l.17-.93a1 1 0 0 1 1.13-.8l3.9.58a1 1 0 0 1 .85 1z"
                            transform="translate(-.999 -.967)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    profitLoss: {
        label: 'Báo cáo lãi lỗ',
        key: 'profitLoss',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                <g transform="translate(-1 -1)">
                    <g id="Vrstva_295">
                        <path
                            d="M20 1H4a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h2v1a1 1 0 0 0 2 0v-1h8v1a1 1 0 0 0 2 0v-1h2a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zm1 17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"
                            fill="currentColor"
                        />
                        <circle
                            cx="2"
                            cy="2"
                            r="2"
                            fill="currentColor"
                            transform="translate(10.35 9)"
                        />
                        <path
                            d="M17.24 14.47a6 6 0 0 0 0-6.94l1.11-1.12A1 1 0 1 0 16.94 5l-1.12 1.11a6 6 0 0 0-6.94 0L7.76 5a1 1 0 0 0-1.41 1.41l1.11 1.12a6 6 0 0 0 0 6.94l-1.11 1.12A1 1 0 1 0 7.76 17l1.12-1.11a6 6 0 0 0 6.94 0L16.94 17a1 1 0 1 0 1.41-1.41zM8.35 11a4 4 0 1 1 4 4 4 4 0 0 1-4-4z"
                            fill="currentColor"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    receivableDebts: {
        label: 'Báo cáo công nợ phải thu',
        key: 'receivableDebts',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                <g id="Layer" transform="translate(-1 -1)">
                    <path
                        id="Path_613"
                        d="M20 1H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zm0 2a1 1 0 0 1 1 1v7h-8V3zM3 4a1 1 0 0 1 1-1h7v8H3zm1 17a1 1 0 0 1-1-1v-7h8v8zm17-1a1 1 0 0 1-1 1h-7v-8h8z"
                        fill="currentColor"
                    />
                    <path
                        id="Path_614"
                        d="M9 6H8V5a1 1 0 0 0-2 0v1H5a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 0 0 0-2z"
                        fill="currentColor"
                    />
                    <path
                        id="Path_615"
                        d="M9 16H5a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2z"
                        fill="currentColor"
                    />
                    <path
                        id="Path_616"
                        d="M15.17 16.5h4a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2z"
                        fill="currentColor"
                    />
                    <path
                        id="Path_617"
                        d="M19.17 17.5h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2z"
                        fill="currentColor"
                    />
                    <path
                        id="Path_618"
                        d="M14.88 6.29l.71.71-.71.71a1 1 0 0 0 1.41 1.41l.71-.71.71.71a1 1 0 0 0 1.41-1.41L18.41 7l.71-.71a1 1 0 0 0-1.41-1.41l-.71.71-.71-.71a1 1 0 0 0-1.41 1.41z"
                        fill="currentColor"
                    />
                </g>
            </svg>
        ),
    },
    payableDebt: {
        label: 'Báo cáo công nợ phải trả',
        key: 'payableDebt',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                <g transform="translate(-1 -1)">
                    <g>
                        <path
                            d="M20 1H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zm1 19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"
                            fill="currentColor"
                        />
                        <path
                            d="M18.43 6.13a1 1 0 0 0-1.41 0L5.71 17.45a1 1 0 1 0 1.41 1.41L18.43 7.55a1 1 0 0 0 0-1.42z"
                            fill="currentColor"
                        />
                        <path
                            d="M7.5 10.43A2.5 2.5 0 1 0 5 7.93a2.5 2.5 0 0 0 2.5 2.5zm0-3a.5.5 0 1 1-.5.5.5.5 0 0 1 .5-.5z"
                            fill="currentColor"
                        />
                        <path
                            d="M16.5 14.43a2.49 2.49 0 1 0 1.771.729 2.5 2.5 0 0 0-1.771-.729zm0 3a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5z"
                            fill="currentColor"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
};
