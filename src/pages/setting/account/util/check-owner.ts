import { IStore } from '../../../../models';

function checkOwner({ staffId, store }: { staffId: string; store: IStore }) {
    return store.ownerId === staffId;
}

export { checkOwner };
