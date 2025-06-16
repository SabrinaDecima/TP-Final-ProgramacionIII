import { getToken } from "../services/authService";

export const useFetchAuth = () => {
    const token = getToken();

    const fetchAuth = async (url, options = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        };

        return fetch(url, {
            ...options,
            headers,
        });
    };

    return { fetchAuth };
};