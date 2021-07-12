import { Dispatch } from 'redux';
import { GlobalType } from './globalTypes';
import { IGlobalCollapseAction } from './globalReducer';

export const globalAction = {
    toggleSider: (collapse: boolean) => (dispatch: Dispatch<IGlobalCollapseAction>) =>
        dispatch({
            type: GlobalType.TOOGLE_SIDER,
            payload: collapse,
        }),
};
