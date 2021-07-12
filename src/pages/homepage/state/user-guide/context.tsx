import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { useSelector } from 'react-redux';
import { getUserStorePreference } from '../../../../api/user-store-preference-api';
import { Loading } from '../../../../components';
import { IState } from '../../../../store/rootReducer';
import { initialStateGuide, reducerUserGuide } from './reducer';
import types from './types';

const initialContext = {
    state: initialStateGuide,
    dispatch: () => {},
};
interface IContext {
    state: any;
    dispatch: React.Dispatch<any>;
}
const UserGuideContext = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
}

const ProviderUserGuide: FC<Props> = ({ children }) => {
    const store = useSelector((state: IState) => state.store.data);
    const [state, dispatch] = useReducer(reducerUserGuide, initialStateGuide);

    useEffect(() => {
        async function loadUserStorePreferences(storeId: string) {
            try {
                dispatch({ type: types.LOADING });
                const response = await getUserStorePreference(storeId);

                if (!response.data) {
                    dispatch({ type: types.LOAD_DONE });
                    return;
                }

                dispatch({ type: types.LOAD_DONE, payload: response.data });
                return;
            } catch (error) {
                dispatch({ type: types.LOAD_DONE });
            }
        }
        if (store._id) {
            loadUserStorePreferences(store._id);
        }
    }, [store._id]);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    if (state.loading) {
        return <Loading full />;
    }

    return <UserGuideContext.Provider value={value}>{children}</UserGuideContext.Provider>;
};

const useUserGuide = () => {
    const { state, dispatch } = useContext(UserGuideContext);

    const updateUserGuide = (hideNewUserGuide: boolean) => {
        const userGuide = {
            ...state.userGuide,
            hideNewUserGuide,
        };
        dispatch({
            type: types.UPDATE_USER_GUIDE,
            payload: userGuide,
        });
    };

    return {
        ...state,
        updateUserGuide,
    };
};

export { ProviderUserGuide, useUserGuide };
