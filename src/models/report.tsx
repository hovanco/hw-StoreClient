import React from 'react';

export const ReportTabItem = {
    time: {
        label: 'Theo thời gian',
        key: 'time',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20">
                <g transform="translate(-1 -2)">
                    <g>
                        <path
                            id="Path_72"
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M20 4h-1V3a1 1 0 0 0-2 0v1H7V3a1 1 0 0 0-2 0v1H4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1H3zm18 12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9h18z"
                        />
                        <rect
                            id="Rectangle_4"
                            width="3"
                            height="3"
                            fill="currentColor"
                            rx=".8"
                            transform="translate(5 12)"
                        />
                        <rect
                            id="Rectangle_5"
                            width="3"
                            height="3"
                            fill="currentColor"
                            rx=".8"
                            transform="translate(10 12)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    source: {
        label: 'Theo nguồn hàng',
        key: 'source',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">
                <g>
                    <g>
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M19 1H4.87A2.88 2.88 0 0 0 2 3.87V20a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zm-1.1 2A2.07 2.07 0 0 1 20 4.54 2 2 0 0 1 17.54 7 2.07 2.07 0 0 1 16 4.9V3zM14 3v2a2 2 0 1 1-4-.1V3zM8 3v2a2 2 0 1 1-4-.08V4a1 1 0 0 1 1-1zm1 18v-5a3 3 0 0 1 3.56-2.95 3.09 3.09 0 0 1 2.44 3.1V21zm10 0h-2v-5a5 5 0 0 0-6-4.9 5.13 5.13 0 0 0-4 5.09V21H5a1 1 0 0 1-1-1V8.46a4.14 4.14 0 0 0 3.73.18 3.58 3.58 0 0 0 1.3-1 4 4 0 0 0 3.8 1.25A3.82 3.82 0 0 0 15 7.59a3.79 3.79 0 0 0 2.26 1.34A4 4 0 0 0 20 8.46V20a1 1 0 0 1-1 1z"
                            transform="translate(-2 -1)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    sellingProduct: {
        label: 'Sản phẩm bán chạy',
        key: 'sellingProduct',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="21.745"
                viewBox="0 0 16 21.745"
            >
                <g transform="translate(-4 -1.125)">
                    <g>
                        <path
                            id="Path_210"
                            d="M13.17 1.56a1.79 1.79 0 0 0-2.34 0l-5.78 5A3 3 0 0 0 4 8.79v11.08a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.79a3 3 0 0 0-1-2.27zM18 19.87a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8.79A1 1 0 0 1 6.35 8L12 3.19 17.65 8a1 1 0 0 1 .35.76z"
                            fill="currentColor"
                        />
                        <circle
                            id="Ellipse_17"
                            cx="1.5"
                            cy="1.5"
                            r="1.5"
                            fill="currentColor"
                            transform="translate(10 7.12)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    branch: {
        label: 'Theo chi nhánh',
        key: 'branch',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.983"
                height="21.92"
                viewBox="0 0 15.983 21.92"
            >
                <g transform="translate(-3.998 -1)">
                    <g>
                        <path
                            d="M7.2 17c1.61 2.56 3.34 4.8 3.86 5.46a1.19 1.19 0 0 0 1.88 0c.52-.66 2.25-2.9 3.86-5.46a31.57 31.57 0 0 0 2.18-4 9.56 9.56 0 0 0 1-3.73 8.14 8.14 0 0 0-8-8.27A8.14 8.14 0 0 0 4 9.33a9.56 9.56 0 0 0 1 3.73A31.57 31.57 0 0 0 7.2 17zM12 3a6.14 6.14 0 0 1 6 6.27 7.78 7.78 0 0 1-.84 2.91A30 30 0 0 1 15.11 16C14 17.76 12.76 19.42 12 20.43c-.76-1-2-2.67-3.11-4.48a30 30 0 0 1-2.05-3.71A7.78 7.78 0 0 1 6 9.33a6.14 6.14 0 0 1 6-6.27z"
                            fill="currentColor"
                        />
                        <circle
                            cx="2"
                            cy="2"
                            r="2"
                            fill="currentColor"
                            transform="translate(10 7.06)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    order: {
        label: 'Theo đơn hàng',
        key: 'order',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="21.986"
                viewBox="0 0 17 21.986"
            >
                <g transform="translate(-3.5 -1)">
                    <g id="Vrstva_169">
                        <path
                            d="M17.5 1h-11a3 3 0 0 0-3 3v17.8a1.1 1.1 0 0 0 1.82.83l2.76-2.37 3.8 2.54a1.1 1.1 0 0 0 1.33-.08L16 20.33l2.68 2.3a1.1 1.1 0 0 0 1.82-.83V4a3 3 0 0 0-3-3zm1 18.83l-1.78-1.53a1.12 1.12 0 0 0-1.44 0l-2.86 2.45-3.8-2.54a1.11 1.11 0 0 0-1.33.08L5.5 19.84V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1z"
                            fill="currentColor"
                        />
                        <path d="M7.5 7h7a1 1 0 0 0 0-2h-7a1 1 0 0 0 0 2z" fill="currentColor" />
                        <path d="M7.5 11h4a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2z" fill="currentColor" />
                        <path d="M15.5 13h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2z" fill="currentColor" />
                    </g>
                </g>
            </svg>
        ),
    },
    customer: {
        label: 'Theo khách hàng',
        key: 'customer',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22.003"
                viewBox="0 0 20 22.003"
            >
                <g>
                    <g>
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M15.7 11.72a6 6 0 1 0-7.4 0A10 10 0 0 0 2 21v1a1 1 0 0 0 2 0v-1a8 8 0 0 1 16 0v1a1 1 0 0 0 2 0v-1a10 10 0 0 0-6.3-9.28zM8 7a4 4 0 1 1 4 4 4 4 0 0 1-4-4z"
                            transform="translate(-2 -.997)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    staff: {
        label: 'Theo nhân viên',
        key: 'staff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <g transform="translate(-2 -2)">
                    <g>
                        <path
                            id="Path_455"
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M5 22h14a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-2V9h2a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h2v1H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3zM5 7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1zm10 2v1H9V9zM4 13a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
                        />
                        <circle
                            id="Ellipse_32"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(5 13)"
                        />
                        <circle
                            id="Ellipse_33"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(9 13)"
                        />
                        <circle
                            id="Ellipse_34"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(13 13)"
                        />
                        <circle
                            id="Ellipse_35"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(17 13)"
                        />
                        <circle
                            id="Ellipse_36"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(5 17)"
                        />
                        <circle
                            id="Ellipse_37"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(9 17)"
                        />
                        <circle
                            id="Ellipse_38"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(13 17)"
                        />
                        <circle
                            id="Ellipse_39"
                            cx="1"
                            cy="1"
                            r="1"
                            fill="currentColor"
                            transform="translate(17 17)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    summary: {
        label: 'Báo cáo bán hàng tổng hợp',
        key: 'summary',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.963"
                height="18"
                viewBox="0 0 22.963 18"
            >
                <g>
                    <g>
                        <path
                            fill="currentColor"
                            d="M21.1 16a3 3 0 0 0 .8-2V6a3 3 0 0 0-3-3h-14a3 3 0 0 0-3 3v8a3 3 0 0 0 .91 2.14L.87 18.56A1.5 1.5 0 0 0 2 21h20a1.5 1.5 0 0 0 1.17-2.44zM3.9 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1zm-.82 13l1.6-2h14.64l1.6 2z"
                            transform="translate(-.539 -3)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    payMethod: {
        label: 'Hình thức thanh toán',
        key: 'payMethod',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16">
                <g id="ic-ecommerce-card" transform="translate(-1 -4)">
                    <g id="Layer">
                        <path
                            id="Path_194"
                            d="M20 4H4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM4 6h16a1 1 0 0 1 1 1v1H3V7a1 1 0 0 1 1-1zm16 12H4a1 1 0 0 1-1-1v-7h18v7a1 1 0 0 1-1 1z"
                            fill="currentColor"
                        />
                    </g>
                    <g id="Layer-2">
                        <path
                            id="Path_195"
                            d="M5 14h4a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2z"
                            fill="currentColor"
                        />
                    </g>
                    <g id="Layer-3">
                        <path
                            id="Path_196"
                            d="M12 15H5a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2z"
                            fill="currentColor"
                        />
                    </g>
                </g>
            </svg>
        ),
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
    orderMethod: {
        label: 'Khách hàng theo hành vi mua hàng',
        key: 'orderMethod',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21.574"
                viewBox="0 0 22 21.574"
            >
                <g>
                    <g>
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M20 4.79h-1v-.58a3 3 0 0 0-3.82-2.88L3.73 4.6a1 1 0 0 0-.44.28A3 3 0 0 0 1 7.79v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-12a3 3 0 0 0-3-3zm-4.27-1.54a1 1 0 0 1 1.27 1v.58h-6.64zM21 14.79h-3a1 1 0 0 1 0-2h3zm0-4h-2.85a3.09 3.09 0 0 0-3.1 2.44A3 3 0 0 0 18 16.79h3v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"
                            transform="translate(-1 -1.216)"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
};

export enum ReportRouteType {
    Sale = 'sale',
    WareHouse = 'warehouse',
    Financinal = 'financinal',
    Customer = 'customer',
}
