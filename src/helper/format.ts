import moment from 'moment';

const formatDescription = (des: string) => {
    const listDes = des.split('\n').map((item: string) => item.trim());
    return listDes;
};
export const formatDate = (data: string) => {
    return moment(data).format('DD/MM/YYYY');
};
export default formatDescription;
