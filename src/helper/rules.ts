import { Rule } from 'antd/lib/form';

const ruleRequired = (message?: string): Rule => ({
    required: true,
    message: message || 'Vui lòng nhập thông tin',
});

const ruleNumberMin = (min: number, message?: string): Rule => ({
    min,
    type: 'number',
    message: message || `Vui lòng nhập số lớn hơn ${min}`,
});

const ruleNumberMax = (max: number, message?: string): Rule => ({
    max,
    type: 'number',
    message: message || `Vui lòng nhập số nhỏ hơn ${max}`,
});

const validatePhone = (_: any, value: string, callback: (arg?: any) => void) => {
    const vnf_regex = /^(0|\+84)(9|3|7|8|5){1}([0-9]{8})$/g;

    if (value && vnf_regex.test(value) === false) {
        return callback('Vui lòng nhập số điện thoại hợp lệ');
    }

    return callback();
};

export default {
    ruleRequired,
    ruleNumberMin,
    ruleNumberMax,
    validatePhone,
};
