import { IAttribute } from '../../../models';

export const twoArrayMixer = (mainArray: any[], dependArray: IAttribute[]): IAttribute[][] => {
    if (!mainArray.length) return dependArray.map((item: IAttribute) => [item]);
    if (!dependArray.length)
        return mainArray.map((item: any) => (Array.isArray(item) ? item : [item]));
    let result: IAttribute[][] = [];
    mainArray.forEach((mainItem: any) => {
        dependArray.forEach((dependItem: IAttribute) => {
            if (Array.isArray(mainItem)) {
                result.push([...mainItem, dependItem]);
            } else {
                result.push([mainItem, dependItem]);
            }
        });
    });
    return result;
};

export const generateVariantsByTags = (attributeByTags: any[]): IAttribute[][] => {
    if (attributeByTags.length === 0) return [];
    if (attributeByTags.length === 1) return twoArrayMixer(attributeByTags[0], []);
    let variantTags = twoArrayMixer(attributeByTags[0], attributeByTags[1]);
    if (attributeByTags.length === 2) return variantTags;
    attributeByTags.splice(0, 2, variantTags);
    return generateVariantsByTags(attributeByTags);
};
