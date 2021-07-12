import { ReportTabItem } from '../../interface';

export const tabRevenue = [
    ReportTabItem.period,
    ReportTabItem.channel,
    // ReportTabItem.sellingProduct,
    ReportTabItem.warehouse,
    // ReportTabItem.order,
    // ReportTabItem.customer,
    ReportTabItem.staff,
    // ReportTabItem.summary,
];

export const tabDelivery = [
    // ReportTabItem.time,
    ReportTabItem.channel,
    ReportTabItem.warehouse,
    // ReportTabItem.order,
    // ReportTabItem.customer,
    // ReportTabItem.staff,
];

export const tabPay = [
    ReportTabItem.period,
    ReportTabItem.payMethod,
    ReportTabItem.province,
    ReportTabItem.staff,
];

export const tabInventory = [
    ReportTabItem.period,
    ReportTabItem.inventory,
    ReportTabItem.province,
    ReportTabItem.product,
    ReportTabItem.order,
];

export const tabWareHousePayment = [
    ReportTabItem.period,
    ReportTabItem.customer,
    ReportTabItem.province,
    ReportTabItem.payMethod,
];

export const tabWareProfitLoss = [
    ReportTabItem.profitLoss,
    ReportTabItem.receivableDebts,
    ReportTabItem.payableDebt,
];

export const tabCustomer = [
    ReportTabItem.period,
    // ReportTabItem.product,
    ReportTabItem.province,
    ReportTabItem.channel,
];

export const ReportSaleTabs = [
    {
        key: 'revenue',
        label: 'Báo cáo doanh thu bán hàng',
        tabs: tabRevenue,
    },
    // {
    //     key: 'profit',
    //     label: 'Báo cáo lợi nhuận',
    //     tabs: tabRevenue,
    // },
    {
        key: 'delivery',
        label: 'Báo cáo giao hàng',
        tabs: tabDelivery,
    },
    // {
    //     key: 'pay',
    //     label: 'Báo cáo thanh toán',
    //     tabs: tabPay,
    // },
];
export const ReportWareHouseTabs = [
    {
        key: 'inventory',
        label: 'Báo cáo hàng nhập kho',
        tabs: tabInventory,
    },
    {
        key: 'profit',
        label: 'Báo cáo thanh toán nhập kho',
        tabs: tabWareHousePayment,
    },
];
export const ReportFinancinalTabs = [
    {
        key: 'financinal',
        label: 'Báo cáo hàng nhập kho',
        tabs: tabWareProfitLoss,
    },
];

export const ReportCustomerTabs = [
    {
        key: 'customer',
        label: 'Báo cáo khách khàng',
        tabs: tabCustomer,
    },
];
