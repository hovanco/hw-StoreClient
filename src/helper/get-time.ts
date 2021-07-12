import moment from 'moment';
import _ from 'lodash';
import { IPackage } from '../pages/setting/create-billing/state/interface';

export type ITypeTime = 'month' | 'day' | 'week' | 'custom';

interface IGetTime {
    type: ITypeTime;
    date: any;
}

const format_date = 'DD/MM/YYYY';

export function getStartTime({ type, date }: IGetTime): number {
    // day
    if (type === 'day') {
        return moment(date).startOf('day').toDate().getTime();
    }

    // week
    if (type === 'week') {
        const weekStart = moment(date).startOf('week');

        return moment(weekStart).add(0, 'days').startOf('day').valueOf();
    }

    // custom
    if (type === 'custom') {
        return moment(date[0]).startOf('day').valueOf();
    }

    const month = moment(date).format('MM');
    const year = moment(date).format('YYYY');

    return moment(`1/${month}/${year}`, format_date).startOf('day').valueOf();
}

export function getEndTime({ type, date }: IGetTime): number {
    // day
    if (type === 'day') {
        return moment(date).endOf('day').toDate().getTime();
    }

    // week
    if (type === 'week') {
        const weekStart = moment(date).startOf('week');

        return moment(weekStart).add(6, 'days').endOf('day').valueOf();
    }

    // custom
    if (type === 'custom') {
        return date[1] ? moment(date[1]).endOf('day').valueOf() : moment().endOf('day').valueOf();
    }
    const dateInMonth: number = moment().daysInMonth();
    const month = moment(date).format('MM');
    const year = moment(date).format('YYYY');

    return moment(`${dateInMonth}/${month}/${year}`, format_date).endOf('day').valueOf();
}

function getNumOfDaysUntilExpired (timeStart: moment.Moment, timeEnd: moment.Moment) {
    return timeEnd.diff(timeStart, 'days')
}

/**
 * check expired of package
 * @param time
 * @param rest
 */
export function checkExpiredPackage(time: string, rest: number) {
    let duration = getNumOfDaysUntilExpired(moment(), moment(time))
    return duration <= rest;
}

/**
 * check expired of trial
 * @param time
 * @param rest
 */
export function checkExpiredTrialForLegacyStore(storeCreatedAt: string): Boolean {
    let duration = getNumOfDaysUntilExpired(moment(storeCreatedAt), moment())
    return duration > 30;
}

export function isExpiredPackage(expiredTime: string) {
    const endTime = moment(expiredTime);
    const timeCurrent = moment();
    return endTime.diff(timeCurrent, 'days') < 0;
}

export function checkRestrictAction(packagesActive: IPackage[]) {
    return !_.some(packagesActive, (packageAct: IPackage) => !isExpiredPackage(packageAct.expiredAt));
}

export function checkWarningTrialExpiration(expiredAt: string): boolean {
    const duration = getNumOfDaysUntilExpired(moment(), moment(expiredAt));
    return duration >= 0 && duration <= 10;
}
