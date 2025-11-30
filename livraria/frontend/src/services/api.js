import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname;
            
            // LISTA DE ROTAS QUE NÃO PRECISAM DE LOGIN
            // Adicionamos aqui o startWith para pegar qualquer link de reset-password
            const isPublicRoute = 
                currentPath === '/login' ||
                currentPath === '/register' ||
                currentPath === '/forgot-password' ||
                currentPath.startsWith('/reset-password/');

            // Se NÃO for uma rota pública, aí sim manda pro login
            if (!isPublicRoute) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;