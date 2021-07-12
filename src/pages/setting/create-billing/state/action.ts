import types from './types';

export const showLoading = () => ({
    type: types.SET_LOADING,
    payload: true,
});
export const hideLoading = () => ({
    type: types.SET_LOADING,
    payload: false,
});

export const showWarningExperiedPackage = () => ({
    type: types.SET_WARNING_EXPERIED_PACKAGE,
    payload: true,
});

export const hideWarningExperiedPackage = () => ({
    type: types.SET_WARNING_EXPERIED_PACKAGE,
    payload: false,
});

export const showWarningExperiedTrial = () => ({
    type: types.SET_WARNING_EXPERIED_TRY,
    payload: true,
});

export const hideWarningExperiedTrial = () => ({
    type: types.SET_WARNING_EXPERIED_TRY,
    payload: false,
});
