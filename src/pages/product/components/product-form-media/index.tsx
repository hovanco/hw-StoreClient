import { Card, Form, Input, Select, Space, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { FC, useState } from 'react';
import iconPlusPrimary from '../../../../assets/images/ic-plus-primary.svg';
import imgPlaceholder from '../../../../assets/images/img-placeholder.svg';
import { InsaButton } from '../../../../components';
import theme from '../../../../theme';
import { Image } from './image';

const limitedCurriculumDisplay: number = 8;

interface Props {
    images?: string[];
    setFilesImage: (filesImage: any[]) => void;
    updateImageProduct?: (images: string[], type?: 'remove' | 'add') => void;
}

const ProductFormMedia: FC<Props> = ({ images = [], setFilesImage, updateImageProduct }) => {
    const [filesList, setFilesList] = useState<any[]>([...images]);

    const customRequest = ({
        file,
        onSuccess,
    }: {
        file: File;
        onSuccess: (param: string) => void;
    }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    const onChangeUploadFile = async ({ fileList }: { fileList: UploadFile<any>[] }) => {
        if (fileList.length > 8) {
            return;
        }

        let fileListUrl: any[] = [];
        let fileUpload: any[] = [];

        fileList.forEach((e) => {
            const thumbUrl = e.thumbUrl
                ? e.thumbUrl
                : e.originFileObj
                ? window.URL.createObjectURL(e.originFileObj)
                : undefined;

            const item = {
                ...e,
                thumbUrl,
                status: 'done',
            };

            fileListUrl.push(item);
            fileUpload.push(item);
        });

        setFilesImage(fileUpload);
        setFilesList([...images, ...fileListUrl]);
    };

    const isActive = filesList.length < limitedCurriculumDisplay;
    const isShowButtonUpload = isActive && filesList.length > 0;
    const filesUpload = filesList.filter((file) => typeof file !== 'string');
    const imagesUrl = filesList.filter((file) => typeof file === 'string');

    const renderUpload = () => {
        if (filesList.length === 0) {
            return (
                <Upload.Dragger
                    listType='picture-card'
                    showUploadList={false}
                    style={{ minHeight: 188 }}
                    accept='.png, .jpeg, .jpg'
                    multiple
                    customRequest={() => customRequest}
                    disabled={!isActive}
                    onChange={({ fileList }) => onChangeUploadFile({ fileList })}
                    fileList={[]}
                >
                    <div
                        style={{
                            paddingTop: 44,
                        }}
                    >
                        <img src={imgPlaceholder} alt='img-insa' />
                        <Typography.Link style={{ display: 'block', textAlign: 'center' }}>
                            Click or Drag to Upload
                        </Typography.Link>
                    </div>
                </Upload.Dragger>
            );
        }

        return (
            <div
                style={{
                    background: '#fafafa',
                    border: '1px dashed #d9d9d9',
                    borderRadius: 2,
                    padding: '16px 0',
                    minHeight: 188,
                }}
            >
                <Space
                    size={15}
                    style={{
                        width: '100%',
                        flexWrap: 'wrap',
                        paddingLeft: theme.spacing.xs,
                        paddingRight: theme.spacing.xs,
                    }}
                >
                    {imagesUrl.map((image, index) => {
                        const selectImage = () => {
                            if (updateImageProduct) {
                                let images = filesList.filter((i) => typeof i === 'string');
                                images.splice(0, 0, images.splice(index, 1)[0]);

                                updateImageProduct(images);

                                setFilesList([
                                    ...images,
                                    ...filesList.filter((i) => typeof i !== 'string'),
                                ]);
                            }
                        };

                        const removeImage = () => {
                            const newFileList = filesList.filter((_, i: number) => i !== index);

                            setFilesList(newFileList);

                            if (updateImageProduct) {
                                const images = newFileList.filter((i) => typeof i === 'string');

                                updateImageProduct(images, 'remove');
                            }
                        };

                        return (
                            <Image
                                file={image}
                                selectImage={selectImage}
                                removeImage={removeImage}
                                key={index}
                            />
                        );
                    })}

                    {filesUpload.map((file, index) => {
                        const removeImage = () => {
                            const newFileList = filesList.filter((_, i: number) => i !== index);
                            setFilesList(newFileList);
                        };

                        return <Image file={file} removeImage={removeImage} key={index} />;
                    })}
                    <Upload
                        customRequest={() => customRequest}
                        showUploadList={false}
                        accept='.png, .jpeg, .jpg'
                        multiple
                        onChange={({ fileList }) => onChangeUploadFile({ fileList })}
                        fileList={filesUpload}
                    >
                        {isShowButtonUpload ? (
                            <InsaButton
                                icon={<img src={iconPlusPrimary} alt='' />}
                                style={{ width: 70, height: 70, marginBottom: 16 }}
                            />
                        ) : null}
                    </Upload>
                </Space>
            </div>
        );
    };

    return (
        <Card title='Ảnh sản phẩm' size='small'>
            <Form.Item
                label={
                    <Typography.Text>
                        Thư viện ảnh
                        <Typography.Link>
                            {` ( PNG, JPG, JPEG, 500px x 500px, tối đa ${limitedCurriculumDisplay} ảnh)`}
                        </Typography.Link>
                    </Typography.Text>
                }
            >
                {renderUpload()}
            </Form.Item>
            {/* <Form.Item label="TAG">
                <Select placeholder="TAG"></Select>
            </Form.Item> */}
        </Card>
    );
};

export { ProductFormMedia };
