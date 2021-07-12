export const consvertDataTable = (data: any[]) => data.map((item, key) => ({ ...item, key }));
