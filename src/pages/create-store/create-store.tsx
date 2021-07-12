import { Button } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/authState/authAction';
import { Loading } from '../../components';
import { BaseLayout } from '../../layout';
import { storeAction } from '../../reducers/storeState/action';
import { IState } from '../../store/rootReducer';
import './create-store.less';
import FormCreateStore from './form-create-store';

interface Props {}

const title = 'Tạo cửa hàng';

const CreateStore: FC<Props> = () => {
    const loadingStore = useSelector((state: IState) => state.store.loadingStore);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        dispatch(storeAction.getStore());

        // eslint-disable-next-line
    }, []);

    if (loadingStore) {
        return <Loading full />;
    }

    return (
        <BaseLayout title={title}>
            <div className="create-store">
                <div className="create-store-form">
                    <h3 className="title">{title}</h3>
                    <FormCreateStore />
                    <div className="create-store-logout">
                        <Button type="text" onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default CreateStore;
