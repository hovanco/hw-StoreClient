import { IStaff } from '../../../../models';

function getOwner({ ownerId, staffs }: { ownerId: string; staffs: IStaff[] }): IStaff | undefined {
    const owner = staffs.find((staff) => staff._id === ownerId);

    return owner;
}

export { getOwner };
