import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import staffApi from '../api/staff-api';
import { IStaff } from '../models';
import { IState } from '../store/rootReducer';

export const useStaffs = () => {
    const [staffs, setStaffs] = useState<IStaff[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const storeObj = useSelector((state: IState) => state.store.data);

    useEffect(() => {
        async function getListStaff(storeId: string) {
            try {
                const response = await staffApi.getStaffs(storeId);

                setStaffs(response);
            } catch (error) {
                setStaffs([]);
            } finally {
                setLoading(false);
            }
        }

        if (storeObj._id) getListStaff(storeObj._id);
    }, [storeObj._id]);

    const getStaffById = (id: string) => {
        return staffs.filter((staff: IStaff) => staff._id === id)[0];
    };

    return {
        staffs,
        loading,
        getStaffById,
    };
};
