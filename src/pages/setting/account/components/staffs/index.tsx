import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeAccents } from '../../../../../helper';
import { useStaffs } from '../../../../../hook/useStaff';
import { IStaff } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { checkOwner } from '../../util';
import StaffTable from '../staff-table';

interface Props {}

const Staffs: FC<Props> = () => {
    const store = useSelector((state: IState) => state.store.data);

    const { loading, staffs } = useStaffs();
    const [staffsLocal, setStaffsLocal] = useState<IStaff[]>([]);

    const searchStaff = (text: string) => {
        const newStaffs = staffs.filter(
            (staff) =>
                !checkOwner({ staffId: staff._id, store }) &&
                removeAccents(staff.name).toLowerCase().indexOf(text.toLowerCase()) !== -1
        );

        setStaffsLocal(newStaffs);
    };

    useEffect(() => {
        setStaffsLocal(staffs.filter((staff) => !checkOwner({ staffId: staff._id, store })));
    }, [staffs]);

    return <StaffTable loading={loading} staffs={staffsLocal} searchStaff={searchStaff} />;
};

export default Staffs;
