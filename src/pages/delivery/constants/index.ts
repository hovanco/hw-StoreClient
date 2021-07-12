import { ETransportStatus, ORDER_STATUS } from '../../../models';

interface IStatusTransport {
    value: ORDER_STATUS | ETransportStatus;
    label: string;
}

const statusSelfTransport: IStatusTransport[] = [
    { value: ORDER_STATUS.NEW, label: 'Chờ đóng gói' },
    { value: ORDER_STATUS.WAIT_FOR_DELIVERY, label: 'Đã đóng gói' },
    { value: ORDER_STATUS.DELIVERING, label: 'Đang giao hàng' },
    { value: ORDER_STATUS.CANCELED, label: 'Hủy giao hàng - chờ nhận' },
    { value: ORDER_STATUS.DELIVERED, label: 'Đã giao hàng' },
    { value: ORDER_STATUS.RETURNED, label: 'Hủy giao hàng - đã nhận' },
];

const statusServiceTransport: IStatusTransport[] = [
    { value: ETransportStatus.Picking, label: 'Đang nhận hàng' },
    { value: ETransportStatus.Picked, label: 'Đã nhận hàng' },
    { value: ETransportStatus.Storing, label: 'Đang nhập kho' },
    { value: ETransportStatus.Delivering, label: 'Đang giao hàng' },
    { value: ETransportStatus.Delivered, label: 'Đã giao hàng' },
    { value: ETransportStatus.Return, label: 'Đang trả hàng' },
    { value: ETransportStatus.Returned, label: 'Đã trả hàng' },
];

export { statusSelfTransport, statusServiceTransport };
