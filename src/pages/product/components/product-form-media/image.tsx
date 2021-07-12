import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin, Tooltip } from 'antd';
import { get } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeImagesRequest } from '../../../../api/upload-api';
import constants from '../../../../constants';
import { IState } from '../../../../store/rootReducer';
import './image.less';

interface Props {
    selectImage?: () => void;
    removeImage: () => void;
    file: string | any;
}

const Image: FC<Props> = ({ file, removeImage, selectImage }) => {
    const token = useSelector((state: IState) => state.auth.token);
    const [loading, setLoading] = useState(false);

    const isImage = typeof file === 'string';

    const handleSelectImage = () => {
        if (selectImage) {
            selectImage();
        }
    };

    const handleRemoveImage = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        if (isImage) {
            await removeImagesRequest({
                token: get(token, 'accessToken'),
                fileNames: [file],
            });

            removeImage();
            setLoading(false);
        } else {
            removeImage();
            setLoading(false);
        }
    };

    const srcImage = isImage ? `${constants.URL_IMG}${file}` : file.thumbUrl;

    return (
        <div className="productImage">
            <div className="img" onClick={handleSelectImage}>
                <img src={srcImage} alt="" />

                {loading && (
                    <span className="loading">
                        <Spin size="small" />
                    </span>
                )}
                {isImage && (
                    <Tooltip title="Chọn ảnh hiển thị">
                        <span className="check">
                            <CheckOutlined />
                        </span>
                    </Tooltip>
                )}
            </div>

            <span className="remove" onClick={handleRemoveImage}>
                <CloseOutlined />
            </span>
        </div>
    );
};

export { Image };
