export function parserInput(value?: any) {
    if (!value) return 0;
    return `${value}`.replace(/vnd\s?|(,*)/g, '');
}

export function formatterInput(value: any) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatMoney(value: string | number): string {
    let number = parseFloat(value?.toString());
    return number.toLocaleString('VND');
}

export default formatMoney;
