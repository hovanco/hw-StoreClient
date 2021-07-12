import { EBillingPackageType } from '../../../../api/billing-api';

export interface IState {
    packages: any[];
    billingCycles: any[];
    paymentMethods: any[];
    packagesSelect: any[];
    billingCycle: any;
    paymentMethod: any;
    coupon: string;
    allPackages: IPackage[];
    packagesActive: IPackage[];
    packagesInactive: IPackage[];
    loading: boolean;
    showWarningExperiedPackage: boolean;
    showWarningExperiedTrail: boolean;
    namePackageExperied: string[];
    packagesNeedExtend: any[];
    transactionCode: string;
    listHistoryPayment: IPackage[];
}

export interface IAction {
    type: string;
    payload: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}

export interface IPackage {
    id: string;
    active: boolean;
    period: number;
    bonusPeriod: number;
    packageType: EBillingPackageType;
    storeId: string;
    paymentType: number;
    transactionCode: string;
    total: number;
    createdAt: string;
    updatedAt: string;
    expiredAt: string;
}
