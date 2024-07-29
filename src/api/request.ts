import axios from 'axios';
import { ElLoading, ElMessageBox } from 'element-plus';
import { errorMsg, successMsg } from '@/utils/message';
import Prompt from '@/utils/enum';
import Cookies from 'js-cookie';

console.log(import.meta.env);
const server = axios.create({
	baseURL: import.meta.env.VITE_API_PREFIX,
	timeout: 0,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
});

let loading: any = null;
let request = new Map();

let removePending = (config: any) => {
	var key = `${config.method}:${config.url}`;
	var func = request.get(key);
	if (func) {
		func();
		request.delete(key);
	}
};

let requests = 0;
const closeLoading = () => {
	requests--;
	if (requests == 0) {
		loading?.close();
		loading = null;
	}
};

const svg = `<svg t="1689760228468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2304"><path d="M843.307 742.24c0 3.217 2.607 5.824 5.824 5.824s5.824-2.607 5.824-5.824a5.823 5.823 0 0 0-5.824-5.824 5.823 5.823 0 0 0-5.824 5.824zM714.731 874.912c0 6.398 5.186 11.584 11.584 11.584s11.584-5.186 11.584-11.584-5.186-11.584-11.584-11.584-11.584 5.186-11.584 11.584zM541.419 943.2c0 9.614 7.794 17.408 17.408 17.408s17.408-7.794 17.408-17.408-7.794-17.408-17.408-17.408-17.408 7.794-17.408 17.408z m-186.56-9.152c0 12.795 10.373 23.168 23.168 23.168s23.168-10.373 23.168-23.168-10.373-23.168-23.168-23.168-23.168 10.373-23.168 23.168zM189.355 849.12c0 16.012 12.98 28.992 28.992 28.992s28.992-12.98 28.992-28.992-12.98-28.992-28.992-28.992-28.992 12.98-28.992 28.992zM74.731 704.736c0 19.228 15.588 34.816 34.816 34.816s34.816-15.588 34.816-34.816-15.588-34.816-34.816-34.816-34.816 15.588-34.816 34.816z m-43.008-177.28c0 22.41 18.166 40.576 40.576 40.576s40.576-18.166 40.576-40.576-18.166-40.576-40.576-40.576-40.576 18.166-40.576 40.576z m35.392-176.128c0 25.626 20.774 46.4 46.4 46.4s46.4-20.774 46.4-46.4c0-25.626-20.774-46.4-46.4-46.4-25.626 0-46.4 20.774-46.4 46.4z m106.176-142.016c0 28.843 23.381 52.224 52.224 52.224s52.224-23.381 52.224-52.224c0-28.843-23.381-52.224-52.224-52.224-28.843 0-52.224 23.381-52.224 52.224z m155.904-81.344c0 32.024 25.96 57.984 57.984 57.984s57.984-25.96 57.984-57.984-25.96-57.984-57.984-57.984-57.984 25.96-57.984 57.984z m175.104-5.056c0 35.24 28.568 63.808 63.808 63.808s63.808-28.568 63.808-63.808c0-35.24-28.568-63.808-63.808-63.808-35.24 0-63.808 28.568-63.808 63.808z m160.32 72.128c0 38.421 31.147 69.568 69.568 69.568s69.568-31.147 69.568-69.568-31.147-69.568-69.568-69.568-69.568 31.147-69.568 69.568z m113.92 135.488c0 41.638 33.754 75.392 75.392 75.392s75.392-33.754 75.392-75.392-33.754-75.392-75.392-75.392-75.392 33.754-75.392 75.392z m45.312 175.488c0 44.854 36.362 81.216 81.216 81.216s81.216-36.362 81.216-81.216c0-44.854-36.362-81.216-81.216-81.216-44.854 0-81.216 36.362-81.216 81.216z" fill="var(--el-color-primary)" p-id="2305"></path></svg>`;
server.interceptors.request.use(
	config => {
		removePending(config);
		config.cancelToken = new axios.CancelToken(cancelToken => {
			request.set(`${config.method}:${config.url}`, cancelToken);
		});
		const token = Cookies.get('token');
		if ((token ?? '') != '') {
			config.headers.token = token;
		}
		console.log(1, config.data);
		const timestamp = new Date().getTime();
		config.data.timestamp = timestamp;
		if (loading === null && !config.headers.noloading) {
			loading = ElLoading.service({
				lock: true,
				spinner: svg,
			});
		}
		requests++;
		return config;
	},
	error => {
		closeLoading();
		errorMsg('网络错误');
		Promise.reject(error);
	}
);

server.interceptors.response.use(
	response => {
		closeLoading();
		if (response.headers.token) {
			// 3小时（3小时无操作则token失效）
			Cookies.set('token', response.headers.token, {
				expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 3),
			});
		}
		const { code, data, msg, timestamp } = response.data;
		console.log(response.data);
		if (code === 1000) {
			msg && successMsg(msg);
			return Promise.resolve(response.data);
		} else if (code > 1000) {
			errorMsg(msg);
		} else if (code == 500) {
			errorMsg(msg);
		}
		return Promise.reject(response.data);
	},
	error => {
		console.log('请求失败：', error.response);
		closeLoading();
		const { status } = error.response;
		if (error.message === 'canceled') {
			return error;
		}
		if (error.message == 'timeout of 30000ms exceeded') {
			errorMsg(Prompt.REQUEST_TIMEOUT);
			return error;
		}
		if (error.code == 'ERR_NETWORK') {
			errorMsg(Prompt.NETWORK_ERROR);
			return error;
		} else if (status === 403) {
			redirectPage();
		} else if (status === 404) {
			errorMsg(Prompt.RESOURCE_NO_EXIST);
		} else if (status === 500) {
			errorMsg(Prompt.SYS_ERROR);
		} else {
			errorMsg('请求错误');
		}
		return Promise.reject(error);
	}
);

const redirectPage = () => {
	ElMessageBox.alert('系统提示', {
		message: '身份已过期，请重新登陆',
		type: 'warning',
	}).finally(() => {
		Cookies.remove('token');
		window.location.href = '/';
	});
};

export default server;
