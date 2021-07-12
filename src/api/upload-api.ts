import axios from 'axios';
import axiosClient from './axios-client';
import { flatten, pick } from 'lodash';
import { API_URI } from '../configs/vars';

async function createImagesRequest({
    token,
    storeId,
    data,
}: {
    token: string;
    storeId: string;
    data: {
        galleryId?: string;
        name: string;
        key: string;
        star: boolean;
    };
}): Promise<any> {
    const url = `/store/v1/stores/${storeId}/images`;
    const res = await axiosClient({
        method: 'POST',
        url,
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}

export async function fetchPresignedRequest({
    token,
    data,
}: {
    token: string;
    data: {
        quantity: number;
        ext: string;
        contentType: string;
    };
}): Promise<any> {
    const url = `/store/v1/upload/presigned-url/post/image`;

    const res = await axiosClient({
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data,
    });

    return res.data;
}

async function uploadImageRequest({
    galleryId,
    storeId,
    token,
    file,
    fields,
    url,
}: {
    galleryId?: string;
    storeId: string;
    token: string;
    file: any;
    fields: any;
    url: string;
}): Promise<any> {
    delete axios.defaults.headers.common['Authorization'];

    if (!fields) return null;

    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    const data: any = new FormData();

    for (let key in fields) {
        data.append([key], fields[key]);
    }
    data.append('file', file);

    await axios({
        method: 'POST',
        url,
        headers,
        data,
    });

    const key = (fields.Key as string).replace('development/', '');

    const responseImg = await createImagesRequest({
        token,
        storeId,
        data: {
            key,
            name: file.name,
            galleryId,
            star: false,
        },
    });

    return responseImg;
}

async function uploadImagesRequest({
    token,
    storeId,
    galleryId,
    files,
}: {
    storeId: string;
    galleryId?: string;
    token: string;
    files: any;
}): Promise<any> {
    const presignedRequest: any[] = [];

    files.forEach((file: any) => {
        const itemPresigned = fetchPresignedRequest({
            token,
            data: {
                quantity: 1,
                ext: file.name.split('.').pop(),
                contentType: file.type,
            },
        });

        presignedRequest.push(itemPresigned);
    });

    const presignedArray = flatten(await Promise.all(presignedRequest));

    const images = await Promise.all(
        presignedArray.map(async (item: any, i: number) => {
            const resImg = await uploadImageRequest({
                storeId,
                galleryId,
                token,
                fields: item.fields,
                file: files[i],
                url: item.url,
            });

            return pick(resImg, ['_id', 'key', 'star', 'storeId', 'name']);
        })
    );

    return images;
}

async function removeImagesRequest({
    token,
    fileNames,
}: {
    token: string;
    fileNames: string[];
}): Promise<any> {
    axios.defaults.baseURL = '';

    const url = `${API_URI}/store/v1/upload/files/remove`;

    await axios({
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { fileNames },
    });

    axios.defaults.baseURL = API_URI;
}

export { removeImagesRequest, uploadImagesRequest };
