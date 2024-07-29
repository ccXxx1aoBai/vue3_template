import { ElMessageBox, ElMessage } from 'element-plus';

export const confirm = (msg: string, title: string = '系统提示') => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(title, {
			message: msg,
			showCancelButton: true,
			cancelButtonText: '取消',
		})
			.then(() => {
				resolve(true);
			})
			.catch(() => {
				reject();
			});
	});
};

export const alert = (msg: string, title: string = '系统提示') => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(title, {
			message: msg,
		}).then(() => {
			resolve(true);
		})
		.catch(() => {
			reject();
		});
	});
};

export const successMsg = (msg: string) => {
	ElMessage.success(msg);
};

export const warnMsg = (msg: string) => {
	ElMessage.warning(msg);
};

export const errorMsg = (msg: string) => {
	ElMessage.error(msg);
};

export const infoMsg = (msg: string) => {
	ElMessage.info(msg);
};
