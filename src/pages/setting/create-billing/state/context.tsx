import { message } from 'antd';
import { dropWhile, maxBy, some, filter, forEach, set, keys, map } from 'lodash';
import moment from 'moment';
import React, { createContext, FC, ReactNode, useContext, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    AliasPackage,
    createBuyOrder,
    createTransactionCode,
    EBillingPackageType,
    FormBuy,
    getHistoryPayment,
    getPackagesActive,
    getPendingBilling,
    Packages,
    BillingPeriods,
} from '../../../../api/billing-api';
import { convertPackages } from '../../../../helper/convert';
import {
    checkExpiredPackage,
    checkExpiredTrialForLegacyStore,
    checkWarningTrialExpiration,
} from '../../../../helper/get-time';
import { IStoreState } from '../../../../reducers/storeState/reducer';
import { IPackageBiling } from '../../list-billings/package-biling';
import {
    hideLoading,
    hideWarningExperiedPackage,
    hideWarningExperiedTrial,
    showLoading,
    showWarningExperiedPackage,
    showWarningExperiedTrial,
} from './action';
import { IContext, IPackage } from './interface';
import reducer, { initialReducer } from './reducer';
import types from './types';

const initialContext = {
    state: initialReducer,
    dispatch: () => {},
};

const CreateBillingContext = createContext<IContext>(initialContext);

const TIME_SHOW_FOR_PACKAGE = 10;

interface Props {
    children: ReactNode;
    packagesSelect?: string;
    billingCycle?: string;
    paymentMethod?: number;
    reorder?: boolean;
}

const ProviderBillingContext: FC<Props> = ({
    children,
    packagesSelect,
    billingCycle,
    paymentMethod,
    reorder,
}) => {
    const [state, dispatch] = useReducer(reducer, initialReducer);
    return (
        <CreateBillingContext.Provider value={{ state, dispatch }}>
            {children}
        </CreateBillingContext.Provider>
    );
};

const useBilling = () => {
    const value = useContext(CreateBillingContext);
    const history = useHistory();

    const storeId = useSelector(({ store }: { store: IStoreState }) => store.data._id);
    const storeCreateTime = useSelector(
        ({ store }: { store: IStoreState }) => store.data.createdAt,
    );

    const { state, dispatch } = value;
    /**
     * init data for CreateBilling with param from url
     * @param packagesSelectCode
     * @param paymentMethod
     * @param billingCycle
     * @param reorder
     */
    const init = async (
        packagesSelectCode: number,
        paymentMethod: number,
        billingCycle: number,
        reorder: boolean,
    ) => {
        try {
            dispatch(showLoading());
            await loadPackagesActive(false);
            const currentPackage = state.packages.find(
                (item: IPackageBiling) => item.code === packagesSelectCode,
            );
            dispatch(hideLoading());
            const initialState: any = {
                paymentMethod,
            };
            if (!reorder) {
                initialState.packagesSelect = currentPackage ? [currentPackage] : [];
                initialState.billingCycle = billingCycle || null;
            }
            dispatch({
                type: types.INIT_STATE,
                payload: initialState,
            });
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    /**
     * Get list package and check experiod to show warning
     * @param showLoad
     */
    const loadPackagesActive = async (showLoad: boolean) => {
        if (!storeId) return;
        hideWarningExperiedTrial();
        hideWarningExperiedPackage();
        showLoad && dispatch(showLoading());
        const pkgsActive: IPackage[] = await getPackagesActive(storeId);
        const pkgsInactive: IPackage[] = await getPendingBilling(storeId);
        let listName: string[] = [];
        const listPackage: IPackageBiling[] = [];
        const isExpired = pkgsActive?.length === 0;

        const packageNamesToShow = {
            [EBillingPackageType.Pos]: false,
            [EBillingPackageType.Facebook]: false,
            [EBillingPackageType.Trial]: false,
            [EBillingPackageType.Shopee]: false,
            [EBillingPackageType.Omni]: false,
        }

        if (!isExpired) {

            const packageTrial = pkgsActive.find(
                (item) => item.packageType === EBillingPackageType.Trial,
            );

            const packageAnotherTrial = dropWhile(pkgsActive, ['_id', packageTrial?._id]);
            const packageMaxExpired: IPackage = maxBy(packageAnotherTrial, function (o) {
                return Math.round(moment(o.expiredAt).diff(moment(), 'days', true));
            });

            const pkgsActiveConvert = convertPackages(pkgsActive);
            pkgsActiveConvert.forEach((item: IPackage) => {
                let duration = TIME_SHOW_FOR_PACKAGE;
                const checkExpired = checkExpiredPackage(item.expiredAt, duration);
                if (checkExpired) {
                    if (item.packageType === EBillingPackageType.Trial) {
                        set(packageNamesToShow, EBillingPackageType.Trial, true);
                    }
                    const pkg = Packages.find((pack: IPackageBiling) => item.packageType === pack.code);
                    pkg && listPackage.push(pkg);
                    set(packageNamesToShow, item.packageType, true);
                }
            });

            if (packageMaxExpired && checkWarningTrialExpiration(packageMaxExpired?.expiredAt)) {
                dispatch(showWarningExperiedPackage());
            } else if (
                packageTrial &&
                packageTrial.packageType === EBillingPackageType.Trial &&
                checkWarningTrialExpiration(packageTrial.expiredAt)
            ) {
                dispatch(showWarningExperiedTrial());
            }
        } else {
            if (!storeId) return;
            const listPayment: IPackage[] = await getHistoryPayment(storeId);
            const isTrial = some(listPayment, { packageType: EBillingPackageType.Trial });

            if (isTrial) {
                dispatch(showWarningExperiedTrial());
            } else {
                const currentActivePackage = convertPackages(filter(listPayment, { active: true }));
                forEach(currentActivePackage, (item) => {
                    const pkg = Packages.find((pack: IPackageBiling) => item.packageType === pack.code);
                    pkg && listPackage.push(pkg);
                    set(packageNamesToShow, item.packageType, true);
                })
                dispatch(showWarningExperiedPackage());
            }
        }

        forEach(keys(packageNamesToShow), (type: string) => {
            if (packageNamesToShow[Number(type)]) {
                listName = [...listName, AliasPackage[Number(type)]];
            }
        });

        dispatch({
            type: types.CHANGE_VALUE_FIELD,
            payload: {
                field: 'billingCycle',
                value: pkgsActive?.[0]?.period || BillingPeriods.SixMonths,
            },
        });
        dispatch({
            type: types.UPDATE_PACKAGES,
            payload: listPackage,
        });
        dispatch({
            type: types.SET_PACKAGES_NEED_EXTENED,
            payload: listPackage,
        });
        dispatch({
            type: types.SET_NAME_PACKAGES_EXPERIED,
            payload: listName,
        });
        dispatch({
            type: types.GET_PACKAGES_ACTIVE,
            payload: pkgsActive,
        });
        dispatch({
            type: types.GET_PACKAGES_INACTIVE,
            payload: pkgsInactive,
        });
        dispatch({
            type: types.GET_ALL_PACKAGES,
            payload: pkgsActive,
        });
        await getListHistoryPayment();
    };
    /**
     * update data for package selected
     * @param data
     */
    const updatePackages = (data: any) => {
        dispatch({
            type: types.UPDATE_PACKAGES,
            payload: data,
        });
    };

    const changeValueField = (data: { field: string; value: any }) => {
        dispatch({
            type: types.CHANGE_VALUE_FIELD,
            payload: data,
        });
    };

    const changeCycleForPackage = (data: number) => {
        dispatch({
            type: types.CHANGE_CYCLE_FIELD,
            payload: data,
        });
    };

    const initOrderState = (data: any) => {
        dispatch({
            type: types.INIT_STATE,
            payload: data,
        });
    };

    const resetListNeedExtend = () => {
        dispatch({
            type: types.SET_PACKAGES_NEED_EXTENED,
            payload: [],
        });
    };

    const getListHistoryPayment = async () => {
        if (!storeId) return;
        const listPayment = await getHistoryPayment(storeId);
        dispatch({
            type: types.GET_HISTORY_PAYMENT,
            payload: listPayment,
        });
    };

    /**
     * buy package
     */
    const createPayment = async () => {
        try {
            if (!storeId) return;
            const transactionCode = await createTransactionCode(storeId, null);
            const data: FormBuy = {
                paymentType: state.paymentMethod,
                period: state.billingCycle,
                transactionCode,
                packageType: state.packagesSelect.reduce(
                    (prevValue: number, item: IPackageBiling) => prevValue + item.code,
                    0,
                ),
            };
            await createBuyOrder(storeId, data);
            message.success('Mua gói thành công');
            await loadPackagesActive(false);
            history.replace('/setting/billings/list');
        } catch (error) {
            message.error('Đã có lỗi xảy ra');
        }
    };

    const genTransationCode = async () => {
        try {
            if (!storeId) return;
            const transactionCode = await createTransactionCode(storeId, null);
            setTransactionCode(transactionCode);
        } catch (error) {
            setTransactionCode();
            message.error('Đã có lỗi xảy ra');
        }
    };

    const setTransactionCode = (code: string = '') => {
        dispatch({
            type: types.SET_TRANSACTION_CODE,
            payload: code,
        });
    };

    const resetTransactionCode = () => setTransactionCode();

    const closeWaringExperiedPackage = () => dispatch(hideWarningExperiedPackage());
    const closeWaringExperiedTrail = () => dispatch(hideWarningExperiedTrial());

    return {
        ...state,
        changeValueField,
        initOrderState,
        updatePackages,
        changeCycleForPackage,
        createPayment,
        closeWaringExperiedPackage,
        closeWaringExperiedTrail,
        init,
        loadPackagesActive,
        genTransationCode,
        resetTransactionCode,
        resetListNeedExtend,
    };
};

export { ProviderBillingContext as default, useBilling };
