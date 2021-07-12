import reportApi from '../../../../api/report-api';
import { getEndTime, getStartTime } from '../../../../helper/get-time';
import { ITimeReport } from './interface';

interface IDataValue {
    storeId: string;
    time: ITimeReport;
}

async function loadCountReport({ storeId, time }: IDataValue) {
    const response = await reportApi.countReport({
        storeId,
        startTime: getStartTime({
            type: time.type,
            date: time.value,
        }),
        endTime: getEndTime({
            type: time.type,
            date: time.value,
        }),
    });

    return response;
}

async function loadRevenueReport({ storeId, time }: IDataValue) {
    const response = await reportApi.revenueReport({
        storeId,
        startTime: getStartTime({
            type: time.type,
            date: time.value,
        }),
        endTime: getEndTime({
            type: time.type,
            date: time.value,
        }),
    });

    return response;
}

async function getReportData({ storeId, time }: IDataValue) {
    const data = await Promise.all([
        loadCountReport({ storeId, time }),
        loadRevenueReport({ storeId, time }),
    ]);

    return {
        counts: data[0],
        revenues: data[1],
    };
}

export { getReportData };
