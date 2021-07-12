import { EBillingPackageType } from '../api/billing-api';

export function convertPackages(pkgs: any[]) {
    const list: any[] = [];
    pkgs.forEach((item: any) => {
        if (item.packageType === EBillingPackageType.Omni) {
            list.push(item);
            return;
        }

        for (let packageType of [EBillingPackageType.Pos, EBillingPackageType.Facebook, EBillingPackageType.Shopee]) {
            if (packageType & item.packageType)
                list.push({ ...item, packageType });
        }

    });
    return list;
}
