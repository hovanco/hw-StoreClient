import { Form, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import storeApi from '../../../../../api/store-api';
import { getToken } from '../../../../../api/token';
import { uploadImagesRequest } from '../../../../../api/upload-api';
import imgPlaceholder from '../../../../../assets/images/img-placeholder.svg';
import { Loading } from '../../../../../components';
import constants from '../../../../../constants';
import types from '../../../../../reducers/storeState/type';
import { IState } from '../../../../../store/rootReducer';
import './other-infor.less';

const label = (
    <div className="labelLogo">
        Logo <span>(PNG, JPG, JPEG)</span>
    </div>
);

const OtherInfor: FC = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const store = useSelector((state: IState) => state.store.data);

    const onChange = async (info: UploadChangeParam<UploadFile<any>>) => {
        const accessToken = getToken('accessToken');

        if (info.file && accessToken) {
            setLoading(true);

            try {
                const response = await uploadImagesRequest({
                    token: accessToken,
                    storeId: store._id as string,
                    files: [info.file.originFileObj],
                });

                const data = {
                    logoUrl: response[0].key as string,
                };

                const newStore = await storeApi.updateStore(store._id as string, data);

                dispatch({
                    type: types.SET_STORE,
                    payload: newStore,
                });
                message.success('Cập nhật logo cho cửa hàng thành công');
            } catch (error) {
                message.error('Lỗi cập nhật logo cho cửa hàng');
            } finally {
                setLoading(false);
            }
        }
    };

    if (store.logoUrl) {
    }

    const renderLogo = () => {
        if (store.logoUrl) {
            const srcImage = `${constants.URL_IMG}${store.logoUrl}`;
            return (
                <div className="logoStore">
                    <img src={srcImage} alt={store.name} />
                </div>
            );
        }

        return (
            <div className="logoShop">
                <img src={imgPlaceholder} alt="img-insa" />
                <p>Chọn hoặc kéo thả để tải ảnh</p>
            </div>
        );
    };

    return (
        <Form.Item label={label}>
            <ImgCrop rotate>
                <Dragger
                    showUploadList={false}
                    accept=".png, .jpeg, .jpg"
                    onChange={onChange}
                    customRequest={() => {}}
                >
                    {loading && <Loading full />}
                    {renderLogo()}
                </Dragger>
            </ImgCrop>
        </Form.Item>
    );
};

export default OtherInfor;
