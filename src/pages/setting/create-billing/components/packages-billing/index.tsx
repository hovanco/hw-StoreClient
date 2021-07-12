import { Checkbox, Col, Row } from 'antd';
import React, { FC } from 'react';
import { IPackageBiling } from '../../../list-billings/package-biling';
import { useBilling } from '../../state/context';
import './packages-billing.less';
import { EBillingPackageType } from '../../../../../api/billing-api';

interface Props {
    reorder: boolean;
}

const PackagesBilling: FC<Props> = ({ reorder }) => {
    const { packages, packagesSelect, updatePackages, packagesNeedExtend } = useBilling();

    const codesOfPackagesNeedExtend = packagesNeedExtend.map((item: IPackageBiling) => item.code);

    function onChange(checkedValues: any) {
        let list: IPackageBiling[] = getList(checkedValues);
        if (list.length === 0) return;
        updatePackages(list);
    }

    function getList(checkedValues: any) {
        const lastPackage = packages.find(
            (item: IPackageBiling) => item.code === checkedValues[checkedValues.length - 1],
        );
        if (
            (checkedValues.includes(EBillingPackageType.Omni) &&
                lastPackage?.code === EBillingPackageType.Omni) ||
            (checkedValues.includes(EBillingPackageType.Facebook) &&
                // hidden for update after
                // checkedValues.includes(EBillingPackageType.Shopee) &&
                checkedValues.includes(EBillingPackageType.Pos))
        ) {
            return packages.filter(
                (item: IPackageBiling) => item.code === EBillingPackageType.Omni,
            );
        } else {
            if (reorder) {
                return [
                    ...packages.filter(
                        (item: IPackageBiling) =>
                            checkedValues.includes(item.code) &&
                            item.code !== EBillingPackageType.Omni,
                    ),
                    ...packagesNeedExtend,
                ];
            }
            return packages.filter(
                (item: IPackageBiling) =>
                    checkedValues.includes(item.code) && item.code !== EBillingPackageType.Omni,
            );
        }
    }

    React.useEffect(() => {
        const codesOfPackages = packagesSelect.map((item: IPackageBiling) => item.code);
        if (
            codesOfPackages.includes(EBillingPackageType.Facebook) &&
            codesOfPackages.includes(EBillingPackageType.Pos) &&
            codesOfPackages.includes(EBillingPackageType.Shopee)
        ) {
            const list = packages.filter(
                (item: IPackageBiling) => item.code === EBillingPackageType.Omni,
            );
            updatePackages(list);
        }
    }, [packagesSelect]);

    return (
        <Checkbox.Group
            onChange={onChange}
            className='packages-billing'
            value={packagesSelect.map((item: IPackageBiling) => item.code)}
        >
            <Row gutter={[31, 12]}>
                {packages.map((item: IPackageBiling) => {
                    return (
                        <Col
                            span={12}
                            key={item?.code}
                            className={
                                reorder && codesOfPackagesNeedExtend.includes(item?.code)
                                    ? 'need-hidden'
                                    : ''
                            }
                        >
                            <Checkbox
                                checked={false}
                                indeterminate={packagesSelect?.some(
                                    (itemSelect: IPackageBiling) => itemSelect?.code === item?.code,
                                )}
                                value={item?.code}
                            >
                                {item?.package}
                            </Checkbox>
                        </Col>
                    );
                })}
            </Row>
        </Checkbox.Group>
    );
};

export default PackagesBilling;
