import config from './config';
import axios from 'axios';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401 || error.response.status === 403) {
			if (!error.config.url.endsWith('/login')) {
				window.location = '/login';
			}
		}
		return Promise.reject(error);
	}
);
axios.interceptors.request.use(function (axiosConfig) {
	const jwtToken = sessionStorage.getItem(config.JWT_STORAGE_KEY);
	if (jwtToken) {
		axiosConfig.headers['Authorization'] = 'Bearer ' + jwtToken;
	}
	return axiosConfig;
}, function (error) {
	return Promise.reject(error);
});

export default {
	user: {
		authenticated: false
	},

	login(userInfo) {
		return new Promise((resolve, reject) => {
			axios.post('/login', userInfo)
				.then(response => {
					sessionStorage.setItem(config.JWT_STORAGE_KEY, response.headers.authorization);
					sessionStorage.setItem(config.USER_STORAGE_KEY, response.data['name']);
					this.user.authenticated = true;
					resolve("Successful login");
				})
				.catch(() => {
					reject("Failed login.");
				});
		});
	},

	logout() {
		sessionStorage.removeItem(config.JWT_STORAGE_KEY);
		sessionStorage.removeItem(config.USER_STORAGE_KEY);
		this.user.authenticated = false;
		window.location = '/';
	},

	checkAuth() {
		let jwt = sessionStorage.getItem(config.JWT_STORAGE_KEY);
		this.user.authenticated = !!jwt;
		return this.user.authenticated;
	}
}
