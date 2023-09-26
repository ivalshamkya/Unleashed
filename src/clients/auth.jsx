import axios, { AUTH_PREFIX } from './axios';

export function login(data) {
	return axios({
		method: 'post',
		url: `${AUTH_PREFIX}/login`,
		data: data,
	});
}

export function signup(data) {
	return axios({
		method: 'post',
		url: `${AUTH_PREFIX}`,
		data: data,
	});
}

export function forgotPassword(data) {
	return axios({
		method: 'put',
		url: `${AUTH_PREFIX}/forgotPass`,
		data: data,
	});
}

export function resetPassword(token, data) {
    return axios({
        method: 'patch',
        url: `${AUTH_PREFIX}/resetPass?token=${token}`,
        data: data,
    });
}

export function logout() {
	return axios({
		method: 'get',
		url: `${AUTH_PREFIX}/logout`,
	});
}
