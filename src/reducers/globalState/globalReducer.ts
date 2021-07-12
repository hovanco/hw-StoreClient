import { GlobalType } from './globalTypes';

export interface IGlobalCollapseAction {
    type: GlobalType;
    payload: boolean;
}
export interface IGlobalState {
    isCollapsed: boolean;
}
const initState: IGlobalState = {
    isCollapsed: false,
};

const globalReducer = (state = initState, action: IGlobalCollapseAction): IGlobalState => {
    switch (action.type) {
        case GlobalType.TOOGLE_SIDER:
            return {
                ...state,
                isCollapsed: action.payload,
            };
        default:
            return state;
    }
};
export default globalReducer;
