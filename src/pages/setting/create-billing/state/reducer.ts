import { BillingPeriods, EBillingPaymentType, PackagesVisible } from '../../../../api/billing-api';
import { IAction, IState } from './interface';
import types from './types';

const initialReducer: IState = {
    packages: PackagesVisible,
    billingCycles: [],
    paymentMethods: [],
    packagesSelect: [],
    billingCycle: BillingPeriods.SixMonths,
    paymentMethod: EBillingPaymentType.BankTransfer,
    coupon: '',
    allPackages: [],
    packagesActive: [],
    packagesInactive: [],
    loading: true,
    showWarningExperiedPackage: false,
    showWarningExperiedTrail: false,
    namePackageExperied: [],
    packagesNeedExtend: [],
    transactionCode: '',
    listHistoryPayment: [],
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.INIT_STATE:
            return {
                ...state,
                ...action.payload,
            };

        case types.UPDATE_PACKAGES:
            return {
                ...state,
                packagesSelect: action.payload,
            };

        case types.CHANGE_VALUE_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case types.GET_PACKAGES_ACTIVE:
            return {
                ...state,
                packagesActive: action.payload,
                loading: false,
            };
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case types.SET_WARNING_EXPERIED_PACKAGE:
            return {
                ...state,
                showWarningExperiedPackage: action.payload,
            };
        case types.SET_WARNING_EXPERIED_TRY:
            return {
                ...state,
                showWarningExperiedTrail: action.payload,
            };
        case types.SET_NAME_PACKAGES_EXPERIED:
            return {
                ...state,
                namePackageExperied: action.payload,
            };
        case types.SET_PACKAGES_NEED_EXTENED:
            return {
                ...state,
                packagesNeedExtend: action.payload,
            };
        case types.GET_PACKAGES_INACTIVE:
            return {
                ...state,
                packagesInactive: action.payload,
            };
        case types.SET_TRANSACTION_CODE:
            return {
                ...state,
                transactionCode: action.payload,
            };
        case types.GET_ALL_PACKAGES:
            return {
                ...state,
                allPackages: action.payload,
            };
        case types.GET_HISTORY_PAYMENT:
            return {
                ...state,
                listHistoryPayment: action.payload,
            };
        default:
            return state;
    }
};

export { reducer as default, initialReducer };
