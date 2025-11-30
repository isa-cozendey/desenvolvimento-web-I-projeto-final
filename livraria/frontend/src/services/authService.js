import api from './api';

export const authService = {
    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    async getMe() {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // NOVO: Pedir reset de senha
    async forgotPassword(email) {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    // NOVO: Enviar nova senha com token
    async resetPassword(token, newPassword) {
        const response = await api.post('/auth/reset-password', { token, newPassword });
        return response.data;
    }
};