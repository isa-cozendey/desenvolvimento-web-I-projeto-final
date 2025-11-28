import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Se não autenticado, redireciona para login (exceto se já estiver em páginas públicas)
            const publicRoutes = ['/login', '/register'];
            const currentPath = window.location.pathname;

            if (!publicRoutes.includes(currentPath)) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
