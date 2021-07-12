import { useEffect, useState } from 'react';
import locationApi from '../api/location-api';

export interface Province {
    code: string;
    name: string;
    name_with_type: string;
    slug: string;
    type: string;
}

export interface District {
    code: string;
    name: string;
    name_with_type: string;
    parent_code: string;
    path: string;
    path_with_type: string;
    slug: string;
    type: string;
}
export interface Ward {
    code: string;
    name: string;
    name_with_type: string;
    parent_code: string;
    path: string;
    path_with_type: string;
    slug: string;
    type: string;
}

const useProvices = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [loadingProvince, setLoadingProvince] = useState<boolean>(true);

    useEffect(() => {
        async function getListProvinces() {
            try {
                const response = await locationApi.getProvinces();

                setProvinces(response);
            } catch (error) {
                setProvinces([]);
            } finally {
                setLoadingProvince(false);
            }
        }
        getListProvinces();
    }, []);

    return {
        provinces,
        loadingProvince,
    };
};

const useDistricts = (province?: string, loading?: boolean) => {
    const [districts, setDistricts] = useState<District[]>([]);

    const [loadingDistrict, setLoadingDistrict] = useState<boolean>(loading || false);

    useEffect(() => {
        async function getListDistricts() {
            if (!province) {
                setLoadingDistrict(false);
                return;
            }

            setLoadingDistrict(true);

            try {
                const response = await locationApi.getDistricts(province);

                setDistricts(response);
            } catch (error) {
                setDistricts([]);
            } finally {
                setLoadingDistrict(false);
            }
        }

        getListDistricts();
    }, [province]);

    return {
        districts,
        loadingDistrict,
    };
};

const useWards = ({
    province,
    district,
    loading,
}: {
    province?: string;
    district?: string;
    loading?: boolean;
}) => {
    const [wards, setWards] = useState<Ward[]>([]);
    const [loadingWard, setLoadingWard] = useState<boolean>(loading || false);

    useEffect(() => {
        async function getListWard() {
            if (!province || !district) {
                setLoadingWard(false);
                return;
            }
            setLoadingWard(true);
            try {
                const response = await locationApi.getWards({
                    provinceId: province,
                    districtId: district,
                });

                setWards(response);
            } catch (error) {
                setWards([]);
            } finally {
                setLoadingWard(false);
            }
        }
        getListWard();
    }, [district, province]);

    return {
        wards,
        loadingWard,
    };
};

export { useProvices, useDistricts, useWards };
