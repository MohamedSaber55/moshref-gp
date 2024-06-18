// src/api.js
import axios from 'axios';

const BASE_URL = 'https://recycling.runasp.net/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const request = async (endpoint, method = 'GET', body) => {
    console.log(body);
    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            body,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Network response was not ok');
        } else {
            throw new Error(error.message);
        }
    }
};

export const register = (userData) => request('Account/Register', 'POST', userData);
export const confirmEmail = (token) => request(`Account/ConfirmEmail/${token}`, 'POST');
export const login = (credentials) => request('Account/Login', 'POST', credentials);
export const forgetPassword = (email) => request('Account/ForgotPassword', 'POST', { email });
export const resetPassword = (token, password) => request(`Account/ResetPassword/${token}`, 'POST', { password });
export const resendConfirmEmail = (email) => request('Account/ResendConfirmEmail', 'POST', { email });
export const logout = () => request('Account/Logout', 'POST');
export const searchUser = (query) => request(`Account/Users/Search?query=${query}`, 'GET');
export const setAdmin = (userId) => request(`Account/Users/${userId}/SetAdmin`, 'POST');
