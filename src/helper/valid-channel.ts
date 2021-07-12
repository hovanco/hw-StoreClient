import { SaleChannelId } from '../models';

const listChannel: string[] = Object.values(SaleChannelId);
const validChannel = (value: string) => listChannel.includes(value);

export { validChannel };
