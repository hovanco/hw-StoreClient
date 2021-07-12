import { compact } from "lodash";

function getAddress({
    address,
    provinceName,
    wardName,
    districtName,
}: {
    address?: string;
    provinceName?: string;
    wardName?: string;
    districtName?: string;
}): string {
    return compact([address, wardName, districtName, provinceName]).join(', ');
}

export { getAddress };