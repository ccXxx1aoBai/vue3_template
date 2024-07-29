export const phoneValidator = (rule: any, value: any, callback: Function) => {
	if (_isRequired(rule)) {
		if ((value ?? '') == '') {
			callback(new Error('请输入手机号码'));
		}
	} else {
		if ((value ?? '') == '') {
			callback();
		}
	}
	const regex = /(^1[3|4|5|7|8][0-9]{9}$)/;
	if (value.length != 11 || !regex.test(value)) {
		callback(new Error('请输入正确的手机号码'));
	}
	callback();
};

export const emailValidator = (rule: any, value: any, callback: Function) => {
	if (_isRequired(rule)) {
		if ((value ?? '') == '') {
			callback(new Error('请输入邮箱'));
		}
	} else {
		if ((value ?? '') == '') {
			callback();
		}
	}
	const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if (!regex.test(value)) {
		callback(new Error('请输入正确的邮箱'));
	}
	callback();
};

const _isRequired = (rule: any): boolean => {
	return Boolean(rule.required);
};
